// src/data/mock/skills.js

export const CURRENT_LEARNER_ID = "learner-001";

/*
|--------------------------------------------------------------------------
| Learner Skills
|--------------------------------------------------------------------------
| Skill proficiency is represented as a percentage from 0–100.
|
| status:
| - strong      → 80–100
| - proficient  → 70–79
| - developing  → 50–69
| - beginner    → 0–49
|--------------------------------------------------------------------------
*/

export const skills = [
  // ------------------------------------------------------------------------
  // Programming
  // ------------------------------------------------------------------------
  {
    id: "skill-001",
    learnerId: CURRENT_LEARNER_ID,
    name: "JavaScript",
    category: "Programming",
    level: 92,
    status: "strong",
    assessed: true,
    lastUpdated: "2026-09-05",
    description:
      "Ability to build interactive applications using modern JavaScript.",
  },

  {
    id: "skill-002",
    learnerId: CURRENT_LEARNER_ID,
    name: "React",
    category: "Programming",
    level: 88,
    status: "strong",
    assessed: true,
    lastUpdated: "2026-09-04",
    description:
      "Ability to build reusable and responsive interfaces using React.",
  },

  {
    id: "skill-003",
    learnerId: CURRENT_LEARNER_ID,
    name: "C Programming",
    category: "Programming",
    level: 76,
    status: "proficient",
    assessed: true,
    lastUpdated: "2026-08-28",
    description:
      "Understanding of programming fundamentals, data structures and problem solving.",
  },

  {
    id: "skill-004",
    learnerId: CURRENT_LEARNER_ID,
    name: "Python",
    category: "Programming",
    level: 58,
    status: "developing",
    assessed: true,
    lastUpdated: "2026-08-25",
    description:
      "Foundational Python knowledge with opportunities for further development.",
  },

  // ------------------------------------------------------------------------
  // Data & Technology
  // ------------------------------------------------------------------------
  {
    id: "skill-005",
    learnerId: CURRENT_LEARNER_ID,
    name: "SQL",
    category: "Data & Technology",
    level: 72,
    status: "proficient",
    assessed: true,
    lastUpdated: "2026-09-01",
    description:
      "Ability to work with relational databases and write SQL queries.",
  },

  {
    id: "skill-006",
    learnerId: CURRENT_LEARNER_ID,
    name: "Data Analysis",
    category: "Data & Technology",
    level: 64,
    status: "developing",
    assessed: true,
    lastUpdated: "2026-08-22",
    description:
      "Foundational ability to interpret, organize and analyze data.",
  },

  {
    id: "skill-007",
    learnerId: CURRENT_LEARNER_ID,
    name: "Git & GitHub",
    category: "Data & Technology",
    level: 82,
    status: "strong",
    assessed: true,
    lastUpdated: "2026-09-06",
    description:
      "Ability to manage source code, branches and collaborative development workflows.",
  },

  // ------------------------------------------------------------------------
  // Professional Skills
  // ------------------------------------------------------------------------
  {
    id: "skill-008",
    learnerId: CURRENT_LEARNER_ID,
    name: "Communication",
    category: "Professional",
    level: 90,
    status: "strong",
    assessed: true,
    lastUpdated: "2026-09-02",
    description:
      "Ability to communicate ideas clearly in professional and collaborative environments.",
  },

  {
    id: "skill-009",
    learnerId: CURRENT_LEARNER_ID,
    name: "Teamwork",
    category: "Professional",
    level: 82,
    status: "strong",
    assessed: true,
    lastUpdated: "2026-09-03",
    description:
      "Ability to collaborate effectively with team members toward shared goals.",
  },

  {
    id: "skill-010",
    learnerId: CURRENT_LEARNER_ID,
    name: "Leadership",
    category: "Professional",
    level: 64,
    status: "developing",
    assessed: true,
    lastUpdated: "2026-08-20",
    description:
      "Developing ability to coordinate teams and take ownership of responsibilities.",
  },

  // ------------------------------------------------------------------------
  // Domain Knowledge
  // ------------------------------------------------------------------------
  {
    id: "skill-011",
    learnerId: CURRENT_LEARNER_ID,
    name: "Ocean Science",
    category: "Domain Knowledge",
    level: 70,
    status: "proficient",
    assessed: true,
    lastUpdated: "2026-08-18",
    description:
      "Understanding of fundamental concepts related to ocean science and marine systems.",
  },

  {
    id: "skill-012",
    learnerId: CURRENT_LEARNER_ID,
    name: "Research",
    category: "Domain Knowledge",
    level: 61,
    status: "developing",
    assessed: true,
    lastUpdated: "2026-08-16",
    description:
      "Foundational ability to gather, evaluate and interpret research information.",
  },
];

/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
*/

export const getLearnerSkills = (learnerId = CURRENT_LEARNER_ID) => {
  return skills.filter((skill) => skill.learnerId === learnerId);
};

export const getSkillById = (skillId) => {
  return skills.find((skill) => skill.id === skillId);
};

export const getSkillsByCategory = (
  category,
  learnerId = CURRENT_LEARNER_ID,
) => {
  return skills.filter(
    (skill) => skill.learnerId === learnerId && skill.category === category,
  );
};

/*
|--------------------------------------------------------------------------
| Skill Statistics
|--------------------------------------------------------------------------
*/

export const getSkillStats = (learnerId = CURRENT_LEARNER_ID) => {
  const learnerSkills = getLearnerSkills(learnerId);

  const totalSkills = learnerSkills.length;

  const strongSkills = learnerSkills.filter(
    (skill) => skill.level >= 80,
  ).length;

  const proficientSkills = learnerSkills.filter(
    (skill) => skill.level >= 70 && skill.level < 80,
  ).length;

  const developingSkills = learnerSkills.filter(
    (skill) => skill.level >= 50 && skill.level < 70,
  ).length;

  const beginnerSkills = learnerSkills.filter(
    (skill) => skill.level < 50,
  ).length;

  const averageLevel =
    totalSkills > 0
      ? Math.round(
          learnerSkills.reduce((total, skill) => total + skill.level, 0) /
            totalSkills,
        )
      : 0;

  return {
    totalSkills,
    strongSkills,
    proficientSkills,
    developingSkills,
    beginnerSkills,
    averageLevel,
  };
};

/*
|--------------------------------------------------------------------------
| Useful Skill Lists
|--------------------------------------------------------------------------
*/

export const getTopSkills = (learnerId = CURRENT_LEARNER_ID, limit = 3) => {
  return [...getLearnerSkills(learnerId)]
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
};

export const getDevelopingSkills = (
  learnerId = CURRENT_LEARNER_ID,
  limit = 3,
) => {
  return [...getLearnerSkills(learnerId)]
    .filter((skill) => skill.level < 70)
    .sort((a, b) => a.level - b.level)
    .slice(0, limit);
};

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

export const skillCategories = [
  {
    id: "programming",
    name: "Programming",
    description: "Languages, frameworks and software development.",
  },
  {
    id: "data-technology",
    name: "Data & Technology",
    description: "Data, databases and modern development tools.",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Communication, teamwork and leadership capabilities.",
  },
  {
    id: "domain-knowledge",
    name: "Domain Knowledge",
    description: "Knowledge related to ocean science and research.",
  },
];
