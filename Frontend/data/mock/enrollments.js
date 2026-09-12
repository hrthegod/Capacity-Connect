/* =========================================================
   CAPACITY CONNECT
   Mock Enrollment Data
   ========================================================= */

/*
  Temporary learner ID.

  Later this will come from the authenticated user:
  
  const learnerId = loggedInUser.id;
*/
export const CURRENT_LEARNER_ID = "learner-001";

/* =========================================================
   MOCK ENROLLMENTS
   ========================================================= */

let enrollments = [
  {
    id: "enrollment-001",

    learnerId: "learner-001",

    courseId: "course-001",

    status: "active",

    progress: 0,

    enrolledAt: "2026-09-08T10:00:00.000Z",

    completedAt: null,

    lastAccessedAt: null,

    currentModule: 1,

    currentLesson: 1,
  },
];

/* =========================================================
   GET ALL ENROLLMENTS
   ========================================================= */

export const getEnrollments = () => {
  return [...enrollments];
};

/* =========================================================
   GET ENROLLMENT BY ID
   ========================================================= */

export const getEnrollmentById = (enrollmentId) => {
  return (
    enrollments.find((enrollment) => enrollment.id === enrollmentId) || null
  );
};

/* =========================================================
   GET ENROLLMENT FOR A SPECIFIC LEARNER + COURSE
   ========================================================= */

export const getEnrollment = (learnerId, courseId) => {
  return (
    enrollments.find(
      (enrollment) =>
        enrollment.learnerId === learnerId && enrollment.courseId === courseId,
    ) || null
  );
};

/* =========================================================
   GET ALL COURSES FOR A LEARNER
   ========================================================= */

export const getLearnerEnrollments = (learnerId) => {
  return enrollments.filter((enrollment) => enrollment.learnerId === learnerId);
};

/* =========================================================
   CREATE NEW ENROLLMENT
   ========================================================= */

export const createEnrollment = (learnerId, courseId) => {
  /* -------------------------------------------------------
     Prevent duplicate enrollment
  ------------------------------------------------------- */

  const existingEnrollment = getEnrollment(learnerId, courseId);

  if (existingEnrollment) {
    return {
      success: false,
      enrollment: existingEnrollment,
      message: "You are already enrolled in this course.",
    };
  }

  /* -------------------------------------------------------
     Create new enrollment
  ------------------------------------------------------- */

  const newEnrollment = {
    id: `enrollment-${Date.now()}`,

    learnerId,

    courseId,

    status: "active",

    progress: 0,

    enrolledAt: new Date().toISOString(),

    completedAt: null,

    lastAccessedAt: null,

    currentModule: 1,

    currentLesson: 1,
  };

  enrollments.push(newEnrollment);

  return {
    success: true,
    enrollment: newEnrollment,
    message: "Successfully enrolled in the course.",
  };
};

/* =========================================================
   UPDATE ENROLLMENT
   ========================================================= */

export const updateEnrollment = (enrollmentId, updates) => {
  const enrollmentIndex = enrollments.findIndex(
    (enrollment) => enrollment.id === enrollmentId,
  );

  if (enrollmentIndex === -1) {
    return {
      success: false,
      enrollment: null,
      message: "Enrollment not found.",
    };
  }

  enrollments[enrollmentIndex] = {
    ...enrollments[enrollmentIndex],
    ...updates,
  };

  return {
    success: true,
    enrollment: enrollments[enrollmentIndex],
    message: "Enrollment updated successfully.",
  };
};

/* =========================================================
   UPDATE COURSE PROGRESS
   ========================================================= */

export const updateEnrollmentProgress = (
  enrollmentId,
  progress,
  currentModule,
  currentLesson,
) => {
  const enrollment = getEnrollmentById(enrollmentId);

  if (!enrollment) {
    return {
      success: false,
      enrollment: null,
      message: "Enrollment not found.",
    };
  }

  const safeProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  const updates = {
    progress: safeProgress,

    currentModule: currentModule ?? enrollment.currentModule,

    currentLesson: currentLesson ?? enrollment.currentLesson,

    lastAccessedAt: new Date().toISOString(),
  };

  /* -------------------------------------------------------
     Automatically mark course as completed
  ------------------------------------------------------- */

  if (safeProgress >= 100) {
    updates.status = "completed";

    updates.completedAt = enrollment.completedAt || new Date().toISOString();
  }

  return updateEnrollment(enrollmentId, updates);
};

/* =========================================================
   MARK ENROLLMENT AS COMPLETED
   ========================================================= */

export const completeEnrollment = (enrollmentId) => {
  const enrollment = getEnrollmentById(enrollmentId);

  if (!enrollment) {
    return {
      success: false,
      enrollment: null,
      message: "Enrollment not found.",
    };
  }

  return updateEnrollment(enrollmentId, {
    status: "completed",
    progress: 100,
    completedAt: enrollment.completedAt || new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
  });
};

/* =========================================================
   CANCEL / REMOVE ENROLLMENT
   ========================================================= */

export const removeEnrollment = (enrollmentId) => {
  const enrollmentIndex = enrollments.findIndex(
    (enrollment) => enrollment.id === enrollmentId,
  );

  if (enrollmentIndex === -1) {
    return {
      success: false,
      message: "Enrollment not found.",
    };
  }

  const removedEnrollment = enrollments.splice(enrollmentIndex, 1)[0];

  return {
    success: true,
    enrollment: removedEnrollment,
    message: "Enrollment removed successfully.",
  };
};
