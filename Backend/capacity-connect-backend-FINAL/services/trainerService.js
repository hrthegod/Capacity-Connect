
/**
 * Trainer Service
 * Capacity Connect LMS (SIH26075)
 *
 * Architecture:
 * routes -> controllers -> services -> PostgreSQL pool
 */

const db = require('../config/db');

class TrainerService {

  // Get all courses created by trainer
  async getTrainerCourses(trainerId) {
    const res = await db.query(`
      SELECT c.*
      FROM courses c
      WHERE c.trainer_id = $1
      ORDER BY c.created_at DESC
    `, [trainerId]);

    const courses = res.rows;

    if (courses.length === 0) {
      return [];
    }

    // Module counts
    const moduleCountsRes = await db.query(`
      SELECT course_id, COUNT(*) AS count
      FROM modules
      GROUP BY course_id
    `);

    // Enrollment counts
    const enrollmentCountsRes = await db.query(`
      SELECT course_id, COUNT(*) AS count
      FROM enrollments
      GROUP BY course_id
    `);

    // Quiz counts
    const quizCountsRes = await db.query(`
      SELECT course_id, COUNT(*) AS count
      FROM quizzes
      GROUP BY course_id
    `);

    const moduleMap = {};

    moduleCountsRes.rows.forEach(row => {
      moduleMap[row.course_id] = parseInt(row.count, 10);
    });

    const enrollmentMap = {};

    enrollmentCountsRes.rows.forEach(row => {
      enrollmentMap[row.course_id] = parseInt(row.count, 10);
    });

    const quizMap = {};

    quizCountsRes.rows.forEach(row => {
      quizMap[row.course_id] = parseInt(row.count, 10);
    });

    return courses.map(course => ({
      ...course,
      module_count: moduleMap[course.id] || 0,
      student_count: enrollmentMap[course.id] || 0,
      quiz_count: quizMap[course.id] || 0
    }));
  }


  // Get all enrollments in trainer's courses
  async getTrainerEnrollments(trainerId) {
    const res = await db.query(`
      SELECT
        e.id AS enrollment_id,
        e.user_id AS learner_id,
        e.status,
        e.enrolled_at,
        e.completed_at,
        c.id AS course_id,
        c.title AS course_title,
        u.id AS student_id,
        u.name AS student_name,
        u.email AS student_email
      FROM enrollments e
      JOIN courses c
        ON e.course_id = c.id
      JOIN users u
        ON e.user_id = u.id
      WHERE c.trainer_id = $1
      ORDER BY e.enrolled_at DESC
    `, [trainerId]);

    return res.rows;
  }


  // Trainer analytics
  async getTrainerAnalytics(trainerId) {

    // Trainer courses
    const coursesRes = await db.query(`
      SELECT
        id,
        title
      FROM courses
      WHERE trainer_id = $1
      ORDER BY id
    `, [trainerId]);

    const courseIds = coursesRes.rows.map(course => course.id);

    // Trainer has no courses
    if (courseIds.length === 0) {
      return {
        totalCourses: 0,
        totalStudentsEnrolled: 0,
        completedEnrollments: 0,
        completionRatePercentage: 0,
        courses: []
      };
    }

    // Create placeholders: $1, $2, $3...
    const placeholders = courseIds
      .map((_, index) => `$${index + 1}`)
      .join(', ');

    // Get enrollments for trainer courses
    const enrollmentsRes = await db.query(`
      SELECT
        e.id,
        e.course_id,
        e.user_id AS learner_id,
        e.status
      FROM enrollments e
      WHERE e.course_id IN (${placeholders})
    `, courseIds);

    const totalStudents = enrollmentsRes.rows.length;

    const completedStudents =
      enrollmentsRes.rows.filter(
        enrollment => enrollment.status === 'COMPLETED'
      ).length;

    const completionRate =
      totalStudents > 0
        ? Math.round((completedStudents / totalStudents) * 100)
        : 0;

    return {
      totalCourses: courseIds.length,
      totalStudentsEnrolled: totalStudents,
      completedEnrollments: completedStudents,
      completionRatePercentage: completionRate,
      courses: coursesRes.rows
    };
  }

