// SkillGraph AI - Standard Industry Job Roles & Descriptions

export const JOB_ROLES = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Software Engineer',
    level: 'Entry-Level / Early Career (0-2 YOE)',
    department: 'Engineering',
    avgSalary: '$92,000 - $125,000',
    marketDemand: '97% (Extremely High)',
    hiringGrowth: '+18% YoY',
    topCompanies: ['Google', 'Meta', 'Stripe', 'Vercel', 'Airbnb', 'Amazon'],
    summary: 'Design, develop, and deploy scalable end-to-end web applications with modern frontend frameworks, performant backend REST APIs, secure database modeling, and automated cloud deployments.',
    requiredSkills: [
      { id: 'react', importance: 'Must Have', weight: 1.0 },
      { id: 'typescript', importance: 'Must Have', weight: 1.0 },
      { id: 'javascript', importance: 'Must Have', weight: 0.95 },
      { id: 'nodejs', importance: 'Must Have', weight: 1.0 },
      { id: 'postgresql', importance: 'Must Have', weight: 0.9 },
      { id: 'rest_apis', importance: 'Must Have', weight: 0.9 },
      { id: 'git', importance: 'Must Have', weight: 0.85 },
      { id: 'problem_solving', importance: 'Must Have', weight: 0.95 }
    ],
    preferredSkills: [
      { id: 'nextjs', importance: 'Nice to Have', weight: 0.7 },
      { id: 'docker', importance: 'Nice to Have', weight: 0.8 },
      { id: 'redis', importance: 'Nice to Have', weight: 0.65 },
      { id: 'aws', importance: 'Nice to Have', weight: 0.75 },
      { id: 'unit_testing', importance: 'Nice to Have', weight: 0.7 },
      { id: 'tailwind', importance: 'Nice to Have', weight: 0.6 },
      { id: 'cicd', importance: 'Nice to Have', weight: 0.65 }
    ],
    benchmarkRadar: {
      coreTech: 88,
      frameworks: 85,
      architectureDb: 80,
      cloudDevOps: 72,
      testingQa: 70,
      softSkills: 85
    },
    rawDescription: `Role: Full-Stack Software Engineer (Early Career / Graduate)
Location: Remote / Hybrid
We are seeking an enthusiastic Full-Stack Software Engineer to build intuitive, mission-critical web applications.

Responsibilities:
- Build responsive, accessible, high-performance web frontends utilizing React.js, TypeScript, and modern CSS frameworks (Tailwind).
- Architect clean, secure RESTful APIs and backend microservices with Node.js and Express/FastAPI.
- Model relational data schemas and write performant queries in PostgreSQL.
- Implement automated testing with Jest/React Testing Library and participate in CI/CD pipeline deployments.
- Containerize application environments using Docker.
- Collaborate with product designers and engineering leads in an Agile/Scrum environment.

Requirements:
- Bachelor's or Master's in Computer Science, Software Engineering, or equivalent practical experience.
- Strong proficiency in JavaScript/TypeScript, React.js, and Node.js.
- Solid understanding of SQL databases, relational schema normalization, and index optimization.
- Familiarity with Git, GitHub version control, and code review standards.
- Knowledge of containerization (Docker) and cloud services (AWS S3, EC2) is a strong plus.`
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI & Machine Learning Engineer',
    level: 'Associate / Entry-Level (0-2 YOE)',
    department: 'AI & Data Intelligence',
    avgSalary: '$105,000 - $142,000',
    marketDemand: '99% (Hyper Growth)',
    hiringGrowth: '+34% YoY',
    topCompanies: ['OpenAI', 'Google DeepMind', 'NVIDIA', 'Anthropic', 'Microsoft', 'Databricks'],
    summary: 'Develop, evaluate, fine-tune, and deploy machine learning and deep learning models, natural language processing pipelines, and generative AI systems to production.',
    requiredSkills: [
      { id: 'python', importance: 'Must Have', weight: 1.0 },
      { id: 'pytorch', importance: 'Must Have', weight: 1.0 },
      { id: 'machine_learning', importance: 'Must Have', weight: 1.0 },
      { id: 'deep_learning', importance: 'Must Have', weight: 0.95 },
      { id: 'pandas', importance: 'Must Have', weight: 0.9 },
      { id: 'sql', importance: 'Must Have', weight: 0.85 },
      { id: 'nlp', importance: 'Must Have', weight: 0.9 },
      { id: 'problem_solving', importance: 'Must Have', weight: 0.95 }
    ],
    preferredSkills: [
      { id: 'fastapi', importance: 'Nice to Have', weight: 0.8 },
      { id: 'docker', importance: 'Nice to Have', weight: 0.85 },
      { id: 'aws', importance: 'Nice to Have', weight: 0.75 },
      { id: 'git', importance: 'Nice to Have', weight: 0.8 },
      { id: 'unit_testing', importance: 'Nice to Have', weight: 0.65 }
    ],
    benchmarkRadar: {
      coreTech: 95,
      frameworks: 90,
      architectureDb: 78,
      cloudDevOps: 68,
      testingQa: 72,
      softSkills: 82
    },
    rawDescription: `Role: Associate AI & Machine Learning Engineer
Department: Applied AI Labs

Responsibilities:
- Build and fine-tune state-of-the-art Deep Learning and Natural Language Processing (NLP) models using PyTorch and Hugging Face.
- Preprocess unstructured textual data, engineer embeddings, and implement Retrieval-Augmented Generation (RAG) architectures.
- Package inference models into low-latency REST endpoints using Python and FastAPI.
- Deploy and monitor model pipelines inside Docker containers on cloud infrastructure (AWS/GCP).
- Conduct rigorous statistical evaluations, bias detection, and cross-validation.

Requirements:
- Degree in Computer Science, Data Science, Mathematics, or related quantitative field.
- Deep hands-on experience with Python, PyTorch, Pandas, NumPy, and Scikit-Learn.
- Demonstrated projects in NLP, Large Language Models, or Computer Vision.
- Knowledge of relational databases (SQL/PostgreSQL) and API development.`
  },
  {
    id: 'backend-systems-dev',
    title: 'Backend & Distributed Systems Engineer',
    level: 'Junior / Mid-Level (1-3 YOE)',
    department: 'Core Infrastructure',
    avgSalary: '$98,000 - $135,000',
    marketDemand: '95% (High)',
    hiringGrowth: '+16% YoY',
    topCompanies: ['Uber', 'Netflix', 'DoorDash', 'Stripe', 'Salesforce', 'Bloomberg'],
    summary: 'Architect highly scalable, low-latency microservices, fault-tolerant distributed systems, transactional database engines, and asynchronous message queues.',
    requiredSkills: [
      { id: 'golang', importance: 'Must Have', weight: 0.95 },
      { id: 'nodejs', importance: 'Must Have', weight: 0.9 },
      { id: 'postgresql', importance: 'Must Have', weight: 1.0 },
      { id: 'redis', importance: 'Must Have', weight: 0.9 },
      { id: 'microservices', importance: 'Must Have', weight: 0.95 },
      { id: 'system_design', importance: 'Must Have', weight: 0.95 },
      { id: 'rest_apis', importance: 'Must Have', weight: 0.9 },
      { id: 'docker', importance: 'Must Have', weight: 0.85 }
    ],
    preferredSkills: [
      { id: 'kubernetes', importance: 'Nice to Have', weight: 0.8 },
      { id: 'aws', importance: 'Nice to Have', weight: 0.8 },
      { id: 'unit_testing', importance: 'Nice to Have', weight: 0.75 },
      { id: 'linux', importance: 'Nice to Have', weight: 0.75 }
    ],
    benchmarkRadar: {
      coreTech: 92,
      frameworks: 82,
      architectureDb: 95,
      cloudDevOps: 82,
      testingQa: 80,
      softSkills: 80
    },
    rawDescription: `Role: Backend & Distributed Systems Engineer
Responsibilities:
- Engineer high-throughput microservices capable of processing tens of thousands of requests per second.
- Design database schemas, query indexes, and distributed caching strategies with PostgreSQL and Redis.
- Optimize system latency, concurrency, and inter-service communication (gRPC, REST, Kafka).
- Build automated unit, integration, and load tests to safeguard high availability.
- Collaborate with SRE teams to deploy containerized services into Kubernetes clusters.`
  },
  {
    id: 'cloud-devops-engineer',
    title: 'Cloud DevOps & Infrastructure Engineer',
    level: 'Entry to Associate (0-2 YOE)',
    department: 'Cloud Platform',
    avgSalary: '$95,000 - $130,000',
    marketDemand: '96% (High)',
    hiringGrowth: '+22% YoY',
    topCompanies: ['AWS', 'Microsoft Azure', 'Cloudflare', 'HashiCorp', 'Red Hat', 'Datadog'],
    summary: 'Automate cloud provisioning, manage containerized deployments, architect CI/CD release pipelines, and enforce zero-downtime infrastructure reliability.',
    requiredSkills: [
      { id: 'docker', importance: 'Must Have', weight: 1.0 },
      { id: 'kubernetes', importance: 'Must Have', weight: 0.95 },
      { id: 'aws', importance: 'Must Have', weight: 1.0 },
      { id: 'cicd', importance: 'Must Have', weight: 0.95 },
      { id: 'linux', importance: 'Must Have', weight: 0.9 },
      { id: 'git', importance: 'Must Have', weight: 0.9 }
    ],
    preferredSkills: [
      { id: 'python', importance: 'Nice to Have', weight: 0.8 },
      { id: 'golang', importance: 'Nice to Have', weight: 0.7 },
      { id: 'system_design', importance: 'Nice to Have', weight: 0.8 },
      { id: 'postgresql', importance: 'Nice to Have', weight: 0.65 }
    ],
    benchmarkRadar: {
      coreTech: 85,
      frameworks: 70,
      architectureDb: 80,
      cloudDevOps: 98,
      testingQa: 82,
      softSkills: 84
    },
    rawDescription: `Role: Cloud DevOps & Site Reliability Engineer
Responsibilities:
- Build and maintain infrastructure as code across multi-region AWS environments.
- Manage production Kubernetes clusters, Helm charts, and container orchestration.
- Build continuous integration and deployment pipelines using GitHub Actions.
- Implement comprehensive monitoring, alerting, and log aggregations.
- Write robust shell and Python scripts for systems administration.`
  }
];

