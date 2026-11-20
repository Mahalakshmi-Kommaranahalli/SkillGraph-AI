// SkillGraph AI - Technical & Behavioral Interview Bank with Evaluation Rubrics

export const INTERVIEW_QUESTIONS = [
  {
    id: 'q-react-virtual-dom',
    category: 'Frontend & React',
    difficulty: 'Intermediate',
    targetSkills: ['react', 'javascript'],
    question: 'How does React\'s Virtual DOM and Reconciliation algorithm (Fiber) work, and how does key prop optimization prevent unnecessary re-renders?',
    promptHint: 'Discuss in-memory representation, diffing heuristics, the role of unique keys in lists, and batched updates.',
    keyTerms: ['virtual dom', 'reconciliation', 'fiber', 'diffing', 'key prop', 'render tree', 'batching', 'mutations'],
    idealAnswer: `React maintains a lightweight in-memory representation of the real DOM known as the Virtual DOM. When component state or props change, React constructs a new Virtual DOM tree and executes a diffing algorithm (Reconciliation) to compare it against the previous tree. 
React utilizes key heuristics to keep this comparison O(n) instead of O(n^3):
1. Elements of different types produce entirely different subtrees.
2. The developer provides a stable 'key' prop on list items so React can identify which elements were inserted, removed, or reordered rather than re-rendering every child.
In React 16+, the Fiber architecture broke reconciliation into incremental units of work that can be paused, prioritized, and aborted, enabling smooth concurrent rendering before committing changes to the real DOM in a single batched pass.`
  },
  {
    id: 'q-ts-generics',
    category: 'TypeScript & Type Safety',
    difficulty: 'Intermediate',
    targetSkills: ['typescript'],
    question: 'What are TypeScript Generics, and how do type constraints (extends) allow you to write reusable yet type-safe functions or data structures?',
    promptHint: 'Explain how type parameters act as variables for types and give an example of constraining a parameter to have an id or length property.',
    keyTerms: ['generics', 'type parameter', 'type safety', 'extends', 'constraint', 'reusable', 'inference'],
    idealAnswer: `TypeScript Generics allow developers to create reusable components and functions that work across multiple types while preserving strict compile-time type safety rather than resorting to 'any'. 
Generics act like variables for types (e.g., <T>). Type constraints using the 'extends' keyword restrict what types can be passed to that parameter. For example, function getProperty<T, K extends keyof T>(obj: T, key: K) ensures at compile time that key 'K' truly exists on object 'T', completely preventing runtime undefined access errors and granting accurate IDE autocompletion.`
  },
  {
    id: 'q-sql-indexing',
    category: 'Databases & Performance',
    difficulty: 'Intermediate',
    targetSkills: ['postgresql', 'sql'],
    question: 'How do B-Tree indexes work in relational databases like PostgreSQL, and what are the trade-offs between read acceleration and write overhead?',
    promptHint: 'Explain balanced trees, O(log N) lookup vs full table scans, composite indexes, and index maintenance costs during INSERT/UPDATE.',
    keyTerms: ['b-tree', 'index', 'full table scan', 'lookup', 'write overhead', 'insert', 'update', 'select', 'cardinality'],
    idealAnswer: `A B-Tree (Balanced Tree) index maintains a sorted hierarchical tree of key values and row pointers (TIDs in PostgreSQL). Without an index, querying requires an O(N) sequential full table scan. With a B-Tree index, the database traverses from the root node to the appropriate leaf page in O(log N) time.
Trade-offs:
1. Reads: Greatly accelerated filtering (WHERE), sorting (ORDER BY), and joining.
2. Writes: Every INSERT, UPDATE, and DELETE statement incurs the overhead of updating both the base table and each corresponding index on that table, potentially causing page splits.
3. Storage: Indexes consume additional disk and buffer memory. Best practice is to index high-cardinality columns frequently queried in filters and foreign key joins.`
  },
  {
    id: 'q-docker-multistage',
    category: 'Cloud & DevOps',
    difficulty: 'Intermediate',
    targetSkills: ['docker'],
    question: 'Why are Multi-Stage Docker builds essential for production applications, and how do they improve security and container image size?',
    promptHint: 'Compare single-stage builds that leave build dependencies, compilers, and source files in production images vs copying only build artifacts.',
    keyTerms: ['multi-stage', 'dockerfile', 'image size', 'security', 'build dependencies', 'attack surface', 'layers', 'production'],
    idealAnswer: `Multi-stage Docker builds allow you to use multiple FROM instructions in a single Dockerfile, where each stage represents a discrete environment. 
In stage 1 (the build stage), you include compilers, development dependencies, SDKs, and build tooling (such as Node, npm, TypeScript, or Go compiler) to compile the code.
In stage 2 (the final production stage), you start from a minimal base image (such as Alpine or Distroless) and copy ONLY the compiled binaries or static assets from the builder stage.
Benefits:
1. Drastic image size reduction (often from 1GB+ down to <50MB).
2. Enhanced security by eliminating compilers, package managers, and source code from the final image, drastically reducing the CVE attack surface.`
  },
  {
    id: 'q-system-design-cache',
    category: 'System Design',
    difficulty: 'Advanced',
    targetSkills: ['system_design', 'redis'],
    question: 'Explain the Cache-Aside (Lazy Loading) pattern and how you would prevent Cache Stampede (Thundering Herd) and Cache Penetration in a high-traffic system.',
    promptHint: 'Explain how the application checks the cache first, loads from DB on miss, writes to cache, and how mutex locks or Bloom filters solve edge cases.',
    keyTerms: ['cache-aside', 'redis', 'cache stampede', 'thundering herd', 'cache penetration', 'bloom filter', 'mutex lock', 'ttl'],
    idealAnswer: `In the Cache-Aside pattern, the application checks the cache (e.g., Redis) first. If a cache HIT occurs, it returns the data immediately. If a cache MISS occurs, it queries the primary database, stores the result in cache with a TTL (Time-To-Live), and returns the response.
To handle critical failure modes:
1. Cache Stampede (Thundering Herd): When a hot key expires and thousands of concurrent requests all miss simultaneously and hammer the database. Solution: Use distributed mutex locks (e.g., Redlock) so only one thread queries the DB and repopulates the cache, or utilize probabilistic early expiration (XFetch).
2. Cache Penetration: Requests for non-existent IDs bypass the cache and repeatedly hit the DB. Solution: Use Bloom Filters to quickly reject non-existent keys before querying, or cache NULL results with a short TTL.`
  },
  {
    id: 'q-behavioral-conflict',
    category: 'Behavioral & Culture (STAR Method)',
    difficulty: 'Beginner',
    targetSkills: ['communication', 'agile_scrum'],
    question: 'Tell me about a time you had a technical disagreement with a team member or project partner. How did you handle it and what was the outcome?',
    promptHint: 'Structure your answer using Situation, Task, Action, Result (STAR). Focus on objective criteria, data-driven decisions, and respect.',
    keyTerms: ['situation', 'task', 'action', 'result', 'collaboration', 'data-driven', 'trade-offs', 'compromise', 'outcome'],
    idealAnswer: `In my university capstone project (Situation), our 4-person team had a disagreement regarding database selection: one teammate insisted on MongoDB while I advocated for PostgreSQL (Task). 
Rather than debating opinions, I scheduled a technical review meeting where we defined our application's data requirements: we had relational user accounts, transactions, and strict financial audit records requiring ACID compliance (Action). I benchmarked sample queries and showed how foreign key constraints would prevent orphaned records, while also acknowledging MongoDB's strength in rapid prototyping. We agreed to use PostgreSQL for relational core tables and a JSON column for flexible user settings (Compromise). 
As a result (Result), we encountered zero data integrity anomalies during final testing, finished 2 weeks ahead of schedule, and maintained strong mutual respect throughout the project.`
  },
  {
    id: 'q-ml-overfitting',
    category: 'Machine Learning & AI',
    difficulty: 'Intermediate',
    targetSkills: ['machine_learning', 'pytorch', 'deep_learning'],
    question: 'What is overfitting in machine learning models, and what techniques do you employ to prevent it during model training and evaluation?',
    promptHint: 'Discuss high variance, training vs validation loss curves, regularization (L1/L2), dropout, data augmentation, and early stopping.',
    keyTerms: ['overfitting', 'variance', 'validation loss', 'regularization', 'dropout', 'early stopping', 'cross-validation', 'generalization'],
    idealAnswer: `Overfitting occurs when a model learns the statistical noise and specific details of the training dataset rather than the general underlying distribution, leading to low training error but high validation/test error (high variance).
Techniques to prevent overfitting:
1. Regularization: L1 (Lasso) promotes sparsity; L2 (Ridge/Weight Decay) penalizes large weights.
2. Dropout: Randomly deactivating a fraction of neurons during training in deep neural networks forces redundant representation learning.
3. Early Stopping: Monitoring validation loss and halting training when validation loss stops decreasing.
4. Data Augmentation: Synthetically expanding the training dataset with transformations, crops, and perturbations.
5. Cross-Validation (K-Fold): Ensuring robust performance across different subsets of data.`
  }
];

