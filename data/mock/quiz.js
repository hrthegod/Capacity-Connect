// src/data/mock/quiz.js

export const CURRENT_QUIZ_LEARNER_ID = "learner-001";

export const quizzes = [
  // Course 1: MOES-IMD-01 (Fundamentals of Meteorological Observations)
  {
    quizId: "3",
    courseId: "MOES-IMD-01",
    courseTitle: "Fundamentals of Meteorological Observations",
    quizTitle: "Surface Observatory Network & Siting Standards Assessment",
    description: "Assessment for Unit 1: Surface Observatory Network & Siting Standards",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Beginner",
    category: "Observations",
    status: "available",
  },
  {
    quizId: "4",
    courseId: "MOES-IMD-01",
    courseTitle: "Fundamentals of Meteorological Observations",
    quizTitle: "Conventional Meteorological Instruments Assessment",
    description: "Assessment for Unit 2: Conventional Meteorological Instruments",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Beginner",
    category: "Observations",
    status: "available",
  },
  {
    quizId: "5",
    courseId: "MOES-IMD-01",
    courseTitle: "Fundamentals of Meteorological Observations",
    quizTitle: "Automatic Weather Stations & Automatic Rain Gauges Assessment",
    description: "Assessment for Unit 3: Automatic Weather Stations & Automatic Rain Gauges",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Beginner",
    category: "Observations",
    status: "available",
  },
  {
    quizId: "6",
    courseId: "MOES-IMD-01",
    courseTitle: "Fundamentals of Meteorological Observations",
    quizTitle: "Upper-Air Observations Assessment",
    description: "Assessment for Unit 4: Upper-Air Observations",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Beginner",
    category: "Observations",
    status: "available",
  },
  {
    quizId: "7",
    courseId: "MOES-IMD-01",
    courseTitle: "Fundamentals of Meteorological Observations",
    quizTitle: "Observation Coding, Recording & Quality Control (SYNOP/METAR) Assessment",
    description: "Assessment for Unit 5: Observation Coding, Recording & Quality Control (SYNOP/METAR)",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Beginner",
    category: "Observations",
    status: "available",
  },

  // Course 2: MOES-IMD-02 (Weather Forecasting Techniques)
  {
    quizId: "8",
    courseId: "MOES-IMD-02",
    courseTitle: "Weather Forecasting Techniques",
    quizTitle: "Synoptic Meteorology Fundamentals Assessment",
    description: "Assessment for Unit 1: Synoptic Meteorology Fundamentals",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Forecasting",
    status: "available",
  },
  {
    quizId: "9",
    courseId: "MOES-IMD-02",
    courseTitle: "Weather Forecasting Techniques",
    quizTitle: "Numerical Weather Prediction Guidance Assessment",
    description: "Assessment for Unit 2: Numerical Weather Prediction Guidance",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Forecasting",
    status: "available",
  },
  {
    quizId: "10",
    courseId: "MOES-IMD-02",
    courseTitle: "Weather Forecasting Techniques",
    quizTitle: "Nowcasting for Severe Weather Assessment",
    description: "Assessment for Unit 3: Nowcasting for Severe Weather",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Forecasting",
    status: "available",
  },
  {
    quizId: "11",
    courseId: "MOES-IMD-02",
    courseTitle: "Weather Forecasting Techniques",
    quizTitle: "Monsoon and Seasonal Forecasting Assessment",
    description: "Assessment for Unit 4: Monsoon and Seasonal Forecasting",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Forecasting",
    status: "available",
  },
  {
    quizId: "12",
    courseId: "MOES-IMD-02",
    courseTitle: "Weather Forecasting Techniques",
    quizTitle: "Forecast Verification and Communication Assessment",
    description: "Assessment for Unit 5: Forecast Verification and Communication",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Forecasting",
    status: "available",
  },

  // Course 3: MOES-IMD-03 (Doppler Weather Radar (DWR) Operations and Maintenance)
  {
    quizId: "13",
    courseId: "MOES-IMD-03",
    courseTitle: "Doppler Weather Radar (DWR) Operations and Maintenance",
    quizTitle: "Principles of Radar Meteorology & the IMD DWR Network Assessment",
    description: "Assessment for Unit 1: Principles of Radar Meteorology & the IMD DWR Network",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Radar Meteorology",
    status: "available",
  },
  {
    quizId: "14",
    courseId: "MOES-IMD-03",
    courseTitle: "Doppler Weather Radar (DWR) Operations and Maintenance",
    quizTitle: "Radar Hardware, Signal Processing & Calibration Assessment",
    description: "Assessment for Unit 2: Radar Hardware, Signal Processing & Calibration",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Radar Meteorology",
    status: "available",
  },
  {
    quizId: "15",
    courseId: "MOES-IMD-03",
    courseTitle: "Doppler Weather Radar (DWR) Operations and Maintenance",
    quizTitle: "Interpreting Radar Products (Reflectivity, Velocity, PPI/RHI) Assessment",
    description: "Assessment for Unit 3: Interpreting Radar Products (Reflectivity, Velocity, PPI/RHI)",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Radar Meteorology",
    status: "available",
  },
  {
    quizId: "16",
    courseId: "MOES-IMD-03",
    courseTitle: "Doppler Weather Radar (DWR) Operations and Maintenance",
    quizTitle: "Radar Data Quality Control Assessment",
    description: "Assessment for Unit 4: Radar Data Quality Control",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Radar Meteorology",
    status: "available",
  },
  {
    quizId: "17",
    courseId: "MOES-IMD-03",
    courseTitle: "Doppler Weather Radar (DWR) Operations and Maintenance",
    quizTitle: "Radar-Based Nowcasting of Thunderstorms & Hailstorms Assessment",
    description: "Assessment for Unit 5: Radar-Based Nowcasting of Thunderstorms & Hailstorms",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Radar Meteorology",
    status: "available",
  },

  // Course 4: MOES-IMD-04 (Climate Data Analysis and Management)
  {
    quizId: "18",
    courseId: "MOES-IMD-04",
    courseTitle: "Climate Data Analysis and Management",
    quizTitle: "IMD's Climatological Data Archive & National Data Centre Assessment",
    description: "Assessment for Unit 1: IMD's Climatological Data Archive & National Data Centre",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Climate Services",
    status: "available",
  },
  {
    quizId: "19",
    courseId: "MOES-IMD-04",
    courseTitle: "Climate Data Analysis and Management",
    quizTitle: "Data Digitization and Quality Control Procedures Assessment",
    description: "Assessment for Unit 2: Data Digitization and Quality Control Procedures",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Climate Services",
    status: "available",
  },
  {
    quizId: "20",
    courseId: "MOES-IMD-04",
    courseTitle: "Climate Data Analysis and Management",
    quizTitle: "Statistical Climatology: Normals, Anomalies & Trends Assessment",
    description: "Assessment for Unit 3: Statistical Climatology: Normals, Anomalies & Trends",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Climate Services",
    status: "available",
  },
  {
    quizId: "21",
    courseId: "MOES-IMD-04",
    courseTitle: "Climate Data Analysis and Management",
    quizTitle: "Analysis of Extreme Weather Events Assessment",
    description: "Assessment for Unit 4: Analysis of Extreme Weather Events",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Climate Services",
    status: "available",
  },
  {
    quizId: "22",
    courseId: "MOES-IMD-04",
    courseTitle: "Climate Data Analysis and Management",
    quizTitle: "Climate Data Products & User Services Assessment",
    description: "Assessment for Unit 5: Climate Data Products & User Services",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Intermediate",
    category: "Climate Services",
    status: "available",
  },

  // Course 5: MOES-IMD-05 (Disaster Warning and Dissemination Systems)
  {
    quizId: "23",
    courseId: "MOES-IMD-05",
    courseTitle: "Disaster Warning and Dissemination Systems",
    quizTitle: "Cyclone Warning System & Area Cyclone Warning Centres Assessment",
    description: "Assessment for Unit 1: Cyclone Warning System & Area Cyclone Warning Centres",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Advanced",
    category: "Disaster Management",
    status: "available",
  },
  {
    quizId: "24",
    courseId: "MOES-IMD-05",
    courseTitle: "Disaster Warning and Dissemination Systems",
    quizTitle: "Heat Wave and Cold Wave Warning Protocols Assessment",
    description: "Assessment for Unit 2: Heat Wave and Cold Wave Warning Protocols",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Advanced",
    category: "Disaster Management",
    status: "available",
  },
  {
    quizId: "25",
    courseId: "MOES-IMD-05",
    courseTitle: "Disaster Warning and Dissemination Systems",
    quizTitle: "Common Alerting Protocol (CAP) & Multi-Channel Dissemination Assessment",
    description: "Assessment for Unit 3: Common Alerting Protocol (CAP) & Multi-Channel Dissemination",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Advanced",
    category: "Disaster Management",
    status: "available",
  },
  {
    quizId: "26",
    courseId: "MOES-IMD-05",
    courseTitle: "Disaster Warning and Dissemination Systems",
    quizTitle: "Coordination with NDMA, SDMA & District Administration Assessment",
    description: "Assessment for Unit 4: Coordination with NDMA, SDMA & District Administration",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Advanced",
    category: "Disaster Management",
    status: "available",
  },
  {
    quizId: "27",
    courseId: "MOES-IMD-05",
    courseTitle: "Disaster Warning and Dissemination Systems",
    quizTitle: "Impact-Based Forecasting & Warning Communication Assessment",
    description: "Assessment for Unit 5: Impact-Based Forecasting & Warning Communication",
    duration: 20,
    passingScore: 60,
    totalQuestions: 15,
    difficulty: "Advanced",
    category: "Disaster Management",
    status: "available",
  },
];

