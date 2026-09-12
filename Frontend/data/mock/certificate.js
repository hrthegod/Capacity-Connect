/* =========================================================
   CERTIFICATE DATA
   Capacity Connect — Learner Certificates

   Purpose:
   ✓ Single source of truth for learner certificates
   ✓ API-ready structure
   ✓ Supports certificate listing
   ✓ Supports certificate details
   ✓ Supports filtering
   ✓ Supports statistics
   ✓ Supports future download / verification flow
========================================================= */

/* =========================================================
   CURRENT LEARNER
========================================================= */

export const CURRENT_CERTIFICATE_LEARNER_ID = "learner-001";

/* =========================================================
   CERTIFICATE DATA
========================================================= */

export const certificates = [
  {
    id: "certificate-001",

    learnerId: "learner-001",

    courseId: "course-full-stack-development",

    courseTitle: "Full Stack Web Development",

    certificateNumber: "CC-FSWD-2026-001",

    credentialType: "Course Certificate",

    status: "issued",

    issuedAt: "2026-08-28",

    completionDate: "2026-08-27",

    score: 92,

    duration: "8 weeks",

    learningHours: 64,

    instructor: "Capacity Connect Learning Team",

    category: "Web Development",

    level: "intermediate",

    description:
      "Certificate awarded for successfully completing the Full Stack Web Development learning program.",

    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "PostgreSQL"],

    verification: {
      isVerified: true,
      verificationCode: "CC-VERIFY-FSWD-001",
    },

    download: {
      available: true,
      fileType: "PDF",
    },

    theme: "blue",

    icon: "code",
  },

  {
    id: "certificate-002",

    learnerId: "learner-001",

    courseId: "course-react-development",

    courseTitle: "Modern React Development",

    certificateNumber: "CC-REACT-2026-002",

    credentialType: "Course Certificate",

    status: "issued",

    issuedAt: "2026-07-18",

    completionDate: "2026-07-17",

    score: 88,

    duration: "5 weeks",

    learningHours: 42,

    instructor: "Capacity Connect Frontend Team",

    category: "Web Development",

    level: "intermediate",

    description:
      "Certificate awarded for successfully completing the Modern React Development learning program.",

    skills: [
      "React",
      "JavaScript",
      "React Router",
      "Component Architecture",
      "State Management",
    ],

    verification: {
      isVerified: true,
      verificationCode: "CC-VERIFY-REACT-002",
    },

    download: {
      available: true,
      fileType: "PDF",
    },

    theme: "purple",

    icon: "layers",
  },

  {
    id: "certificate-003",

    learnerId: "learner-001",

    courseId: "course-python-data-analysis",

    courseTitle: "Python & Data Analysis",

    certificateNumber: "CC-PYDA-2026-003",

    credentialType: "Course Certificate",

    status: "issued",

    issuedAt: "2026-06-25",

    completionDate: "2026-06-24",

    score: 84,

    duration: "6 weeks",

    learningHours: 48,

    instructor: "Capacity Connect Data Team",

    category: "Data & Analytics",

    level: "intermediate",

    description:
      "Certificate awarded for successfully completing the Python & Data Analysis learning program.",

    skills: [
      "Python",
      "Data Analysis",
      "Pandas",
      "Data Visualization",
      "Data Cleaning",
    ],

    verification: {
      isVerified: true,
      verificationCode: "CC-VERIFY-PYDA-003",
    },

    download: {
      available: true,
      fileType: "PDF",
    },

    theme: "green",

    icon: "bar-chart",
  },

  {
    id: "certificate-004",

    learnerId: "learner-001",

    courseId: "course-ocean-science",

    courseTitle: "Ocean Science Foundations",

    certificateNumber: "CC-OSF-2026-004",

    credentialType: "Course Certificate",

    status: "issued",

    issuedAt: "2026-05-30",

    completionDate: "2026-05-29",

    score: 91,

    duration: "7 weeks",

    learningHours: 56,

    instructor: "Capacity Connect Research Team",

    category: "Ocean Science",

    level: "proficient",

    description:
      "Certificate awarded for successfully completing the Ocean Science Foundations learning program.",

    skills: [
      "Ocean Science",
      "Marine Ecosystems",
      "Ocean Data",
      "Environmental Research",
      "Scientific Thinking",
    ],

    verification: {
      isVerified: true,
      verificationCode: "CC-VERIFY-OSF-004",
    },

    download: {
      available: true,
      fileType: "PDF",
    },

    theme: "teal",

    icon: "globe",
  },

  {
    id: "certificate-005",

    learnerId: "learner-001",

    courseId: "course-professional-communication",

    courseTitle: "Professional Communication",

    certificateNumber: "CC-PC-2026-005",

    credentialType: "Course Certificate",

    status: "issued",

    issuedAt: "2026-04-16",

    completionDate: "2026-04-15",

    score: 90,

    duration: "4 weeks",

    learningHours: 32,

    instructor: "Capacity Connect Professional Skills Team",

    category: "Professional Skills",

    level: "intermediate",

    description:
      "Certificate awarded for successfully completing the Professional Communication learning program.",

    skills: [
      "Communication",
      "Presentation",
      "Professional Writing",
      "Collaboration",
      "Public Speaking",
    ],

    verification: {
      isVerified: true,
      verificationCode: "CC-VERIFY-PC-005",
    },

    download: {
      available: true,
      fileType: "PDF",
    },

    theme: "amber",

    icon: "users",
  },

  {
    id: "certificate-006",

    learnerId: "learner-001",

    courseId: "course-github-workflow",

    courseTitle: "Git & GitHub Workflow",

    certificateNumber: "CC-GH-2026-006",

    credentialType: "Course Certificate",

    status: "issued",

    issuedAt: "2026-03-22",

    completionDate: "2026-03-21",

    score: 86,

    duration: "3 weeks",

    learningHours: 24,

    instructor: "Capacity Connect Engineering Team",

    category: "Development Tools",

    level: "beginner",

    description:
      "Certificate awarded for successfully completing the Git & GitHub Workflow learning program.",

    skills: ["Git", "GitHub", "Branching", "Pull Requests", "Collaboration"],

    verification: {
      isVerified: true,
      verificationCode: "CC-VERIFY-GH-006",
    },

    download: {
      available: true,
      fileType: "PDF",
    },

    theme: "rose",

    icon: "git",
  },
];

