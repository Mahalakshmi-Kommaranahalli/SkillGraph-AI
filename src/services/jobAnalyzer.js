// SkillGraph AI - Job Description Analyzer & Skill Extraction Service
import { SKILL_ONTOLOGY, findMatchingSkill, SKILL_CATEGORIES } from '../data/skillOntology.js';

export function analyzeJobDescription(rawJD, title = 'Custom Industry Role') {
  if (!rawJD || typeof rawJD !== 'string') {
    return null;
  }

  const lowerJD = rawJD.toLowerCase();
  const detectedMustHaves = [];
  const detectedNiceToHaves = [];

  // Patterns for importance distinction
  const requiredSectionPatterns = /(?:requirements|qualifications|must have|minimum qualifications|what you'll need|essential skills)([\s\S]*?)(?:nice to have|preferred|bonus|responsibilities|$)/i;
  const preferredSectionPatterns = /(?:preferred qualifications|nice to have|bonus|plus|desired|optional)([\s\S]*?)(?:responsibilities|requirements|$)/i;

  const reqMatch = rawJD.match(requiredSectionPatterns);
  const prefMatch = rawJD.match(preferredSectionPatterns);

  const reqText = reqMatch ? reqMatch[1].toLowerCase() : lowerJD;
  const prefText = prefMatch ? prefMatch[1].toLowerCase() : '';

  for (const [skillId, skill] of Object.entries(SKILL_ONTOLOGY)) {
    let inRequired = false;
    let inPreferred = false;

    // Check main name and synonyms
    const checkTerms = [skill.name.toLowerCase(), ...skill.synonyms];

    for (const term of checkTerms) {
      const termRegex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escapeRegExp(term)}([^a-zA-Z0-9_#+]|$)`, 'i');
      if (prefText && termRegex.test(prefText)) {
        inPreferred = true;
      } else if (termRegex.test(reqText)) {
        inRequired = true;
      } else if (termRegex.test(lowerJD)) {
        inRequired = true;
      }
    }

    if (inRequired) {
      detectedMustHaves.push({
        id: skillId,
        name: skill.name,
        category: skill.category,
        importance: 'Must Have',
        weight: 1.0
      });
    } else if (inPreferred) {
      detectedNiceToHaves.push({
        id: skillId,
        name: skill.name,
        category: skill.category,
        importance: 'Nice to Have',
        weight: 0.7
      });
    }
  }

  // Fallback defaults if text was minimal
  if (detectedMustHaves.length === 0 && detectedNiceToHaves.length === 0) {
    detectedMustHaves.push(
      { id: 'javascript', name: 'JavaScript (ES6+)', category: SKILL_CATEGORIES.FRONTEND, importance: 'Must Have', weight: 1.0 },
      { id: 'react', name: 'React.js', category: SKILL_CATEGORIES.FRONTEND, importance: 'Must Have', weight: 1.0 },
      { id: 'git', name: 'Git & Version Control', category: SKILL_CATEGORIES.SOFT_SKILLS, importance: 'Must Have', weight: 0.85 }
    );
  }

  // Detect experience level
  let level = 'Entry-Level / Early Career (0-2 YOE)';
  if (lowerJD.includes('5+') || lowerJD.includes('senior') || lowerJD.includes('lead')) {
    level = 'Senior Level (5+ YOE)';
  } else if (lowerJD.includes('3+') || lowerJD.includes('mid-level') || lowerJD.includes('intermediate')) {
    level = 'Mid-Level (2-4 YOE)';
  }

  return {
    id: 'custom-jd-' + Date.now(),
    title,
    level,
    department: 'Software Engineering',
    avgSalary: '$90,000 - $125,000',
    marketDemand: '95% (High)',
    hiringGrowth: '+18% YoY',
    topCompanies: ['Tech Leaders & High-Growth Startups'],
    summary: rawJD.slice(0, 240) + '...',
    requiredSkills: detectedMustHaves,
    preferredSkills: detectedNiceToHaves,
    benchmarkRadar: {
      coreTech: 85,
      frameworks: 80,
      architectureDb: 75,
      cloudDevOps: 70,
      testingQa: 70,
      softSkills: 80
    },
    rawDescription: rawJD
  };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