export const getQuizzes = () => {
  return quizzes;
};

export const getQuizById = (quizId) => {
  return quizzes.find((quiz) => String(quiz.quizId) === String(quizId)) || null;
};

export const getQuizzesByCourse = (courseId) => {
  return quizzes.filter((quiz) => quiz.courseId === courseId);
};

export const getQuizzesByCategory = (category) => {
  return quizzes.filter((quiz) => quiz.category === category);
};

export const getQuizzesByDifficulty = (difficulty) => {
  return quizzes.filter((quiz) => quiz.difficulty === difficulty);
};

export const searchQuizzes = (query) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return quizzes;
  }

  return quizzes.filter((quiz) => {
    return (
      quiz.quizTitle.toLowerCase().includes(normalizedQuery) ||
      quiz.courseTitle.toLowerCase().includes(normalizedQuery) ||
      quiz.category.toLowerCase().includes(normalizedQuery) ||
      quiz.difficulty.toLowerCase().includes(normalizedQuery)
    );
  });
};

export const getQuizStats = () => {
  const totalQuizzes = quizzes.length;

  const totalQuestions = quizzes.reduce(
    (total, quiz) => total + quiz.totalQuestions,
    0,
  );

  const averagePassingScore =
    totalQuizzes > 0
      ? quizzes.reduce((total, quiz) => total + quiz.passingScore, 0) /
        totalQuizzes
      : 0;

  const categories = [...new Set(quizzes.map((quiz) => quiz.category))];

  return {
    totalQuizzes,
    totalQuestions,
    averagePassingScore,
    categoriesCount: categories.length,
  };
};

export const getQuizCategories = () => {
  return [...new Set(quizzes.map((quiz) => quiz.category))];
};

export const getQuizDifficulties = () => {
  return [...new Set(quizzes.map((quiz) => quiz.difficulty))];
};
