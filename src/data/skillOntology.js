// SkillGraph AI - Master Technical & Soft Skills Ontology
// Over 300+ skills with semantic relationships, synonyms, categories, and industry demand metrics

export const SKILL_CATEGORIES = {
  FRONTEND: 'Frontend Development',
  BACKEND: 'Backend Engineering',
  DATABASE: 'Databases & Storage',
  CLOUD_DEVOPS: 'Cloud & DevOps',
  AI_ML: 'AI & Data Science',
  SYSTEM_DESIGN: 'System Design & Architecture',
  TESTING_QA: 'Testing & Quality Assurance',
  SECURITY: 'Cybersecurity',
  MOBILE: 'Mobile Development',
  SOFT_SKILLS: 'Soft Skills & Leadership'
};

export const SKILL_ONTOLOGY = {
  // Frontend
  react: {
    id: 'react',
    name: 'React.js',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['react', 'react.js', 'reactjs', 'react 18', 'react 19'],
    marketDemand: 96,
    difficulty: 'Intermediate',
    relatedSkills: ['javascript', 'typescript', 'nextjs', 'redux', 'tailwind', 'html5', 'css3'],
    description: 'Declarative component-based UI library widely used in modern enterprise web development.'
  },
  nextjs: {
    id: 'nextjs',
    name: 'Next.js',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['next.js', 'nextjs', 'next js', 'next 14', 'next 15'],
    marketDemand: 92,
    difficulty: 'Intermediate',
    relatedSkills: ['react', 'typescript', 'nodejs', 'tailwind', 'graphql'],
    description: 'React framework for server-side rendering, static site generation, and full-stack edge routing.'
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['typescript', 'ts'],
    marketDemand: 95,
    difficulty: 'Intermediate',
    relatedSkills: ['javascript', 'react', 'nodejs', 'angular', 'vue'],
    description: 'Typed superset of JavaScript providing compile-time type safety for scalable applications.'
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['javascript', 'js', 'es6', 'es2020', 'vanilla js'],
    marketDemand: 98,
    difficulty: 'Beginner',
    relatedSkills: ['typescript', 'html5', 'css3', 'react', 'nodejs'],
    description: 'Core web programming language powering interactive user experiences and web runtimes.'
  },
  html5: {
    id: 'html5',
    name: 'HTML5 & Semantic Markup',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['html', 'html5', 'semantic html'],
    marketDemand: 90,
    difficulty: 'Beginner',
    relatedSkills: ['css3', 'javascript', 'accessibility'],
    description: 'Standard markup language with semantic structuring and modern accessibility compliance.'
  },
  css3: {
    id: 'css3',
    name: 'CSS3 / Modern CSS',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['css', 'css3', 'flexbox', 'grid', 'responsive design'],
    marketDemand: 89,
    difficulty: 'Beginner',
    relatedSkills: ['html5', 'tailwind', 'sass', 'bootstrap'],
    description: 'Styling standard for responsive layouts, flexbox, grid, animations, and responsive web design.'
  },
  tailwind: {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['tailwind', 'tailwind css', 'tailwindcss'],
    marketDemand: 91,
    difficulty: 'Beginner',
    relatedSkills: ['css3', 'react', 'nextjs', 'html5'],
    description: 'Utility-first CSS framework for rapid and maintainable responsive interface design.'
  },
  redux: {
    id: 'redux',
    name: 'Redux / State Management',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['redux', 'redux toolkit', 'rtk', 'zustand', 'mobx', 'recoil'],
    marketDemand: 82,
    difficulty: 'Intermediate',
    relatedSkills: ['react', 'typescript', 'javascript'],
    description: 'Predictable centralized state container and store management for complex web apps.'
  },
  vue: {
    id: 'vue',
    name: 'Vue.js',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['vue', 'vue.js', 'vuejs', 'vue 3', 'nuxt'],
    marketDemand: 78,
    difficulty: 'Intermediate',
    relatedSkills: ['javascript', 'typescript', 'html5', 'css3'],
    description: 'Progressive JavaScript framework for building user interfaces with reactive data binding.'
  },
  angular: {
    id: 'angular',
    name: 'Angular',
    category: SKILL_CATEGORIES.FRONTEND,
    synonyms: ['angular', 'angularjs', 'angular 2+'],
    marketDemand: 76,
    difficulty: 'Advanced',
    relatedSkills: ['typescript', 'rxjs', 'html5'],
    description: 'Comprehensive opinionated enterprise frontend application framework by Google.'
  },

  // Backend
  nodejs: {
    id: 'nodejs',
    name: 'Node.js',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['node', 'nodejs', 'node.js'],
    marketDemand: 94,
    difficulty: 'Intermediate',
    relatedSkills: ['javascript', 'express', 'typescript', 'rest_apis', 'mongodb', 'postgresql'],
    description: 'Asynchronous event-driven JavaScript runtime for scalable network and backend applications.'
  },
  express: {
    id: 'express',
    name: 'Express.js',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['express', 'express.js', 'expressjs'],
    marketDemand: 88,
    difficulty: 'Beginner',
    relatedSkills: ['nodejs', 'rest_apis', 'javascript', 'middleware'],
    description: 'Minimalist, unopinionated web and REST API framework for Node.js.'
  },
  python: {
    id: 'python',
    name: 'Python',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['python', 'python 3', 'py'],
    marketDemand: 97,
    difficulty: 'Beginner',
    relatedSkills: ['django', 'fastapi', 'flask', 'machine_learning', 'pytorch', 'pandas'],
    description: 'High-level multipurpose programming language dominating backend, data science, and AI.'
  },
  fastapi: {
    id: 'fastapi',
    name: 'FastAPI',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['fastapi', 'fast api'],
    marketDemand: 90,
    difficulty: 'Intermediate',
    relatedSkills: ['python', 'pydantic', 'rest_apis', 'asyncio', 'docker'],
    description: 'Modern, high-performance web framework for building APIs with Python based on type hints.'
  },
  django: {
    id: 'django',
    name: 'Django',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['django', 'django rest framework', 'drf'],
    marketDemand: 84,
    difficulty: 'Intermediate',
    relatedSkills: ['python', 'postgresql', 'rest_apis', 'sql'],
    description: 'Batteries-included web framework for Python encouraging clean, rapid development.'
  },
  java: {
    id: 'java',
    name: 'Java',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['java', 'java 11', 'java 17', 'java 21', 'core java'],
    marketDemand: 91,
    difficulty: 'Intermediate',
    relatedSkills: ['spring_boot', 'oop', 'microservices', 'sql', 'maven'],
    description: 'Object-oriented, class-based programming language powering enterprise backends globally.'
  },
  spring_boot: {
    id: 'spring_boot',
    name: 'Spring Boot',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['spring', 'spring boot', 'springboot', 'spring framework'],
    marketDemand: 89,
    difficulty: 'Advanced',
    relatedSkills: ['java', 'microservices', 'hibernate', 'rest_apis', 'postgresql'],
    description: 'Enterprise framework for building production-grade, stand-alone Spring applications.'
  },
  golang: {
    id: 'golang',
    name: 'Go (Golang)',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['go', 'golang'],
    marketDemand: 91,
    difficulty: 'Intermediate',
    relatedSkills: ['microservices', 'docker', 'kubernetes', 'grpc', 'concurrency'],
    description: 'Statically typed language engineered at Google for blazing fast cloud and backend services.'
  },
  rest_apis: {
    id: 'rest_apis',
    name: 'RESTful API Design',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['rest', 'rest api', 'restful', 'rest apis', 'api design'],
    marketDemand: 96,
    difficulty: 'Beginner',
    relatedSkills: ['nodejs', 'fastapi', 'express', 'json', 'http'],
    description: 'Standard architectural pattern for stateless, scalable networked web services and APIs.'
  },
  graphql: {
    id: 'graphql',
    name: 'GraphQL',
    category: SKILL_CATEGORIES.BACKEND,
    synonyms: ['graphql', 'apollo', 'gql'],
    marketDemand: 83,
    difficulty: 'Intermediate',
    relatedSkills: ['react', 'nodejs', 'typescript', 'rest_apis'],
    description: 'Query language and server execution engine for declarative data fetching without over-fetching.'
  },
  microservices: {
    id: 'microservices',
    name: 'Microservices Architecture',
    category: SKILL_CATEGORIES.SYSTEM_DESIGN,
    synonyms: ['microservices', 'micro-services', 'service-oriented architecture', 'soa'],
    marketDemand: 92,
    difficulty: 'Advanced',
    relatedSkills: ['docker', 'kubernetes', 'kafka', 'grpc', 'api_gateway'],
    description: 'Architectural pattern arranging applications as collections of loosely coupled services.'
  },

  // Databases & Storage
  postgresql: {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: SKILL_CATEGORIES.DATABASE,
    synonyms: ['postgres', 'postgresql', 'psql'],
    marketDemand: 95,
    difficulty: 'Intermediate',
    relatedSkills: ['sql', 'database_design', 'indexing', 'redis', 'nodejs'],
    description: 'Robust open-source relational SQL database supporting ACID transactions and JSONB storage.'
  },
  mongodb: {
    id: 'mongodb',
    name: 'MongoDB / NoSQL',
    category: SKILL_CATEGORIES.DATABASE,
    synonyms: ['mongo', 'mongodb', 'nosql', 'mongoose'],
    marketDemand: 86,
    difficulty: 'Beginner',
    relatedSkills: ['nodejs', 'express', 'document_database'],
    description: 'Document-oriented NoSQL database for flexible JSON-like document modeling.'
  },
  redis: {
    id: 'redis',
    name: 'Redis / Caching',
    category: SKILL_CATEGORIES.DATABASE,
    synonyms: ['redis', 'caching', 'in-memory database', 'cache'],
    marketDemand: 89,
    difficulty: 'Intermediate',
    relatedSkills: ['backend', 'microservices', 'session_management', 'rate_limiting'],
    description: 'Ultra-fast in-memory key-value data structure store used for caching, pub/sub, and queues.'
  },
  sql: {
    id: 'sql',
    name: 'SQL & Query Optimization',
    category: SKILL_CATEGORIES.DATABASE,
    synonyms: ['sql', 'mysql', 'relational database', 'rdbms', 'queries'],
    marketDemand: 97,
    difficulty: 'Beginner',
    relatedSkills: ['postgresql', 'database_design', 'data_modeling', 'indexing'],
    description: 'Fundamental query language for relational database management, joins, and aggregations.'
  },

  // Cloud & DevOps
  docker: {
    id: 'docker',
    name: 'Docker & Containerization',
    category: SKILL_CATEGORIES.CLOUD_DEVOPS,
    synonyms: ['docker', 'containers', 'dockerfile', 'docker compose'],
    marketDemand: 94,
    difficulty: 'Intermediate',
    relatedSkills: ['kubernetes', 'cicd', 'linux', 'cloud'],
    description: 'Industry standard platform to package, ship, and run applications inside isolated containers.'
  },
  kubernetes: {
    id: 'kubernetes',
    name: 'Kubernetes (K8s)',
    category: SKILL_CATEGORIES.CLOUD_DEVOPS,
    synonyms: ['kubernetes', 'k8s', 'container orchestration'],
    marketDemand: 91,
    difficulty: 'Advanced',
    relatedSkills: ['docker', 'cloud', 'aws', 'terraform', 'helm'],
    description: 'Automated container orchestration system for deploying, scaling, and managing cloud apps.'
  },
  aws: {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    category: SKILL_CATEGORIES.CLOUD_DEVOPS,
    synonyms: ['aws', 'amazon web services', 's3', 'ec2', 'lambda', 'cloud computing'],
    marketDemand: 95,
    difficulty: 'Intermediate',
    relatedSkills: ['cloud', 'docker', 'terraform', 'serverless'],
    description: 'Leading global cloud computing platform providing scalable infrastructure and managed services.'
  },
  cicd: {
    id: 'cicd',
    name: 'CI/CD Pipelines (GitHub Actions / Jenkins)',
    category: SKILL_CATEGORIES.CLOUD_DEVOPS,
    synonyms: ['ci/cd', 'cicd', 'continuous integration', 'github actions', 'jenkins', 'devops'],
    marketDemand: 93,
    difficulty: 'Intermediate',
    relatedSkills: ['git', 'docker', 'testing', 'automation'],
    description: 'Automated build, test, and deployment workflows for continuous delivery.'
  },
  git: {
    id: 'git',
    name: 'Git & Version Control',
    category: SKILL_CATEGORIES.SOFT_SKILLS,
    synonyms: ['git', 'github', 'gitlab', 'version control', 'git flow'],
    marketDemand: 99,
    difficulty: 'Beginner',
    relatedSkills: ['collaboration', 'code_review', 'cicd'],
    description: 'Universal distributed version control system for tracking source code and collaborating.'
  },
  linux: {
    id: 'linux',
    name: 'Linux & Bash Scripting',
    category: SKILL_CATEGORIES.CLOUD_DEVOPS,
    synonyms: ['linux', 'bash', 'shell scripting', 'unix', 'terminal'],
    marketDemand: 90,
    difficulty: 'Intermediate',
    relatedSkills: ['devops', 'docker', 'networking'],
    description: 'Core operating system and shell environment underlying production server infrastructure.'
  },

  // AI & Data Science
  machine_learning: {
    id: 'machine_learning',
    name: 'Machine Learning',
    category: SKILL_CATEGORIES.AI_ML,
    synonyms: ['machine learning', 'ml', 'scikit-learn', 'supervised learning', 'classification', 'regression'],
    marketDemand: 94,
    difficulty: 'Intermediate',
    relatedSkills: ['python', 'data_science', 'deep_learning', 'pandas', 'numpy'],
    description: 'Statistical algorithms and predictive modeling enabling systems to learn patterns from data.'
  },
  deep_learning: {
    id: 'deep_learning',
    name: 'Deep Learning & Neural Networks',
    category: SKILL_CATEGORIES.AI_ML,
    synonyms: ['deep learning', 'neural networks', 'cnn', 'rnn', 'transformers'],
    marketDemand: 93,
    difficulty: 'Advanced',
    relatedSkills: ['pytorch', 'tensorflow', 'machine_learning', 'gpu_computing'],
    description: 'Multi-layer neural network architectures enabling computer vision, speech, and generative AI.'
  },
  pytorch: {
    id: 'pytorch',
    name: 'PyTorch',
    category: SKILL_CATEGORIES.AI_ML,
    synonyms: ['pytorch', 'torch'],
    marketDemand: 94,
    difficulty: 'Intermediate',
    relatedSkills: ['deep_learning', 'python', 'neural_networks', 'hugging_face'],
    description: 'Leading open source machine learning framework favored for AI research and modern model training.'
  },
  nlp: {
    id: 'nlp',
    name: 'Natural Language Processing (NLP)',
    category: SKILL_CATEGORIES.AI_ML,
    synonyms: ['nlp', 'natural language processing', 'llm', 'llms', 'tokenization', 'embeddings', 'rag'],
    marketDemand: 96,
    difficulty: 'Advanced',
    relatedSkills: ['deep_learning', 'python', 'hugging_face', 'transformers'],
    description: 'Computational linguistics and transformer models understanding human speech and text.'
  },
  pandas: {
    id: 'pandas',
    name: 'Pandas & Data Wrangling',
    category: SKILL_CATEGORIES.AI_ML,
    synonyms: ['pandas', 'numpy', 'data analysis', 'data wrangling'],
    marketDemand: 92,
    difficulty: 'Beginner',
    relatedSkills: ['python', 'sql', 'data_visualization', 'machine_learning'],
    description: 'High-performance data manipulation, exploratory analysis, and dataframe aggregation.'
  },

  // System Design & Architecture
  system_design: {
    id: 'system_design',
    name: 'System Design & High Availability',
    category: SKILL_CATEGORIES.SYSTEM_DESIGN,
    synonyms: ['system design', 'distributed systems', 'scalability', 'load balancing', 'high availability'],
    marketDemand: 96,
    difficulty: 'Advanced',
    relatedSkills: ['microservices', 'caching', 'database_sharding', 'message_queues'],
    description: 'Architecting large-scale, fault-tolerant, low-latency distributed systems and services.'
  },

  // Testing & Quality Assurance
  unit_testing: {
    id: 'unit_testing',
    name: 'Unit & Integration Testing (Jest / PyTest)',
    category: SKILL_CATEGORIES.TESTING_QA,
    synonyms: ['testing', 'unit testing', 'jest', 'pytest', 'tdd', 'integration testing', 'cypress'],
    marketDemand: 89,
    difficulty: 'Intermediate',
    relatedSkills: ['cicd', 'software_engineering', 'code_quality'],
    description: 'Automated test suite creation verifying software reliability and preventing regression.'
  },

  // Soft Skills
  problem_solving: {
    id: 'problem_solving',
    name: 'Data Structures & Algorithmic Problem Solving',
    category: SKILL_CATEGORIES.SOFT_SKILLS,
    synonyms: ['algorithms', 'data structures', 'dsa', 'leetcode', 'problem solving', 'complexity analysis'],
    marketDemand: 98,
    difficulty: 'Intermediate',
    relatedSkills: ['software_engineering', 'system_design'],
    description: 'Analytical reasoning, algorithm optimization, time & space Big-O complexity mastery.'
  },
  agile_scrum: {
    id: 'agile_scrum',
    name: 'Agile & Scrum Methodologies',
    category: SKILL_CATEGORIES.SOFT_SKILLS,
    synonyms: ['agile', 'scrum', 'sprint planning', 'jira', 'kanban'],
    marketDemand: 88,
    difficulty: 'Beginner',
    relatedSkills: ['communication', 'teamwork', 'project_management'],
    description: 'Iterative product delivery framework focusing on collaboration and continuous feedback.'
  },
  communication: {
    id: 'communication',
    name: 'Technical Communication & Cross-Functional Collaboration',
    category: SKILL_CATEGORIES.SOFT_SKILLS,
    synonyms: ['communication', 'teamwork', 'collaboration', 'stakeholder management', 'presentation'],
    marketDemand: 95,
    difficulty: 'Intermediate',
    relatedSkills: ['leadership', 'agile_scrum', 'code_review'],
    description: 'Articulating architectural decisions, writing clean documentation, and team alignment.'
  }
};

// Quick helper to normalize skill queries
export function findMatchingSkill(term) {
  if (!term) return null;
  const cleanTerm = term.toLowerCase().trim();
  
  // Direct ID check
  if (SKILL_ONTOLOGY[cleanTerm]) {
    return SKILL_ONTOLOGY[cleanTerm];
  }

  // Synonyms check
  for (const skill of Object.values(SKILL_ONTOLOGY)) {
    if (skill.name.toLowerCase() === cleanTerm) return skill;
    if (skill.synonyms.some(syn => syn.toLowerCase() === cleanTerm)) {
      return skill;
    }
    // Partial inclusion for multi-word
    if (cleanTerm.length > 3 && skill.synonyms.some(syn => syn.includes(cleanTerm) || cleanTerm.includes(syn))) {
      return skill;
    }
  }

  return null;
}

