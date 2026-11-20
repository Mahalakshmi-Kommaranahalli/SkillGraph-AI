// SkillGraph AI - Curated Learning Resources, Project Blueprints, and Milestones

export const SKILL_RESOURCES = {
  typescript: {
    skillId: 'typescript',
    name: 'TypeScript for Production',
    difficulty: 'Intermediate',
    estHours: 25,
    overview: 'Learn static typing, generics, interfaces, union types, and utility types to build error-resilient enterprise applications.',
    keyTopics: ['Static Typing vs Dynamic', 'Interfaces & Custom Types', 'Generics & Type Constraints', 'Utility Types (Partial, Pick, Omit)', 'TypeScript with React & Node'],
    courses: [
      { title: 'TypeScript Official Handbook & Playground', provider: 'TypeScript Team', type: 'Interactive Docs', url: 'https://www.typescriptlang.org/docs/' },
      { title: 'TypeScript Full Course for Beginners', provider: 'freeCodeCamp (YouTube)', type: 'Video Course', url: 'https://www.youtube.com/watch?v=gieEQFIfgYc' },
      { title: 'Total TypeScript Core Essentials', provider: 'Matt Pocock (Free Tutorials)', type: 'Tutorials', url: 'https://www.totaltypescript.com/tutorials' }
    ],
    capstoneProject: {
      title: 'Full-Stack Type-Safe Kanban Platform (tRPC / Next.js / TypeScript)',
      description: 'Build an end-to-end type-safe task dashboard where database types automatically propagate to frontend React components without manually duplicated interfaces.',
      deliverables: [
        'Strict mode enabled with zero "any" types',
        'Custom generic hooks for data fetching',
        'Zod schema validation shared between client and server'
      ]
    }
  },
  docker: {
    skillId: 'docker',
    name: 'Docker & Containerization Mastery',
    difficulty: 'Intermediate',
    estHours: 20,
    overview: 'Package full-stack applications into lightweight, immutable container images for reproducible local development and cloud production.',
    keyTopics: ['Containers vs Virtual Machines', 'Writing Multi-Stage Dockerfiles', 'Docker Compose for Multi-Service Stacks', 'Volume Persistence & Networking', 'Image Size Optimization & Security'],
    courses: [
      { title: 'Docker Official Getting Started Guide', provider: 'Docker Documentation', type: 'Hands-on Guide', url: 'https://docs.docker.com/get-started/' },
      { title: 'Docker & Containerization Crash Course', provider: 'freeCodeCamp', type: 'Video Course', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
      { title: 'DevOps with Docker (University of Helsinki)', provider: 'MOOC.fi', type: 'Academic Course', url: 'https://devopswithdocker.com/' }
    ],
    capstoneProject: {
      title: 'Multi-Container Microservices Architecture with Docker Compose',
      description: 'Containerize a React frontend, Node.js API, PostgreSQL database, and Redis cache in a unified docker-compose file with environment variable configuration and volume persistence.',
      deliverables: [
        'Multi-stage Dockerfile minimizing image under 120MB',
        'Health checks and auto-restart policies configured',
        'Isolated private bridge network between database and API'
      ]
    }
  },
  aws: {
    skillId: 'aws',
    name: 'AWS Cloud Architecture Foundations',
    difficulty: 'Intermediate',
    estHours: 35,
    overview: 'Deploy resilient web architectures utilizing Amazon S3, EC2, Lambda serverless, RDS managed databases, and IAM access policies.',
    keyTopics: ['IAM Roles & Principle of Least Privilege', 'Static Hosting via S3 & CloudFront CDN', 'Compute with EC2 and ECS Fargate', 'Serverless Functions with AWS Lambda', 'Relational Database Service (RDS)'],
    courses: [
      { title: 'AWS Cloud Practitioner Essentials', provider: 'AWS Skill Builder (Free)', type: 'Official Training', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/' },
      { title: 'AWS Certified Cloud Practitioner Full Course', provider: 'freeCodeCamp', type: 'Video Course', url: 'https://www.youtube.com/watch?v=SOTamWNgDKc' }
    ],
    capstoneProject: {
      title: 'Cloud-Native Automated Image Processing Pipeline',
      description: 'Users upload images to an S3 bucket which triggers an AWS Lambda function to resize and watermark the images and log metadata into a database.',
      deliverables: [
        'S3 bucket with CORS configuration and pre-signed upload URLs',
        'Lambda serverless trigger with CloudWatch error alarms',
        'IAM role adhering strictly to least privilege guidelines'
      ]
    }
  },
  redis: {
    skillId: 'redis',
    name: 'Redis In-Memory Caching & Session Store',
    difficulty: 'Intermediate',
    estHours: 15,
    overview: 'Supercharge backend API performance and implement distributed rate limiting, pub/sub messaging, and session persistence using Redis.',
    keyTopics: ['Key-Value Data Types (Strings, Hashes, Sets, Sorted Sets)', 'TTL Expiration & Cache Eviction Policies', 'Cache-Aside vs Write-Through Patterns', 'API Rate Limiting (Token Bucket Algorithm)', 'Pub/Sub Event Streaming'],
    courses: [
      { title: 'Redis University: Redis for Developers', provider: 'Redis.com (Free)', type: 'Interactive Course', url: 'https://university.redis.io/' },
      { title: 'Redis Crash Course with Node.js', provider: 'Web Dev Simplified', type: 'Video Tutorial', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ' }
    ],
    capstoneProject: {
      title: 'High-Performance API Rate Limiter & Response Caching Layer',
      description: 'Implement a Redis middleware for Express/FastAPI that limits requests to 100/minute per IP and caches heavy SQL database query results for 5 minutes.',
      deliverables: [
        'Token bucket rate-limiter middleware returning HTTP 429 status',
        'Cache invalidation strategy on database mutation endpoints',
        'Benchmarked 85% reduction in average query response time'
      ]
    }
  },
  kubernetes: {
    skillId: 'kubernetes',
    name: 'Kubernetes (K8s) Cluster Orchestration',
    difficulty: 'Advanced',
    estHours: 35,
    overview: 'Deploy, scale, auto-heal, and manage containerized microservices across distributed nodes with Kubernetes manifests and Helm.',
    keyTopics: ['Pods, Deployments, and ReplicaSets', 'Services & Ingress Controllers', 'ConfigMaps & Secrets Management', 'Horizontal Pod Autoscalers (HPA)', 'Persistent Volumes (PV/PVC)'],
    courses: [
      { title: 'Kubernetes Documentation Tutorials', provider: 'Kubernetes.io', type: 'Interactive Interactive Docs', url: 'https://kubernetes.io/docs/tutorials/' },
      { title: 'Kubernetes Course for Beginners', provider: 'freeCodeCamp (TechWorld with Nana)', type: 'Video Course', url: 'https://www.youtube.com/watch?v=X48VuDVv0do' }
    ],
    capstoneProject: {
      title: 'Resilient Microservices Deployment with Zero-Downtime Rolling Updates',
      description: 'Deploy a multi-tier web application into Minikube or cloud Kubernetes with ingress routing, liveness/readiness probes, and rolling updates.',
      deliverables: [
        'Declarative YAML manifests for Deployment, Service, and Ingress',
        'Configured readiness and liveness health checks',
        'Simulated rolling update deployment with zero dropped HTTP requests'
      ]
    }
  },
  unit_testing: {
    skillId: 'unit_testing',
    name: 'Unit & Integration Testing (Jest / React Testing Library)',
    difficulty: 'Intermediate',
    estHours: 18,
    overview: 'Master Test-Driven Development (TDD), mock network requests, test React components, and achieve high test coverage.',
    keyTopics: ['AAA Pattern (Arrange, Act, Assert)', 'Mocking Functions, Modules, and HTTP APIs', 'Testing React Hooks and User Interactions', 'Integration Testing with Supertest', 'Code Coverage Reports'],
    courses: [
      { title: 'Testing JavaScript Applications', provider: 'Kent C. Dodds', type: 'Guide', url: 'https://kentcdodds.com/blog/common-mistakes-with-react-testing-library' },
      { title: 'Jest Crash Course', provider: 'Traversy Media', type: 'Video Tutorial', url: 'https://www.youtube.com/watch?v=7r4xVDI2vho' }
    ],
    capstoneProject: {
      title: 'Robust Test Suite with 85%+ Coverage for an E-Commerce Cart',
      description: 'Write comprehensive unit and integration tests for a checkout flow, shopping cart state, discounts calculation, and payment API mocks.',
      deliverables: [
        'Unit tests for pure business logic and discount edge cases',
        'Integration tests asserting DOM updates on button clicks',
        'CI pipeline badge verifying passing tests on every Git push'
      ]
    }
  },
  system_design: {
    skillId: 'system_design',
    name: 'System Design & High-Scalability Engineering',
    difficulty: 'Advanced',
    estHours: 30,
    overview: 'Learn how modern tech giants design architectures serving millions of concurrent users with high availability and low latency.',
    keyTopics: ['Load Balancers & Reverse Proxies', 'Horizontal vs Vertical Scaling', 'Database Sharding & Replication', 'CAP Theorem & Eventual Consistency', 'Message Queues (Kafka / RabbitMQ)'],
    courses: [
      { title: 'System Design Primer', provider: 'Donne Martin (GitHub 250k+ stars)', type: 'Open-Source Guide', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'Grokking System Design Principles', provider: 'ByteByteGo (Alex Xu)', type: 'Visual Guide', url: 'https://bytebytego.com/' }
    ],
    capstoneProject: {
      title: 'Architectural Blueprint: Design a URL Shortener (Bitly) or Twitter Feed',
      description: 'Document an end-to-end system design specification addressing throughput (10K write QPS / 100K read QPS), data modeling, caching, and failover.',
      deliverables: [
        'Calculated storage capacity and network bandwidth estimates for 5 years',
        'Architecture diagram depicting load balancers, cache layers, and DB shards',
        'Detailed explanation of hashing algorithm and collision resolution'
      ]
    }
  },
  cicd: {
    skillId: 'cicd',
    name: 'CI/CD Automation with GitHub Actions',
    difficulty: 'Intermediate',
    estHours: 14,
    overview: 'Automate linting, unit tests, security vulnerability scans, and continuous deployment triggers using YAML workflow syntax.',
    keyTopics: ['Workflow Triggers (push, pull_request)', 'GitHub Runners and Environments', 'Managing Encrypted Secrets & Credentials', 'Automated Semantic Versioning & Release Tagging', 'Deployment to Cloud Platforms'],
    courses: [
      { title: 'GitHub Actions Official Quickstart', provider: 'GitHub Docs', type: 'Tutorial', url: 'https://docs.github.com/en/actions/quickstart' }
    ],
    capstoneProject: {
      title: 'Automated CI/CD Pipeline for Pull Request Validation & Cloud Deploy',
      description: 'Create a GitHub Actions workflow that executes ESLint, runs automated Jest tests, builds Docker containers, and deploys to production upon merge.',
      deliverables: [
        'Passing branch protection rule requiring all test workflows to succeed',
        'Multi-stage workflow with build caching to decrease run times by 50%'
      ]
    }
  }
};

