// SkillGraph AI - Personalized Learning Roadmap Generator Service
import { SKILL_RESOURCES } from '../data/learningResources.js';
import { SKILL_ONTOLOGY } from '../data/skillOntology.js';

export function generatePersonalizedRoadmap(gapAnalysis, targetRole) {
  if (!gapAnalysis) return [];

  const { criticalMissing = [], secondaryMissing = [], proficiencyGaps = [] } = gapAnalysis;

  // Combine and prioritize skills to learn
  const prioritySkills = [];

  // Critical missing first
  for (const skill of criticalMissing) {
    prioritySkills.push({
      ...skill,
      priority: 'High (Blocker)',
      type: 'critical'
    });
  }

  // Proficiency gaps second
  for (const skill of proficiencyGaps) {
    if (!prioritySkills.some(p => p.id === skill.id)) {
      prioritySkills.push({
        ...skill,
        priority: 'Medium (Deepen Knowledge)',
        type: 'proficiency'
      });
    }
  }

  // Secondary gaps third
  for (const skill of secondaryMissing) {
    if (!prioritySkills.some(p => p.id === skill.id)) {
      prioritySkills.push({
        ...skill,
        priority: 'Low (Bonus Competitive Edge)',
        type: 'secondary'
      });
    }
  }

  // If candidate already has almost everything, add advanced architecture & optimization
  if (prioritySkills.length === 0) {
    prioritySkills.push(
      { id: 'system_design', name: 'System Design & High Availability', priority: 'Advanced', type: 'advanced' },
      { id: 'unit_testing', name: 'Unit & Integration Testing', priority: 'Advanced', type: 'advanced' }
    );
  }

  // Group into structured 4-phase milestone roadmaps
  const phases = [];
  const chunkSize = Math.max(1, Math.ceil(prioritySkills.length / 4));

  const phaseThemes = [
    { name: 'Phase 1: Fundamental Language & Type Foundations', focus: 'Syntax, static typing, and core idioms' },
    { name: 'Phase 2: Frameworks, State & Database Integration', focus: 'Application architecture and persistent storage' },
    { name: 'Phase 3: Containerization & Cloud Infrastructure', focus: 'Docker, microservices, and deployments' },
    { name: 'Phase 4: Capstone Portfolio, Testing & Production CI/CD', focus: 'Integration, test suites, and career readiness' }
  ];

  for (let i = 0; i < 4; i++) {
    const skillsInPhase = prioritySkills.slice(i * chunkSize, (i + 1) * chunkSize);
    if (skillsInPhase.length === 0 && i > 0) continue;

    const theme = phaseThemes[i];
    const modules = [];

    let phaseEstHours = 0;

    for (const skill of skillsInPhase) {
      const resource = SKILL_RESOURCES[skill.id] || generateGenericResource(skill);
      phaseEstHours += resource.estHours || 15;

      modules.push({
        skillId: skill.id,
        skillName: skill.name,
        priority: skill.priority,
        estHours: resource.estHours || 15,
        difficulty: resource.difficulty || 'Intermediate',
        overview: resource.overview,
        keyTopics: resource.keyTopics || ['Core Principles', 'Industry Best Practices', 'Hands-on Coding'],
        courses: resource.courses || [
          { title: `${skill.name} Official Documentation & Guides`, provider: 'Official Docs', type: 'Documentation', url: 'https://developer.mozilla.org/' },
          { title: `${skill.name} Crash Course`, provider: 'freeCodeCamp', type: 'Video Tutorial', url: 'https://youtube.com' }
        ],
        capstoneProject: resource.capstoneProject || {
          title: `Production Portfolio Project with ${skill.name}`,
          description: `Build and deploy a functional service demonstrating proficiency in ${skill.name} with clean code and Git history.`,
          deliverables: [
            'Modular architecture with clean separation of concerns',
            'Full documentation with architecture diagrams in README',
            'Passing automated tests and live demo link'
          ]
        },
        completed: false
      });
    }

    phases.push({
      phaseNumber: i + 1,
      title: theme.name,
      focus: theme.focus,
      estWeeks: Math.max(1, Math.ceil(phaseEstHours / 12)),
      totalHours: phaseEstHours,
      modules
    });
  }

  return phases;
}

function generateGenericResource(skill) {
  const ontology = SKILL_ONTOLOGY[skill.id] || {};
  return {
    skillId: skill.id,
    name: ontology.name || skill.name,
    difficulty: ontology.difficulty || 'Intermediate',
    estHours: 16,
    overview: ontology.description || `Master foundational and practical implementations of ${skill.name} for modern engineering roles.`,
    keyTopics: [
      `Core syntax and architecture of ${skill.name}`,
      'Integration with existing full-stack applications',
      'Common pitfalls, debugging strategies, and performance optimizations'
    ],
    courses: [
      { title: `${skill.name} Official Guide & Documentation`, provider: 'Official Source', type: 'Interactive Docs', url: 'https://google.com/search?q=' + encodeURIComponent(skill.name + ' tutorial') },
      { title: `${skill.name} In-Depth Walkthrough`, provider: 'freeCodeCamp / YouTube', type: 'Video Course', url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(skill.name + ' crash course') }
    ],
    capstoneProject: {
      title: `Hands-on ${skill.name} Implementation Milestone`,
      description: `Incorporate ${skill.name} into your core GitHub portfolio with comprehensive documentation and verified unit tests.`,
      deliverables: [
        'Complete working code deployed to cloud or sandbox',
        'README with setup instructions and architecture decisions'
      ]
    }
  };
}