  // Get performance analytics for trainer
  async getTrainerPerformanceAnalytics(trainerId) {
    const enrollmentsRes = await db.query(`
      SELECT 
        e.id AS enrollment_id,
        e.user_id,
        e.course_id,
        e.status AS enrollment_status,
        c.title AS course_title,
        u.name AS user_name,
        u.email AS user_email
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      JOIN users u ON e.user_id = u.id
      WHERE c.trainer_id = $1
      ORDER BY u.name ASC
    `, [trainerId]);

    const enrollments = enrollmentsRes.rows;

    if (enrollments.length === 0) {
      return {
        stats: {
          totalLearners: 0,
          averageScore: 0,
          completionRate: 0,
          assignmentRate: 0,
          overallPerformance: 0
        },
        learners: []
      };
    }

    const quizAttemptsRes = await db.query(`
      SELECT 
        qa.user_id,
        q.course_id,
        qa.percentage
      FROM quiz_attempts qa
      JOIN quizzes q ON qa.quiz_id = q.id
      JOIN courses c ON q.course_id = c.id
      WHERE c.trainer_id = $1
        AND (qa.status = 'SUBMITTED' OR qa.submitted_at IS NOT NULL)
    `, [trainerId]);

    const quizAttempts = quizAttemptsRes.rows;

    const assignmentsRes = await db.query(`
      SELECT a.id, a.course_id
      FROM assignments a
      JOIN courses c ON a.course_id = c.id
      WHERE c.trainer_id = $1
    `, [trainerId]);

    const assignmentSubmissionsRes = await db.query(`
      SELECT sub.user_id, a.course_id
      FROM assignment_submissions sub
      JOIN assignments a ON sub.assignment_id = a.id
      JOIN courses c ON a.course_id = c.id
      WHERE c.trainer_id = $1
    `, [trainerId]);

    const totalAssignmentsCount = assignmentsRes.rows.length;
    const totalSubmissionsCount = assignmentSubmissionsRes.rows.length;

    const attemptsMap = {};
    quizAttempts.forEach(qa => {
      const key = `${qa.user_id}_${qa.course_id}`;
      if (!attemptsMap[key]) attemptsMap[key] = [];
      attemptsMap[key].push(Number(qa.percentage || 0));
    });

    const courseAssignmentsCountMap = {};
    assignmentsRes.rows.forEach(a => {
      courseAssignmentsCountMap[a.course_id] = (courseAssignmentsCountMap[a.course_id] || 0) + 1;
    });

    const userSubmissionsMap = {};
    assignmentSubmissionsRes.rows.forEach(sub => {
      const key = `${sub.user_id}_${sub.course_id}`;
      userSubmissionsMap[key] = (userSubmissionsMap[key] || 0) + 1;
    });

    const uniqueLearners = new Set(enrollments.map(e => e.user_id));

    let overallAvgScore = 0;
    if (quizAttempts.length > 0) {
      const totalPct = quizAttempts.reduce((acc, curr) => acc + Number(curr.percentage || 0), 0);
      overallAvgScore = Math.round(totalPct / quizAttempts.length);
    }

    const completedEnrollmentsCount = enrollments.filter(e => e.enrollment_status === 'COMPLETED').length;
    const overallCompletionRate = Math.round((completedEnrollmentsCount / enrollments.length) * 100);

    let overallAssignmentRate = 0;
    if (totalAssignmentsCount > 0 && enrollments.length > 0) {
      const maxPossibleSubmissions = totalAssignmentsCount * enrollments.length;
      overallAssignmentRate = Math.min(100, Math.round((totalSubmissionsCount / maxPossibleSubmissions) * 100));
    }

    const validMetrics = [overallAvgScore, overallCompletionRate];
    if (totalAssignmentsCount > 0) validMetrics.push(overallAssignmentRate);
    const overallPerformance = Math.round(validMetrics.reduce((a, b) => a + b, 0) / validMetrics.length);

    const learners = enrollments.map((e, idx) => {
      const key = `${e.user_id}_${e.course_id}`;

      const userAttempts = attemptsMap[key] || [];
      let learnerAvgScore = 0;
      if (userAttempts.length > 0) {
        learnerAvgScore = Math.round(userAttempts.reduce((a, b) => a + b, 0) / userAttempts.length);
      }

      const learnerCompletion = e.enrollment_status === 'COMPLETED' ? 100 : (learnerAvgScore > 0 ? 50 : 25);

      const totalCourseAssigns = courseAssignmentsCountMap[e.course_id] || 0;
      const userCourseSubs = userSubmissionsMap[key] || 0;
      let learnerAssignRate = 100;
      if (totalCourseAssigns > 0) {
        learnerAssignRate = Math.min(100, Math.round((userCourseSubs / totalCourseAssigns) * 100));
      }

      let status = 'Needs Attention';
      if (learnerAvgScore >= 85) {
        status = 'Excellent';
      } else if (learnerAvgScore >= 70) {
        status = 'Good';
      } else if (learnerAvgScore >= 50) {
        status = 'Average';
      }

      const themes = ['blue', 'rose', 'peach', 'lavender', 'mint'];

      return {
        id: e.enrollment_id,
        learnerId: `CC${String(e.user_id).padStart(3, '0')}`,
        name: e.user_name,
        email: e.user_email,
        courseId: e.course_id,
        course: e.course_title,
        batch: "—",
        score: learnerAvgScore,
        averageScore: learnerAvgScore,
        completion: learnerCompletion,
        assignments: learnerAssignRate,
        assignmentRate: learnerAssignRate,
        assignmentsCompleted: userCourseSubs,
        assignmentsTotal: totalCourseAssigns || 1,
        status: status,
        lastActive: "—",
        avatar: e.user_name ? e.user_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'L',
        theme: themes[idx % themes.length]
      };
    });

    return {
      stats: {
        totalLearners: uniqueLearners.size,
        averageScore: overallAvgScore,
        completionRate: overallCompletionRate,
        assignmentRate: overallAssignmentRate,
        overallPerformance: overallPerformance
      },
      learners
    };
  }
}

module.exports = new TrainerService();
