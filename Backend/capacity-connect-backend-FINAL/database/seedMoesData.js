const fs = require('fs');
const path = require('path');

/**
 * MOES/IMD Real Dataset Seeder for Capacity Connect LMS (SIH26075)
 * Seed 5 courses, 25 modules, 25 quizzes, and 375 questions into PostgreSQL / pg-mem.
 */
async function seedMoesData(poolInstance) {
  try {
    const seedDataPath = path.resolve(__dirname, 'seed_data.json');
    if (!fs.existsSync(seedDataPath)) {
      console.error('[DB-MOES] seed_data.json not found at:', seedDataPath);
      return {};
    }

    const data = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

    // Resolve Trainer user ID (use existing TRAINER user, e.g. trainer@test.com or ID 2)
    let trainerId;
    const trainerRes = await poolInstance.query(
      "SELECT id FROM users WHERE role = 'TRAINER' OR email = 'trainer@test.com' ORDER BY id ASC LIMIT 1"
    );
    if (trainerRes.rows.length > 0) {
      trainerId = trainerRes.rows[0].id;
    } else {
      const tIns = await poolInstance.query(
        "INSERT INTO users (name, email, password_hash, role, bio) VALUES ('IMD Training Cell', 'training.cell@imd.gov.in', 'hash', 'TRAINER', 'IMD Training & Capacity Building Cell') RETURNING id"
      );
      trainerId = tIns.rows[0].id;
    }

    // Resolve Learner user ID for learner@test.com
    let learnerId;
    const learnerRes = await poolInstance.query(
      "SELECT id FROM users WHERE email = 'learner@test.com' LIMIT 1"
    );
    if (learnerRes.rows.length > 0) {
      learnerId = learnerRes.rows[0].id;
    } else {
      const lIns = await poolInstance.query(
        "INSERT INTO users (name, email, password_hash, role, bio) VALUES ('Test Learner', 'learner@test.com', 'hash', 'LEARNER', 'Test Learner Account') RETURNING id"
      );
      learnerId = lIns.rows[0].id;
    }

    const quizMappingResult = {};

    for (const course of data.courses) {
      const courseCode = course.course_id || course.id;
      quizMappingResult[courseCode] = [];

      // Check if course already exists
      let courseDbId;
      const existingCourse = await poolInstance.query(
        "SELECT id FROM courses WHERE title = $1 LIMIT 1",
        [course.title]
      );

      if (existingCourse.rows.length > 0) {
        courseDbId = existingCourse.rows[0].id;
      } else {
        const levelUpper = (course.difficulty || 'BEGINNER').toUpperCase();
        const courseRes = await poolInstance.query(
          `INSERT INTO courses (title, description, category, level, trainer_id, is_published)
           VALUES ($1, $2, $3, $4, $5, true)
           RETURNING id`,
          [course.title, course.description, course.category, levelUpper, trainerId]
        );
        courseDbId = courseRes.rows[0].id;
      }

      // Ensure learner@test.com is enrolled in this course
      const existingEnrollment = await poolInstance.query(
        "SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2 LIMIT 1",
        [learnerId, courseDbId]
      );
      if (existingEnrollment.rows.length === 0) {
        await poolInstance.query(
          "INSERT INTO enrollments (user_id, course_id, status) VALUES ($1, $2, 'ACTIVE')",
          [learnerId, courseDbId]
        );
      }

        // Process Units / Modules
        for (const unit of course.units) {
          let moduleDbId;
          const existingModule = await poolInstance.query(
            "SELECT id FROM modules WHERE course_id = $1 AND title = $2 LIMIT 1",
            [courseDbId, unit.title]
          );

          if (existingModule.rows.length > 0) {
            moduleDbId = existingModule.rows[0].id;
          } else {
            const moduleRes = await poolInstance.query(
              `INSERT INTO modules (course_id, title, description, order_index)
               VALUES ($1, $2, $3, $4)
               RETURNING id`,
              [courseDbId, unit.title, unit.summary, unit.unit_number]
            );
            moduleDbId = moduleRes.rows[0].id;
          }

          // Ensure unit entry exists in units table
          let unitDbId;
          const existingUnit = await poolInstance.query(
            "SELECT id FROM units WHERE course_id = $1 AND unit_number = $2 LIMIT 1",
            [courseDbId, unit.unit_number]
          );

          if (existingUnit.rows.length > 0) {
            unitDbId = existingUnit.rows[0].id;
          } else {
            const unitRes = await poolInstance.query(
              `INSERT INTO units (course_id, unit_number, title, description)
               VALUES ($1, $2, $3, $4)
               RETURNING id`,
              [courseDbId, unit.unit_number, unit.title, unit.summary]
            );
            unitDbId = unitRes.rows[0].id;
          }

        // Process Quiz (1 per module/unit)
        const quizTitle = `${unit.title} Assessment`;
        let quizDbId;
        const existingQuiz = await poolInstance.query(
          "SELECT id FROM quizzes WHERE course_id = $1 AND module_id = $2 LIMIT 1",
          [courseDbId, moduleDbId]
        );

        if (existingQuiz.rows.length > 0) {
          quizDbId = existingQuiz.rows[0].id;
        } else {
          const quizRes = await poolInstance.query(
            `INSERT INTO quizzes (course_id, module_id, title, description, passing_score, total_marks, time_limit_minutes, created_by)
             VALUES ($1, $2, $3, $4, 60.0, 150.0, 20, $5)
             RETURNING id`,
            [courseDbId, moduleDbId, quizTitle, `Assessment for Unit ${unit.unit_number}: ${unit.title}`, trainerId]
          );
          quizDbId = quizRes.rows[0].id;

          // Insert 15 Questions for new Quiz
          let qOrder = 1;
          for (const q of unit.questions) {
            const optionsArray = [q.options.a, q.options.b, q.options.c, q.options.d];
            const correctAnswerText = q.options[q.correct_option];

            await poolInstance.query(
              `INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, marks, order_index)
               VALUES ($1, $2, 'MULTIPLE_CHOICE', $3, $4, 10.0, $5)`,
              [
                quizDbId,
                q.question,
                JSON.stringify(optionsArray),
                correctAnswerText,
                qOrder++
              ]
            );
          }
        }

        quizMappingResult[courseCode].push({
          unitNumber: unit.unit_number,
          unitTitle: unit.title,
          quizDbId
        });
      }
    }

    // Seed Topics from seedTopics.sql if topics table is empty
    const topicCheck = await poolInstance.query("SELECT COUNT(*) AS count FROM topics");
    if (parseInt(topicCheck.rows[0].count, 10) === 0) {
      const seedTopicsPath = path.resolve(__dirname, 'seedTopics.sql');
      if (fs.existsSync(seedTopicsPath)) {
        const seedTopicsSql = fs.readFileSync(seedTopicsPath, 'utf8');
        try {
          await poolInstance.query(seedTopicsSql);
          console.log('[DB-MOES] Seeded topics from seedTopics.sql');
        } catch (sErr) {
          console.error('[DB-MOES] Error running seedTopics.sql:', sErr.message);
        }
      }
    }

    console.log('[DB-MOES] MOES/IMD seeding complete!');
    return quizMappingResult;
  } catch (err) {
    console.error('[DB-MOES] Error seeding MOES/IMD data:', err);
    throw err;
  }
}

module.exports = { seedMoesData };
