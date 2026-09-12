// src/data/mock/quiz.js

export const CURRENT_QUIZ_LEARNER_ID = "learner-001";

export const quizzes = [
  {
    quizId: "quiz-js-001",
    courseId: "course-js-001",
    courseTitle: "Modern JavaScript Development",
    quizTitle: "JavaScript Fundamentals Quiz",
    description:
      "Test your understanding of JavaScript fundamentals, variables, functions, arrays, objects, and modern syntax.",
    duration: 20,
    passingScore: 70,
    totalQuestions: 10,
    difficulty: "Intermediate",
    category: "Web Development",
    status: "available",

    questions: [
      {
        questionId: "js-q1",
        question: "Which keyword is used to declare a block-scoped variable?",
        options: ["var", "let", "define", "variable"],
        correctAnswer: "let",
        explanation:
          "The let keyword declares a block-scoped variable in JavaScript.",
        points: 1,
      },
      {
        questionId: "js-q2",
        question:
          "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()",
        explanation:
          "The push() method adds one or more elements to the end of an array.",
        points: 1,
      },
      {
        questionId: "js-q3",
        question: "What does === check in JavaScript?",
        options: [
          "Only value",
          "Only type",
          "Value and type",
          "Reference only",
        ],
        correctAnswer: "Value and type",
        explanation:
          "The strict equality operator === checks both value and data type.",
        points: 1,
      },
      {
        questionId: "js-q4",
        question:
          "Which method creates a new array by transforming every element?",
        options: ["filter()", "map()", "find()", "reduce()"],
        correctAnswer: "map()",
        explanation:
          "map() creates a new array containing the results of calling a function on every element.",
        points: 1,
      },
      {
        questionId: "js-q5",
        question: "Which value represents an intentional absence of a value?",
        options: ["undefined", "null", "empty", "void"],
        correctAnswer: "null",
        explanation:
          "null is commonly used to explicitly represent the intentional absence of a value.",
        points: 1,
      },
      {
        questionId: "js-q6",
        question: "Which syntax is used for an arrow function?",
        options: [
          "function => ()",
          "() => {}",
          "function() -> {}",
          "=> function()",
        ],
        correctAnswer: "() => {}",
        explanation:
          "Arrow functions use the => syntax, for example const add = () => {}.",
        points: 1,
      },
      {
        questionId: "js-q7",
        question: "Which method removes the last element from an array?",
        options: ["shift()", "slice()", "pop()", "remove()"],
        correctAnswer: "pop()",
        explanation:
          "The pop() method removes and returns the last element of an array.",
        points: 1,
      },
      {
        questionId: "js-q8",
        question: "What does JSON stand for?",
        options: [
          "JavaScript Object Notation",
          "Java Source Object Network",
          "JavaScript Online Network",
          "Java Object Notation",
        ],
        correctAnswer: "JavaScript Object Notation",
        explanation: "JSON stands for JavaScript Object Notation.",
        points: 1,
      },
      {
        questionId: "js-q9",
        question: "Which keyword is used to create a constant?",
        options: ["let", "constant", "const", "static"],
        correctAnswer: "const",
        explanation:
          "The const keyword creates a block-scoped binding that cannot be reassigned.",
        points: 1,
      },
      {
        questionId: "js-q10",
        question: "Which method is commonly used to filter array elements?",
        options: ["filter()", "map()", "sort()", "join()"],
        correctAnswer: "filter()",
        explanation:
          "filter() creates a new array containing elements that satisfy a condition.",
        points: 1,
      },
    ],
  },

  {
    quizId: "quiz-react-001",
    courseId: "course-react-001",
    courseTitle: "Modern React Development",
    quizTitle: "React Fundamentals Quiz",
    description:
      "Evaluate your knowledge of React components, props, state, hooks, events, and rendering.",
    duration: 25,
    passingScore: 70,
    totalQuestions: 10,
    difficulty: "Intermediate",
    category: "Web Development",
    status: "available",

    questions: [
      {
        questionId: "react-q1",
        question: "What is a React component?",
        options: [
          "A reusable UI building block",
          "A database table",
          "A CSS property",
          "A backend server",
        ],
        correctAnswer: "A reusable UI building block",
        explanation: "React applications are built using reusable components.",
        points: 1,
      },
      {
        questionId: "react-q2",
        question: "Which hook is commonly used to manage component state?",
        options: ["useEffect", "useState", "useRef", "useMemo"],
        correctAnswer: "useState",
        explanation: "useState allows functional components to manage state.",
        points: 1,
      },
      {
        questionId: "react-q3",
        question: "How are data passed from a parent component to a child?",
        options: ["State", "Props", "Events", "Hooks"],
        correctAnswer: "Props",
        explanation:
          "Props are used to pass data from parent components to child components.",
        points: 1,
      },
      {
        questionId: "react-q4",
        question: "Which hook is commonly used for side effects?",
        options: ["useState", "useEffect", "useContext", "useId"],
        correctAnswer: "useEffect",
        explanation:
          "useEffect is used to perform side effects in functional components.",
        points: 1,
      },
      {
        questionId: "react-q5",
        question: "What is JSX?",
        options: [
          "A JavaScript syntax extension",
          "A database",
          "A CSS framework",
          "A backend language",
        ],
        correctAnswer: "A JavaScript syntax extension",
        explanation:
          "JSX is a syntax extension that allows HTML-like markup inside JavaScript.",
        points: 1,
      },
      {
        questionId: "react-q6",
        question: "Why are keys used when rendering lists in React?",
        options: [
          "For styling",
          "To uniquely identify elements",
          "To create CSS classes",
          "To fetch APIs",
        ],
        correctAnswer: "To uniquely identify elements",
        explanation: "Keys help React identify which list items have changed.",
        points: 1,
      },
      {
        questionId: "react-q7",
        question: "Which syntax is commonly used to render a component?",
        options: [
          "<Component />",
          "Component()",
          "render Component",
          "[Component]",
        ],
        correctAnswer: "<Component />",
        explanation:
          "React components are commonly rendered using JSX syntax such as <Component />.",
        points: 1,
      },
      {
        questionId: "react-q8",
        question:
          "Can props normally be modified directly by a child component?",
        options: ["Yes", "No", "Only with CSS", "Only with JSX"],
        correctAnswer: "No",
        explanation:
          "Props are read-only from the receiving component's perspective.",
        points: 1,
      },
      {
        questionId: "react-q9",
        question: "What happens when React state changes?",
        options: [
          "The component can re-render",
          "The browser closes",
          "The database resets",
          "CSS is deleted",
        ],
        correctAnswer: "The component can re-render",
        explanation:
          "Updating state schedules a re-render so the UI can reflect the new state.",
        points: 1,
      },
      {
        questionId: "react-q10",
        question: "Which library is React primarily used for?",
        options: [
          "Building user interfaces",
          "Database management",
          "Operating systems",
          "Network routing",
        ],
        correctAnswer: "Building user interfaces",
        explanation:
          "React is a JavaScript library primarily used for building user interfaces.",
        points: 1,
      },
    ],
  },

  {
    quizId: "quiz-python-001",
    courseId: "course-python-001",
    courseTitle: "Python & Data Analysis",
    quizTitle: "Python Programming Quiz",
    description:
      "Check your understanding of Python syntax, data structures, functions, loops, and basic programming concepts.",
    duration: 20,
    passingScore: 70,
    totalQuestions: 10,
    difficulty: "Beginner",
    category: "Data & Analytics",
    status: "available",

    questions: [
      {
        questionId: "python-q1",
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "fun", "define"],
        correctAnswer: "def",
        explanation: "Python uses the def keyword to define functions.",
        points: 1,
      },
      {
        questionId: "python-q2",
        question:
          "Which data type stores an ordered collection that can be modified?",
        options: ["Tuple", "List", "Set", "String"],
        correctAnswer: "List",
        explanation: "Lists are ordered and mutable collections in Python.",
        points: 1,
      },
      {
        questionId: "python-q3",
        question: "Which symbol is used for a single-line comment?",
        options: ["//", "#", "<!--", "/*"],
        correctAnswer: "#",
        explanation: "Python uses # for single-line comments.",
        points: 1,
      },
      {
        questionId: "python-q4",
        question: "Which function is used to display output?",
        options: ["display()", "console()", "print()", "output()"],
        correctAnswer: "print()",
        explanation: "The print() function displays output in Python.",
        points: 1,
      },
      {
        questionId: "python-q5",
        question: "Which keyword is used for a conditional statement?",
        options: ["when", "if", "condition", "check"],
        correctAnswer: "if",
        explanation: "Python uses the if keyword for conditional execution.",
        points: 1,
      },
      {
        questionId: "python-q6",
        question: "Which collection stores key-value pairs?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        correctAnswer: "Dictionary",
        explanation: "Python dictionaries store data using key-value pairs.",
        points: 1,
      },
      {
        questionId: "python-q7",
        question: "Which keyword is used to create a loop over a sequence?",
        options: ["for", "loop", "repeat", "iterate"],
        correctAnswer: "for",
        explanation:
          "The for keyword is used to iterate over sequences and other iterables.",
        points: 1,
      },
      {
        questionId: "python-q8",
        question: "Which function returns the number of items in a collection?",
        options: ["count()", "size()", "length()", "len()"],
        correctAnswer: "len()",
        explanation: "len() returns the number of items in a collection.",
        points: 1,
      },
      {
        questionId: "python-q9",
        question: "Which value represents a Boolean true value?",
        options: ["true", "TRUE", "True", "1true"],
        correctAnswer: "True",
        explanation: "Python uses True and False as Boolean values.",
        points: 1,
      },
      {
        questionId: "python-q10",
        question: "Which operator is used for exponentiation in Python?",
        options: ["^", "**", "//", "%%"],
        correctAnswer: "**",
        explanation: "The ** operator is used for exponentiation in Python.",
        points: 1,
      },
    ],
  },

  {
    quizId: "quiz-sql-001",
    courseId: "course-sql-001",
    courseTitle: "SQL & Database Fundamentals",
    quizTitle: "SQL Fundamentals Quiz",
    description:
      "Test your knowledge of SQL queries, filtering, joins, aggregation, and database fundamentals.",
    duration: 25,
    passingScore: 70,
    totalQuestions: 10,
    difficulty: "Intermediate",
    category: "Database",
    status: "available",

    questions: [
      {
        questionId: "sql-q1",
        question: "Which SQL command is used to retrieve data?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        correctAnswer: "SELECT",
        explanation: "SELECT is used to retrieve data from database tables.",
        points: 1,
      },
      {
        questionId: "sql-q2",
        question: "Which clause is used to filter rows?",
        options: ["FILTER", "WHERE", "HAVING", "CHECK"],
        correctAnswer: "WHERE",
        explanation: "WHERE filters rows before grouping and aggregation.",
        points: 1,
      },
      {
        questionId: "sql-q3",
        question: "Which clause is used to sort query results?",
        options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE"],
        correctAnswer: "ORDER BY",
        explanation: "ORDER BY sorts the result set.",
        points: 1,
      },
      {
        questionId: "sql-q4",
        question: "Which function counts rows?",
        options: ["TOTAL()", "COUNT()", "ROWS()", "NUMBER()"],
        correctAnswer: "COUNT()",
        explanation:
          "COUNT() returns the number of rows or non-null values depending on its expression.",
        points: 1,
      },
      {
        questionId: "sql-q5",
        question: "Which JOIN returns matching rows from both tables?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
        correctAnswer: "INNER JOIN",
        explanation:
          "INNER JOIN returns rows where the join condition matches in both tables.",
        points: 1,
      },
      {
        questionId: "sql-q6",
        question: "Which clause groups rows with the same values?",
        options: ["GROUP BY", "ORDER BY", "MERGE BY", "COMBINE BY"],
        correctAnswer: "GROUP BY",
        explanation:
          "GROUP BY groups rows so aggregate functions can be applied to each group.",
        points: 1,
      },
      {
        questionId: "sql-q7",
        question: "Which command adds a new row?",
        options: ["ADD", "INSERT", "CREATE", "APPEND"],
        correctAnswer: "INSERT",
        explanation: "INSERT INTO is used to add new rows to a table.",
        points: 1,
      },
      {
        questionId: "sql-q8",
        question: "Which command modifies existing records?",
        options: ["CHANGE", "MODIFY", "UPDATE", "ALTER"],
        correctAnswer: "UPDATE",
        explanation: "UPDATE modifies existing rows in a table.",
        points: 1,
      },
      {
        questionId: "sql-q9",
        question: "Which command removes rows from a table?",
        options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
        correctAnswer: "DELETE",
        explanation: "DELETE removes rows from a table.",
        points: 1,
      },
      {
        questionId: "sql-q10",
        question: "Which constraint uniquely identifies each row?",
        options: ["FOREIGN KEY", "PRIMARY KEY", "CHECK", "DEFAULT"],
        correctAnswer: "PRIMARY KEY",
        explanation: "A primary key uniquely identifies each row in a table.",
        points: 1,
      },
    ],
  },

  {
    quizId: "quiz-git-001",
    courseId: "course-git-001",
    courseTitle: "Git & GitHub Workflow",
    quizTitle: "Git & GitHub Quiz",
    description:
      "Evaluate your understanding of Git commands, branches, commits, repositories, and collaborative workflows.",
    duration: 15,
    passingScore: 70,
    totalQuestions: 8,
    difficulty: "Beginner",
    category: "Development Tools",
    status: "available",

    questions: [
      {
        questionId: "git-q1",
        question: "Which command initializes a Git repository?",
        options: ["git start", "git init", "git create", "git repo"],
        correctAnswer: "git init",
        explanation: "git init initializes a new Git repository.",
        points: 1,
      },
      {
        questionId: "git-q2",
        question: "Which command shows the current repository status?",
        options: ["git check", "git status", "git state", "git info"],
        correctAnswer: "git status",
        explanation:
          "git status displays information about staged, unstaged, and untracked files.",
        points: 1,
      },
      {
        questionId: "git-q3",
        question: "Which command creates a commit?",
        options: ["git save", "git commit", "git push", "git snapshot"],
        correctAnswer: "git commit",
        explanation:
          "git commit records staged changes in the repository history.",
        points: 1,
      },
      {
        questionId: "git-q4",
        question: "Which command sends local commits to a remote repository?",
        options: ["git send", "git upload", "git push", "git publish"],
        correctAnswer: "git push",
        explanation: "git push uploads local commits to a remote repository.",
        points: 1,
      },
      {
        questionId: "git-q5",
        question: "Which command creates and switches to a new branch?",
        options: [
          "git branch -new",
          "git checkout -b",
          "git new branch",
          "git switch create",
        ],
        correctAnswer: "git checkout -b",
        explanation: "git checkout -b creates a new branch and switches to it.",
        points: 1,
      },
      {
        questionId: "git-q6",
        question: "What is GitHub primarily used for?",
        options: [
          "Hosting and collaborating on Git repositories",
          "Writing CSS",
          "Running SQL queries",
          "Creating operating systems",
        ],
        correctAnswer: "Hosting and collaborating on Git repositories",
        explanation:
          "GitHub provides hosting and collaboration features for Git repositories.",
        points: 1,
      },
      {
        questionId: "git-q7",
        question:
          "Which command downloads changes from a remote repository and integrates them?",
        options: ["git fetch", "git pull", "git download", "git sync"],
        correctAnswer: "git pull",
        explanation:
          "git pull fetches remote changes and integrates them into the current branch.",
        points: 1,
      },
      {
        questionId: "git-q8",
        question: "What is a branch mainly used for?",
        options: [
          "Developing changes independently",
          "Deleting repositories",
          "Installing Git",
          "Compressing files",
        ],
        correctAnswer: "Developing changes independently",
        explanation:
          "Branches allow developers to work on changes independently from other branches.",
        points: 1,
      },
    ],
  },

  {
    quizId: "quiz-ocean-001",
    courseId: "course-ocean-001",
    courseTitle: "Ocean Science Foundations",
    quizTitle: "Ocean Science Basics Quiz",
    description:
      "Test your foundational knowledge of oceans, marine ecosystems, climate interactions, and ocean observation.",
    duration: 20,
    passingScore: 70,
    totalQuestions: 8,
    difficulty: "Beginner",
    category: "Ocean Science",
    status: "available",

    questions: [
      {
        questionId: "ocean-q1",
        question:
          "Approximately what percentage of Earth's surface is covered by oceans?",
        options: ["51%", "61%", "71%", "81%"],
        correctAnswer: "71%",
        explanation: "Oceans cover approximately 71% of Earth's surface.",
        points: 1,
      },
      {
        questionId: "ocean-q2",
        question: "Which ocean is the largest?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Pacific Ocean",
          "Arctic Ocean",
        ],
        correctAnswer: "Pacific Ocean",
        explanation: "The Pacific Ocean is the largest ocean on Earth.",
        points: 1,
      },
      {
        questionId: "ocean-q3",
        question: "What process transfers heat through ocean water movement?",
        options: ["Convection", "Reflection", "Condensation", "Freezing"],
        correctAnswer: "Convection",
        explanation:
          "Convection involves the movement of heat through fluid due to density differences.",
        points: 1,
      },
      {
        questionId: "ocean-q4",
        question:
          "Which technology is commonly used to observe oceans remotely?",
        options: [
          "Satellite remote sensing",
          "Typewriter",
          "Printer",
          "Barcode scanner",
        ],
        correctAnswer: "Satellite remote sensing",
        explanation:
          "Satellite remote sensing provides large-scale observations of ocean and coastal conditions.",
        points: 1,
      },
      {
        questionId: "ocean-q5",
        question: "What is marine biodiversity?",
        options: [
          "Variety of life in marine environments",
          "Ocean temperature only",
          "Movement of ships",
          "Amount of ocean salt",
        ],
        correctAnswer: "Variety of life in marine environments",
        explanation:
          "Marine biodiversity refers to the variety of organisms and ecosystems found in marine environments.",
        points: 1,
      },
      {
        questionId: "ocean-q6",
        question: "Which factor strongly influences ocean circulation?",
        options: [
          "Temperature and salinity",
          "Moonlight only",
          "Cloud color",
          "Ship speed",
        ],
        correctAnswer: "Temperature and salinity",
        explanation:
          "Temperature and salinity influence seawater density and therefore contribute to ocean circulation.",
        points: 1,
      },
      {
        questionId: "ocean-q7",
        question: "Why are oceans important for climate regulation?",
        options: [
          "They store and redistribute heat",
          "They stop all rainfall",
          "They eliminate atmospheric gases",
          "They prevent sunlight",
        ],
        correctAnswer: "They store and redistribute heat",
        explanation:
          "Oceans absorb, store, and redistribute substantial amounts of heat, influencing climate.",
        points: 1,
      },
      {
        questionId: "ocean-q8",
        question:
          "Which ecosystem is commonly found along tropical coastlines?",
        options: ["Coral reefs", "Tundra", "Taiga", "Desert"],
        correctAnswer: "Coral reefs",
        explanation: "Coral reefs are important tropical marine ecosystems.",
        points: 1,
      },
    ],
  },
];

// ---------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------

export const getQuizzes = () => {
  return quizzes;
};

export const getQuizById = (quizId) => {
  return quizzes.find((quiz) => quiz.quizId === quizId) || null;
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
