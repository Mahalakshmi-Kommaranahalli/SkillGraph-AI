// SkillGraph AI - Pre-loaded Student Profile Resumes

export const SAMPLE_RESUMES = [
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    title: 'B.S. in Computer Science (Senior Undergraduate)',
    email: 'alex.chen@university.edu',
    phone: '+1 (555) 234-8901',
    location: 'San Jose, CA',
    linkedin: 'linkedin.com/in/alexchen-dev',
    github: 'github.com/alexchen',
    summary: 'Senior Computer Science student with strong foundations in full-stack web development, algorithmic problem solving, and modern JavaScript frameworks. Experienced building reactive user interfaces in React.js and backend microservices with Node.js. Seeking entry-level software engineering roles.',
    education: [
      {
        institution: 'University of California, Davis',
        degree: 'Bachelor of Science in Computer Science',
        period: '2022 - 2026',
        gpa: '3.82 / 4.00',
        coursework: ['Data Structures & Algorithms', 'Database Systems', 'Operating Systems', 'Web Architectures', 'Computer Networks']
      }
    ],
    experience: [
      {
        role: 'Software Engineering Intern',
        company: 'Veloce Labs',
        period: 'Jun 2025 - Sep 2025',
        location: 'San Francisco, CA',
        bullets: [
          'Engineered responsive web portal components in React.js and Tailwind CSS, reducing page load times by 28%.',
          'Built RESTful API endpoints using Node.js and Express to streamline customer telemetry data ingestion.',
          'Wrote SQL migrations and relational schema queries for PostgreSQL database storing 100K+ event logs.',
          'Collaborated with a cross-functional team of 6 engineers using Git, GitHub PR reviews, and bi-weekly Agile sprints.'
        ],
        skillsUsed: ['react', 'javascript', 'nodejs', 'express', 'postgresql', 'tailwind', 'git', 'agile_scrum']
      }
    ],
    projects: [
      {
        name: 'DevSync – Real-time Collaborative Code Workspace',
        tech: 'React.js, Node.js, WebSockets, MongoDB, Tailwind CSS',
        period: 'Jan 2026 - Mar 2026',
        description: 'Built a real-time collaborative code editor supporting syntax highlighting, multi-user cursor tracking, and instant execution sandboxing.',
        highlights: [
          'Implemented bidirectional WebSocket communication achieving sub-50ms message latency.',
          'Designed intuitive UI with Tailwind CSS and responsive modal dialogs.',
          'Achieved 1,200+ unique user sessions during university showcase.'
        ],
        skillsUsed: ['react', 'javascript', 'nodejs', 'mongodb', 'tailwind', 'git']
      },
      {
        name: 'CampusMarket – University Peer-to-Peer Marketplace',
        tech: 'React, Express.js, PostgreSQL, Stripe API',
        period: 'Sep 2025 - Dec 2025',
        description: 'Full-stack e-commerce web platform for students to buy, sell, and trade textbooks and electronics securely.',
        highlights: [
          'Architected REST API with authentication using JWT tokens and bcrypt password hashing.',
          'Integrated PostgreSQL database with normalized tables and indexed foreign key queries.',
          'Handled payment webhooks through Stripe API test integration.'
        ],
        skillsUsed: ['react', 'nodejs', 'express', 'postgresql', 'rest_apis', 'javascript', 'git']
      }
    ],
    skills: [
      { id: 'react', name: 'React.js', proficiency: 'Advanced', verifiedIn: 'Internship & 2 Projects' },
      { id: 'javascript', name: 'JavaScript (ES6+)', proficiency: 'Advanced', verifiedIn: 'All Projects' },
      { id: 'nodejs', name: 'Node.js', proficiency: 'Intermediate', verifiedIn: 'Internship & Projects' },
      { id: 'express', name: 'Express.js', proficiency: 'Intermediate', verifiedIn: 'Internship & Projects' },
      { id: 'postgresql', name: 'PostgreSQL', proficiency: 'Intermediate', verifiedIn: 'Internship' },
      { id: 'mongodb', name: 'MongoDB / NoSQL', proficiency: 'Intermediate', verifiedIn: 'DevSync Project' },
      { id: 'tailwind', name: 'Tailwind CSS', proficiency: 'Advanced', verifiedIn: 'All Frontend Work' },
      { id: 'html5', name: 'HTML5 & Semantic Markup', proficiency: 'Advanced', verifiedIn: 'Foundational' },
      { id: 'css3', name: 'CSS3 / Modern CSS', proficiency: 'Advanced', verifiedIn: 'Foundational' },
      { id: 'git', name: 'Git & Version Control', proficiency: 'Intermediate', verifiedIn: 'GitHub Workflows' },
      { id: 'rest_apis', name: 'RESTful API Design', proficiency: 'Intermediate', verifiedIn: 'Veloce Labs' },
      { id: 'problem_solving', name: 'Data Structures & Problem Solving', proficiency: 'Intermediate', verifiedIn: 'Coursework & LeetCode (250+ solved)' },
      { id: 'agile_scrum', name: 'Agile & Scrum Methodologies', proficiency: 'Intermediate', verifiedIn: 'Internship Sprints' }
    ],
    certifications: [
      'Meta Front-End Developer Professional Certificate (Coursera)',
      'PostgreSQL for Everybody (University of Michigan Online)'
    ],
    rawText: `Alex Chen
alex.chen@university.edu | +1 (555) 234-8901 | San Jose, CA
linkedin.com/in/alexchen-dev | github.com/alexchen

EDUCATION
University of California, Davis — B.S. in Computer Science (2022 - 2026) | GPA: 3.82
Relevant Coursework: Data Structures & Algorithms, Database Systems, Operating Systems, Web Architectures, Computer Networks

TECHNICAL SKILLS
Languages: JavaScript (ES6+), SQL, Python, C++, HTML5, CSS3
Frameworks & Libraries: React.js, Node.js, Express.js, Tailwind CSS
Databases & Tools: PostgreSQL, MongoDB, Git, GitHub, REST APIs, Postman, Vite

EXPERIENCE
Software Engineering Intern | Veloce Labs (Jun 2025 - Sep 2025)
- Engineered responsive web portal components in React.js and Tailwind CSS, reducing page load times by 28%.
- Built RESTful API endpoints using Node.js and Express to streamline customer telemetry data ingestion.
- Wrote SQL migrations and relational schema queries for PostgreSQL database storing 100K+ event logs.
- Collaborated with a cross-functional team of 6 engineers using Git, GitHub PR reviews, and bi-weekly Agile sprints.

PROJECTS
DevSync – Real-time Collaborative Code Workspace (Jan 2026 - Mar 2026)
- Built real-time collaborative code editor supporting syntax highlighting and multi-user cursor tracking.
- Implemented bidirectional WebSocket communication achieving sub-50ms message latency.
- Tech: React.js, Node.js, WebSockets, MongoDB, Tailwind CSS

CampusMarket – University Peer-to-Peer Marketplace (Sep 2025 - Dec 2025)
- Full-stack e-commerce web platform for students to buy, sell, and trade textbooks.
- Architected REST API with JWT authentication and integrated PostgreSQL database.
- Tech: React, Express.js, PostgreSQL, Stripe API`
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'M.S. in Data Science & AI Graduate',
    email: 'priya.sharma@gatech.edu',
    phone: '+1 (404) 789-3421',
    location: 'Atlanta, GA',
    linkedin: 'linkedin.com/in/priyasharma-ai',
    github: 'github.com/priyasharma-ml',
    summary: 'Master of Science graduate specialized in Machine Learning, Deep Learning, and Natural Language Processing. Proven track record training transformer models in PyTorch, developing statistical pipelines, and optimizing NLP feature extractions. Looking for Machine Learning Engineer or Applied AI roles.',
    education: [
      {
        institution: 'Georgia Institute of Technology',
        degree: 'Master of Science in Computer Science (Machine Learning Specialization)',
        period: '2024 - 2026',
        gpa: '3.91 / 4.00',
        coursework: ['Deep Learning', 'Natural Language Processing', 'Machine Learning Theory', 'Probabilistic Graphical Models']
      }
    ],
    experience: [
      {
        role: 'Graduate AI Research Assistant',
        company: 'Georgia Tech Cognitive AI Lab',
        period: 'Aug 2024 - May 2026',
        location: 'Atlanta, GA',
        bullets: [
          'Fine-tuned RoBERTa and Llama-2 transformer architectures in PyTorch for domain-specific medical text classification, improving F1 score by 14.2%.',
          'Engineered automated data preprocessing pipelines in Python, Pandas, and NumPy for 2M+ research abstracts.',
          'Co-authored paper accepted at NeurIPS workshop on parameter-efficient fine-tuning (LoRA).'
        ],
        skillsUsed: ['python', 'pytorch', 'machine_learning', 'deep_learning', 'nlp', 'pandas', 'git']
      }
    ],
    projects: [
      {
        name: 'MediQuery – Semantic Medical Document Search & QA',
        tech: 'Python, PyTorch, Hugging Face, FAISS, Streamlit',
        period: 'Sep 2025 - Jan 2026',
        description: 'Built a semantic question-answering and retrieval-augmented generation (RAG) platform indexing 50,000 biomedical papers.',
        highlights: [
          'Generated dense vector embeddings using BioBERT and indexed with FAISS for sub-second nearest-neighbor query retrieval.',
          'Evaluated model accuracy against BLEU and ROUGE benchmark metrics.'
        ],
        skillsUsed: ['python', 'pytorch', 'nlp', 'machine_learning', 'pandas']
      }
    ],
    skills: [
      { id: 'python', name: 'Python', proficiency: 'Advanced', verifiedIn: 'Research & Projects' },
      { id: 'pytorch', name: 'PyTorch', proficiency: 'Advanced', verifiedIn: 'NeurIPS Paper & Labs' },
      { id: 'machine_learning', name: 'Machine Learning', proficiency: 'Advanced', verifiedIn: 'Grad Coursework' },
      { id: 'deep_learning', name: 'Deep Learning & Neural Networks', proficiency: 'Advanced', verifiedIn: 'Research Assistant' },
      { id: 'nlp', name: 'Natural Language Processing (NLP)', proficiency: 'Advanced', verifiedIn: 'Thesis & MediQuery' },
      { id: 'pandas', name: 'Pandas & Data Wrangling', proficiency: 'Advanced', verifiedIn: 'Daily Research' },
      { id: 'sql', name: 'SQL & Query Optimization', proficiency: 'Intermediate', verifiedIn: 'Data Warehousing' },
      { id: 'git', name: 'Git & Version Control', proficiency: 'Intermediate', verifiedIn: 'Lab Repositories' },
      { id: 'problem_solving', name: 'Data Structures & Problem Solving', proficiency: 'Intermediate', verifiedIn: 'Undergrad & Competitions' },
      { id: 'communication', name: 'Technical Communication', proficiency: 'Advanced', verifiedIn: 'Workshop Presentations' }
    ],
    certifications: [
      'DeepLearning.AI Deep Learning Specialization (Andrew Ng)',
      'AWS Certified Cloud Practitioner'
    ],
    rawText: `Priya Sharma
priya.sharma@gatech.edu | +1 (404) 789-3421 | Atlanta, GA
linkedin.com/in/priyasharma-ai | github.com/priyasharma-ml

EDUCATION
Georgia Institute of Technology — M.S. in Computer Science (Machine Learning) (2024 - 2026) | GPA: 3.91
Coursework: Deep Learning, Natural Language Processing, Machine Learning Theory

TECHNICAL SKILLS
Languages: Python, SQL, C++, R
ML Frameworks: PyTorch, Hugging Face, Scikit-Learn, TensorFlow, NumPy, Pandas, SciPy
Tools: Git, Jupyter, Streamlit, FAISS, WandB, Linux

EXPERIENCE
Graduate AI Research Assistant | Cognitive AI Lab (Aug 2024 - May 2026)
- Fine-tuned transformer models in PyTorch for domain-specific text classification, improving F1 score by 14.2%.
- Engineered automated data preprocessing pipelines in Python, Pandas, and NumPy for 2M+ records.
- Co-authored paper accepted at NeurIPS workshop.

PROJECTS
MediQuery – Semantic Medical Document Search & QA (Sep 2025 - Jan 2026)
- Built semantic QA and RAG platform indexing 50,000 biomedical papers using BioBERT embeddings.`
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    title: 'Self-Taught Junior Backend Developer',
    email: 'marcus.vance@gmail.com',
    phone: '+1 (312) 555-0198',
    location: 'Chicago, IL',
    linkedin: 'linkedin.com/in/marcus-vance-dev',
    github: 'github.com/mvance-code',
    summary: 'Self-taught and bootcamp-trained web developer passionate about API development and server-side engineering. Built 4 production-ready web services using Node.js, Express, and MongoDB. Fast learner eager to contribute to collaborative engineering teams.',
    education: [
      {
        institution: 'General Assembly Coding Bootcamp',
        degree: 'Software Engineering Immersive Certificate',
        period: '2024 - 2025',
        gpa: 'Graduate with Distinction',
        coursework: ['Full Stack Development', 'Server-Side Web APIs', 'NoSQL Database Modeling', 'Agile Principles']
      }
    ],
    experience: [
      {
        role: 'Freelance Web Developer',
        company: 'Self-Employed',
        period: 'Jan 2025 - Present',
        location: 'Remote',
        bullets: [
          'Developed custom inventory management dashboard for local retail client using Node.js and MongoDB.',
          'Integrated user authentication with JWT and deployed to Render cloud hosting.',
          'Delivered project on time and provided 6 months of bug fixes and client training.'
        ],
        skillsUsed: ['nodejs', 'express', 'mongodb', 'javascript', 'html5', 'css3', 'git']
      }
    ],
    projects: [
      {
        name: 'TaskPulse – Kanban Task Management Service',
        tech: 'Node.js, Express, MongoDB, Vanilla JavaScript, CSS3',
        period: 'Nov 2025 - Jan 2026',
        description: 'Trello-style drag and drop task management service with real-time column updates.',
        highlights: [
          'Engineered RESTful endpoints for boards, lists, and task cards with MongoDB aggregation pipelines.',
          'Implemented drag-and-drop mechanics with native browser HTML5 Drag and Drop API.'
        ],
        skillsUsed: ['nodejs', 'express', 'mongodb', 'javascript', 'html5', 'css3']
      }
    ],
    skills: [
      { id: 'javascript', name: 'JavaScript (ES6+)', proficiency: 'Intermediate', verifiedIn: 'All Projects' },
      { id: 'nodejs', name: 'Node.js', proficiency: 'Intermediate', verifiedIn: 'Projects & Freelance' },
      { id: 'express', name: 'Express.js', proficiency: 'Intermediate', verifiedIn: 'Projects' },
      { id: 'mongodb', name: 'MongoDB / NoSQL', proficiency: 'Intermediate', verifiedIn: 'Freelance' },
      { id: 'html5', name: 'HTML5 & Semantic Markup', proficiency: 'Intermediate', verifiedIn: 'Web Apps' },
      { id: 'css3', name: 'CSS3 / Modern CSS', proficiency: 'Intermediate', verifiedIn: 'Web Apps' },
      { id: 'git', name: 'Git & Version Control', proficiency: 'Beginner', verifiedIn: 'Personal Repos' },
      { id: 'rest_apis', name: 'RESTful API Design', proficiency: 'Beginner', verifiedIn: 'TaskPulse' }
    ],
    certifications: [
      'General Assembly Software Engineering Immersive Certification',
      'The Complete Node.js Developer Course (Udemy)'
    ],
    rawText: `Marcus Vance
marcus.vance@gmail.com | +1 (312) 555-0198 | Chicago, IL
linkedin.com/in/marcus-vance-dev | github.com/mvance-code

EDUCATION
General Assembly — Software Engineering Immersive (2024 - 2025)

TECHNICAL SKILLS
Languages: JavaScript (ES6+), HTML5, CSS3
Backend & DB: Node.js, Express.js, MongoDB, Mongoose, REST APIs
Tools: Git, GitHub, Postman, Render

EXPERIENCE
Freelance Web Developer | Self-Employed (Jan 2025 - Present)
- Developed custom inventory management dashboard for local retail client using Node.js and MongoDB.
- Integrated user authentication with JWT and deployed to Render.

PROJECTS
TaskPulse – Kanban Task Management Service (Nov 2025 - Jan 2026)
- Engineered RESTful endpoints for boards, lists, and cards with MongoDB.`
  }
];

