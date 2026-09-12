/* =========================================================
   KNOWLEDGE HUB DATA
   Capacity Connect — Learner Knowledge Hub

   Resource Types:
   ✓ Articles
   ✓ Guides
   ✓ Research

   Videos are intentionally excluded because video learning
   is already handled through the Course Catalog / Learning
   Player system.
========================================================= */

/* =========================================================
   RESOURCE DATA
========================================================= */

export const knowledgeResources = [
  /* =======================================================
     ARTICLES
  ======================================================= */

  {
    id: "article-climate-ocean",
    type: "article",

    title: "How Climate Change Is Reshaping Our Oceans",

    description:
      "Understand how rising temperatures, changing ocean chemistry, and sea-level rise are affecting marine ecosystems and coastal communities.",

    category: "Climate & Environment",

    level: "intermediate",

    duration: "8 min",

    readTime: "8 min read",

    author: "Capacity Connect Knowledge Team",

    publishedAt: "2026-08-28",

    featured: true,

    tags: ["Climate Change", "Ocean Science", "Environment"],

    icon: "globe",

    theme: "blue",
  },

  {
    id: "article-marine-biodiversity",
    type: "article",

    title: "Why Marine Biodiversity Matters",

    description:
      "Explore the importance of marine biodiversity and how healthy ocean ecosystems support food systems, climate regulation, and coastal livelihoods.",

    category: "Marine Biodiversity",

    level: "beginner",

    duration: "6 min",

    readTime: "6 min read",

    author: "Capacity Connect Knowledge Team",

    publishedAt: "2026-08-24",

    featured: false,

    tags: ["Marine Biodiversity", "Ocean Conservation", "Ecosystems"],

    icon: "layers",

    theme: "green",
  },

  {
    id: "article-coastal-resilience",
    type: "article",

    title: "Building Resilient Coastal Communities",

    description:
      "Learn how coastal planning, ecosystem protection, early-warning systems, and data-driven decisions can improve resilience against coastal hazards.",

    category: "Coastal Management",

    level: "intermediate",

    duration: "9 min",

    readTime: "9 min read",

    author: "Capacity Connect Knowledge Team",

    publishedAt: "2026-08-20",

    featured: false,

    tags: ["Coastal Management", "Resilience", "Climate Adaptation"],

    icon: "home",

    theme: "purple",
  },

  {
    id: "article-ocean-data",
    type: "article",

    title: "From Ocean Data to Meaningful Insights",

    description:
      "Discover how ocean observations and environmental datasets can be transformed into useful insights for research, planning, and decision-making.",

    category: "Ocean Science",

    level: "intermediate",

    duration: "7 min",

    readTime: "7 min read",

    author: "Capacity Connect Knowledge Team",

    publishedAt: "2026-08-16",

    featured: false,

    tags: ["Ocean Data", "Data Analysis", "Research"],

    icon: "bar-chart",

    theme: "amber",
  },

  /* =======================================================
     GUIDES
  ======================================================= */

  {
    id: "guide-ocean-research",
    type: "guide",

    title: "Getting Started With Ocean Science Research",

    description:
      "A practical beginner-friendly guide to understanding ocean datasets, research questions, observations, documentation, and scientific workflows.",

    category: "Ocean Science",

    level: "beginner",

    duration: "15 min",

    readTime: "15 min read",

    author: "Capacity Connect Research Team",

    publishedAt: "2026-08-30",

    featured: true,

    tags: ["Ocean Science", "Research", "Learning Guide"],

    icon: "book",

    theme: "teal",
  },

  {
    id: "guide-remote-sensing",
    type: "guide",

    title: "Remote Sensing for Ocean and Coastal Studies",

    description:
      "Learn the fundamentals of satellite observations, remote sensing datasets, coastal monitoring, and how geospatial information supports ocean studies.",

    category: "Remote Sensing",

    level: "intermediate",

    duration: "18 min",

    readTime: "18 min read",

    author: "Capacity Connect Research Team",

    publishedAt: "2026-08-25",

    featured: false,

    tags: ["Remote Sensing", "Satellite Data", "Coastal Monitoring"],

    icon: "satellite",

    theme: "cyan",
  },

  {
    id: "guide-data-analysis",
    type: "guide",

    title: "A Practical Guide to Environmental Data Analysis",

    description:
      "Learn a structured approach to cleaning, exploring, visualizing, and interpreting environmental datasets using practical data-analysis concepts.",

    category: "Data Analysis",

    level: "intermediate",

    duration: "20 min",

    readTime: "20 min read",

    author: "Capacity Connect Learning Team",

    publishedAt: "2026-08-18",

    featured: false,

    tags: ["Data Analysis", "Python", "Environmental Data"],

    icon: "database",

    theme: "blue",
  },

  {
    id: "guide-research-methods",
    type: "guide",

    title: "Research Skills for Emerging Scientists",

    description:
      "Develop essential research skills including literature review, question formulation, evidence evaluation, documentation, and scientific communication.",

    category: "Research",

    level: "beginner",

    duration: "12 min",

    readTime: "12 min read",

    author: "Capacity Connect Learning Team",

    publishedAt: "2026-08-12",

    featured: false,

    tags: ["Research", "Scientific Writing", "Critical Thinking"],

    icon: "search",

    theme: "rose",
  },

  /* =======================================================
     RESEARCH
  ======================================================= */

  {
    id: "research-marine-ecosystems",
    type: "research",

    title: "Assessing Changes in Marine Ecosystem Health",

    description:
      "Explore research approaches for assessing marine ecosystem health using environmental observations, biodiversity indicators, and long-term datasets.",

    category: "Marine Biodiversity",

    level: "advanced",

    duration: "25 min",

    readTime: "25 min",

    author: "Capacity Connect Research Repository",

    publishedAt: "2026-08-29",

    featured: true,

    tags: ["Marine Biodiversity", "Ecosystem Health", "Research"],

    icon: "activity",

    theme: "purple",
  },

  {
    id: "research-climate-ocean",
    type: "research",

    title: "Ocean Warming and Its Influence on Marine Systems",

    description:
      "Review research perspectives on ocean warming, temperature trends, marine ecosystems, and the broader implications of changing ocean conditions.",

    category: "Climate & Environment",

    level: "advanced",

    duration: "30 min",

    readTime: "30 min",

    author: "Capacity Connect Research Repository",

    publishedAt: "2026-08-22",

    featured: false,

    tags: ["Ocean Warming", "Climate Change", "Marine Systems"],

    icon: "thermometer",

    theme: "amber",
  },

  {
    id: "research-coastal-monitoring",
    type: "research",

    title: "Data-Driven Coastal Monitoring and Management",

    description:
      "Examine how environmental observations, geospatial datasets, and monitoring technologies can support evidence-based coastal management.",

    category: "Coastal Management",

    level: "advanced",

    duration: "28 min",

    readTime: "28 min",

    author: "Capacity Connect Research Repository",

    publishedAt: "2026-08-15",

    featured: false,

    tags: ["Coastal Management", "Remote Sensing", "Environmental Monitoring"],

    icon: "map",

    theme: "green",
  },

  {
    id: "research-sustainable-ocean",
    type: "research",

    title: "Technology and Sustainable Ocean Development",

    description:
      "Explore how digital technologies, data systems, scientific research, and skilled professionals can contribute to sustainable ocean development.",

    category: "Sustainable Development",

    level: "intermediate",

    duration: "22 min",

    readTime: "22 min",

    author: "Capacity Connect Research Repository",

    publishedAt: "2026-08-08",

    featured: false,

    tags: ["Sustainable Development", "Ocean Technology", "Innovation"],

    icon: "cpu",

    theme: "cyan",
  },
];

