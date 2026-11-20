# SkillGraph AI – AI-Powered Career Intelligence and Skill Gap Analysis Platform

> **"SkillGraph AI transforms resumes into actionable career intelligence through AI-powered skill analysis, job matching, and personalized learning roadmaps."**

---

## 🌟 Executive Overview & Problem Statement

In today's rapidly evolving technology industry, engineering students and fresh graduates frequently struggle to identify the gap between their existing technical skills and the skills required by industry job roles. Although students possess academic knowledge, certifications, and project experience, they frequently lack a clear understanding of how well their profiles align with current job requirements.

**SkillGraph AI** solves this challenge by leveraging Artificial Intelligence, Natural Language Processing (NLP), and a 300+ concept skill ontology to analyze resumes and job descriptions, calculate explainable skill-gap reports, visualize relational skill topologies, recommend structured milestone roadmaps, and provide interactive AI-powered mock interview preparation.

---

## 🚀 Key Functional Capabilities

### 1. Automated Resume Intelligence & Entity Extraction
- **Multi-Format Ingestion:** Instant parsing of raw text, pasted documents, and structured candidate resumes.
- **Pre-Loaded Diverse Student Profiles:**
  - **Alex Chen:** Senior B.S. in Computer Science (Frontend/Full-Stack emphasis, missing production Docker/AWS/CI-CD).
  - **Priya Sharma:** M.S. in Data Science & AI Graduate (Strong PyTorch/NLP, missing MLOps/FastAPI/Kubernetes).
  - **Marcus Vance:** Self-Taught Junior Backend Developer (Node.js/MongoDB, missing TypeScript/Testing/System Design).
- **Entity Extraction:** Extracts candidate contact info, LinkedIn/GitHub links, education (degrees, GPA, coursework), work experience & internships, project portfolio, and skills with estimated proficiency levels (Foundational, Intermediate, Advanced) and verification sources.

### 2. Job Description Analyzer & Skill Extraction
- **Preset Industry Roles:** Full-Stack Software Engineer, AI & ML Engineer, Backend & Distributed Systems Engineer, Cloud DevOps & SRE.
- **Custom JD Analyzer:** Paste any external job description to automatically extract mandatory must-have skills (Weight 1.0) and preferred nice-to-have skills (Weight 0.7), seniority level, and industry salary benchmarks.

### 3. Deep Skill Gap & Role Compatibility Matching
- **Multi-Dimensional Compatibility Score:**
  - Technical Skills Match % (Weighted by market importance)
  - Experience Alignment % (Internships & projects)
  - Academic & Coursework Fit %
  - Soft Skills & Agile Readiness %
- **Competency Radar Benchmark:** 6-axis interactive SVG radar chart comparing student capabilities against industry benchmarks (Core Tech, Frameworks, DB & Architecture, Cloud & DevOps, Testing & QA, Soft Skills).
- **Explainable AI Insights:** Detailed rationale explaining the impact of each missing skill on recruiter ATS filters and interview passing rates.

### 4. Interactive SkillGraph Topology Visualizer
- **Relational Network Graph:** Interactive SVG node-edge network graph clustering skills across Frontend, Backend, Databases, Cloud & DevOps, AI/ML, and System Design.
- **Color-Coded Status:**
  - 🟢 **Green (Emerald):** Verified Mastered Skills
  - 🔴 **Red (Rose):** Critical Missing Blocker Skills (Pulsing ring)
  - 🟡 **Yellow (Amber):** Secondary Nice-to-Have Skills
  - 🔵 **Cyan:** Candidate Strengths & Extras
- **Node Inspector:** Click any skill node to view industry demand %, difficulty, recruiter impact, and jump directly to its learning roadmap.

### 5. Personalized Milestone Learning Roadmaps
- **4-Phase Structured Curriculum:**
  - *Phase 1:* Core Language & Type Foundations
  - *Phase 2:* Frameworks, State & Database Integration
  - *Phase 3:* Containerization & Cloud Infrastructure
  - *Phase 4:* Capstone Portfolio, Testing & Production CI/CD
- **Curated Learning Resources:** Direct links to official documentation, freeCodeCamp, MIT OCW, and video courses.
- **Hands-on Capstone Projects:** Project blueprints with acceptance criteria (e.g. multi-container Docker Compose microservices, tRPC type-safe Kanban, Redis rate limiters).
- **Interactive Progress Checklist:** Check off mastered modules to dynamically increase projected career readiness with confetti celebrations!