/* =========================================================
   GET ALL CERTIFICATES
========================================================= */

export const getCertificates = () => {
  return certificates;
};

/* =========================================================
   GET CERTIFICATES FOR LEARNER
========================================================= */

export const getCertificatesByLearner = (learnerId) => {
  if (!learnerId) {
    return [];
  }

  return certificates.filter(
    (certificate) => certificate.learnerId === learnerId,
  );
};

/* =========================================================
   GET CURRENT LEARNER CERTIFICATES
========================================================= */

export const getCurrentLearnerCertificates = () => {
  return getCertificatesByLearner(CURRENT_CERTIFICATE_LEARNER_ID);
};

/* =========================================================
   GET CERTIFICATE BY ID
========================================================= */

export const getCertificateById = (certificateId) => {
  return certificates.find((certificate) => certificate.id === certificateId);
};

/* =========================================================
   GET CERTIFICATE BY CERTIFICATE NUMBER
========================================================= */

export const getCertificateByNumber = (certificateNumber) => {
  return certificates.find(
    (certificate) => certificate.certificateNumber === certificateNumber,
  );
};

/* =========================================================
   GET CERTIFICATES BY STATUS
========================================================= */

export const getCertificatesByStatus = (status) => {
  if (!status || status === "all") {
    return certificates;
  }

  return certificates.filter((certificate) => certificate.status === status);
};

/* =========================================================
   GET CERTIFICATES BY CATEGORY
========================================================= */

export const getCertificatesByCategory = (category) => {
  if (!category || category === "all") {
    return certificates;
  }

  return certificates.filter(
    (certificate) => certificate.category === category,
  );
};

/* =========================================================
   GET CERTIFICATES BY LEVEL
========================================================= */

export const getCertificatesByLevel = (level) => {
  if (!level || level === "all") {
    return certificates;
  }

  return certificates.filter((certificate) => certificate.level === level);
};

/* =========================================================
   SEARCH CERTIFICATES
========================================================= */

export const searchCertificates = (query) => {
  if (!query?.trim()) {
    return certificates;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return certificates.filter((certificate) => {
    const searchableText = [
      certificate.courseTitle,
      certificate.certificateNumber,
      certificate.credentialType,
      certificate.category,
      certificate.level,
      certificate.instructor,
      certificate.description,
      ...certificate.skills,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
};

/* =========================================================
   GET LATEST CERTIFICATE
========================================================= */

export const getLatestCertificate = (learnerId) => {
  const learnerCertificates = getCertificatesByLearner(learnerId);

  if (!learnerCertificates.length) {
    return null;
  }

  return [...learnerCertificates].sort(
    (first, second) => new Date(second.issuedAt) - new Date(first.issuedAt),
  )[0];
};

/* =========================================================
   GET CERTIFICATE STATISTICS
========================================================= */

export const getCertificateStats = (learnerId) => {
  const learnerCertificates = getCertificatesByLearner(learnerId);

  const totalCertificates = learnerCertificates.length;

  const issuedCertificates = learnerCertificates.filter(
    (certificate) => certificate.status === "issued",
  ).length;

  const verifiedCertificates = learnerCertificates.filter(
    (certificate) => certificate.verification?.isVerified === true,
  ).length;

  const downloadableCertificates = learnerCertificates.filter(
    (certificate) => certificate.download?.available === true,
  ).length;

  const totalLearningHours = learnerCertificates.reduce(
    (total, certificate) => total + (certificate.learningHours || 0),
    0,
  );

  const averageScore =
    totalCertificates > 0
      ? Math.round(
          learnerCertificates.reduce(
            (total, certificate) => total + (certificate.score || 0),
            0,
          ) / totalCertificates,
        )
      : 0;

  return {
    totalCertificates,
    issuedCertificates,
    verifiedCertificates,
    downloadableCertificates,
    totalLearningHours,
    averageScore,
  };
};

/* =========================================================
   GET CERTIFICATE CATEGORIES
========================================================= */

export const getCertificateCategories = (learnerId) => {
  const learnerCertificates = getCertificatesByLearner(learnerId);

  return [
    ...new Set(learnerCertificates.map((certificate) => certificate.category)),
  ];
};

/* =========================================================
   GET CERTIFICATE LEVELS
========================================================= */

export const getCertificateLevels = (learnerId) => {
  const learnerCertificates = getCertificatesByLearner(learnerId);

  return [
    ...new Set(learnerCertificates.map((certificate) => certificate.level)),
  ];
};