/* =========================================================
   LEARNER ID
========================================================= */

export const CURRENT_KNOWLEDGE_LEARNER_ID = "learner-001";

/* =========================================================
   GET ALL RESOURCES
========================================================= */

export const getKnowledgeResources = () => {
  return knowledgeResources;
};

/* =========================================================
   GET RESOURCE BY ID
========================================================= */

export const getKnowledgeResourceById = (resourceId) => {
  return knowledgeResources.find((resource) => resource.id === resourceId);
};

/* =========================================================
   GET BY TYPE
========================================================= */

export const getKnowledgeResourcesByType = (type) => {
  if (!type || type === "all") {
    return knowledgeResources;
  }

  return knowledgeResources.filter((resource) => resource.type === type);
};

/* =========================================================
   GET BY CATEGORY
========================================================= */

export const getKnowledgeResourcesByCategory = (category) => {
  if (!category || category === "all") {
    return knowledgeResources;
  }

  return knowledgeResources.filter(
    (resource) => resource.category === category,
  );
};

/* =========================================================
   GET BY LEVEL
========================================================= */

export const getKnowledgeResourcesByLevel = (level) => {
  if (!level || level === "all") {
    return knowledgeResources;
  }

  return knowledgeResources.filter((resource) => resource.level === level);
};

/* =========================================================
   SEARCH
========================================================= */

export const searchKnowledgeResources = (query) => {
  if (!query?.trim()) {
    return knowledgeResources;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return knowledgeResources.filter((resource) => {
    const searchableText = [
      resource.title,
      resource.description,
      resource.category,
      resource.author,
      resource.type,
      ...resource.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
};

/* =========================================================
   FEATURED RESOURCES
========================================================= */

export const getFeaturedKnowledgeResources = () => {
  return knowledgeResources.filter((resource) => resource.featured);
};

/* =========================================================
   STATISTICS
========================================================= */

export const getKnowledgeStats = () => {
  const articles = knowledgeResources.filter(
    (resource) => resource.type === "article",
  ).length;

  const guides = knowledgeResources.filter(
    (resource) => resource.type === "guide",
  ).length;

  const research = knowledgeResources.filter(
    (resource) => resource.type === "research",
  ).length;

  const totalResources = knowledgeResources.length;

  return {
    totalResources,
    articles,
    guides,
    research,
  };
};