### 6. AI-Powered Technical & Behavioral Mock Interview Lab
- **Question Bank:** Real-world interview questions across React, TypeScript, SQL B-Tree indexing, Docker multi-stage builds, Redis caching, Machine Learning overfitting, and STAR behavioral scenarios.
- **Voice AI Speech-to-Text:** Speak answers aloud using Web Speech API voice recognition or type responses.
- **Instant AI Scoring & Feedback:**
  - Overall Score (0-100) & Hiring Verdict (Strong Hire, Pass, Needs Improvement)
  - Technical Accuracy % and Concept Completeness %
  - Keyword analysis: detected technical terms vs missed concepts
  - STAR method detection for behavioral questions (Situation, Task, Action, Result)
  - Exemplary Model Answer (L5/Senior Benchmark).

### 7. Executive Career Dashboard & Exportable Dossier
- **Employability Gauge & Percentile Rank:** Dynamic percentile calculation against the entry-level applicant pool.
- **Market Intelligence:** Salary distribution, annual hiring growth rates, top hiring employers (Google, Stripe, Vercel, Meta, OpenAI).
- **AI Resume Bullet Optimizer:** Transforms passive bullet points into high-impact engineering accomplishments with action verbs and quantifiable metrics.
- **Print / PDF Dossier:** Generates an official, print-formatted Career Intelligence Dossier ready for student counseling, career fairs, and mentorship reviews.

---

## 🛠️ Technology Stack

- **Frontend & UI Framework:** React 19, Vite 8, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Algorithms & Services:**
  - `resumeParser.js`: NLP regex & heuristic entity extraction engine
  - `jobAnalyzer.js`: Requirement weighting and keyword classification
  - `matchingEngine.js`: Multi-metric scoring and explainable AI insights generator
  - `roadmapGenerator.js`: Personalized chronological curriculum builder
  - `interviewEvaluator.js`: Technical keyword rubric and STAR framework scoring
  - `resumeOptimizer.js`: Action verb and impact metric transformer
  - `skillOntology.js`: Master graph of 300+ skills with semantic relationships

---

## 💻 Quick Start & Running Locally

### 1. Prerequisites
Ensure **Node.js (v18+)** and **npm** are installed.

### 2. Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
Create the optimized production bundle:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 📂 Project Architecture

```
SkillGraph AI/
├── index.html                  # HTML entry point with Plus Jakarta Sans & Tailwind CDN
├── vite.config.js              # Vite React configuration
├── package.json                # Project dependencies and npm scripts
├── README.md                   # Comprehensive project documentation
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # Main state coordinator & view router
│   ├── index.css               # Design tokens, glassmorphism, animations, print styles
│   ├── data/
│   │   ├── skillOntology.js    # Master ontology of 300+ skills and synonyms
│   │   ├── jobRoles.js         # Industry job specifications and salary benchmarks
│   │   ├── sampleResumes.js    # 3 diverse student resumes (Full-Stack, AI/ML, Self-Taught)
│   │   ├── learningResources.js# Curated tutorials, courses, and capstone project blueprints
│   │   └── interviewQuestions.js# Technical, system design, and STAR interview questions
│   ├── services/
│   │   ├── resumeParser.js     # Extracts skills, education, experience, and projects
│   │   ├── jobAnalyzer.js      # Extracts required vs preferred skills from job descriptions
│   │   ├── matchingEngine.js   # Calculates compatibility, radar metrics, and explainable AI
│   │   ├── roadmapGenerator.js # Generates 4-phase milestone learning roadmaps
│   │   ├── interviewEvaluator.js# Scores mock interview responses with keyword rubrics
│   │   └── resumeOptimizer.js  # Enhances resume bullets with quantifiable metrics
│   └── components/
│       ├── Navbar.jsx          # Header navigation, live candidate & target role badges
│       ├── ResumeExtractor.jsx # Resume upload, profile selector, entity badge inspector
│       ├── JobDescriptionMatcher.jsx # Target role selector, custom JD NLP parser
│       ├── SkillGapAnalysis.jsx# Multi-metric score gauge, SVG radar chart, gap tables
│       ├── SkillGraphVisualizer.jsx # Interactive SVG network topology with node inspector
│       ├── RoadmapView.jsx     # Milestone curriculum, interactive progress tracker, confetti
│       ├── MockInterviewLab.jsx# AI interview simulator with speech recognition & scoring
│       ├── CareerDashboard.jsx # Executive dashboard, market salary trends, resume optimizer
│       └── ExportModal.jsx     # Printable / Downloadable Career Intelligence Dossier
```

---

## 🎓 Verification Checklist

- [x] **Requirement 1:** Automatically extracts skills, education, projects, and experience from resumes.
- [x] **Requirement 2:** Analyzes job descriptions and identifies required technical and soft skills.
- [x] **Requirement 3:** Compares student profiles with job requirements.
- [x] **Requirement 4:** Identifies missing skills and areas requiring improvement (Critical vs Secondary).
- [x] **Requirement 5:** Generates personalized milestone learning roadmaps.
- [x] **Requirement 6:** Provides AI-powered technical and behavioral interview preparation with voice input.
- [x] **Requirement 7:** Presents career readiness insights through an interactive dashboard with PDF export.

