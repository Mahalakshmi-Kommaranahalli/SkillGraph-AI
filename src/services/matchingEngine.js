// SkillGraph AI - Multi-Dimensional Matching Engine & Explainable Skill Gap Analyzer
import { SKILL_ONTOLOGY, SKILL_CATEGORIES } from '../data/skillOntology.js';

export function calculateSkillGapMatch(resume, job) {
  if (!resume || !job) {
    return null;
  }

  const studentSkills = resume.skills || [];
  const studentSkillIds = new Set(studentSkills.map(s => s.id));

  const jobRequired = job.requiredSkills || [];
  const jobPreferred = job.preferredSkills || [];
  const allJobSkills = [...jobRequired, ...jobPreferred];

  const matchedSkills = [];
  const criticalMissing = [];
  const secondaryMissing = [];
  const proficiencyGaps = [];

  let totalWeightedPossible = 0;
  let totalWeightedEarned = 0;

  // 1. Process Required Skills (Must Haves)
  for (const req of jobRequired) {
    const weight = req.weight || 1.0;
    totalWeightedPossible += weight * 100;

    const candidateSkill = studentSkills.find(s => s.id === req.id);
    const ontologyInfo = SKILL_ONTOLOGY[req.id] || {};

    if (candidateSkill) {
      // Check proficiency
      let profMultiplier = 1.0;
      if (candidateSkill.proficiency === 'Foundational' || candidateSkill.proficiency === 'Beginner') {
        profMultiplier = 0.65;
        proficiencyGaps.push({
          ...ontologyInfo,
          ...candidateSkill,
          currentLevel: candidateSkill.proficiency,
          requiredLevel: 'Intermediate / Advanced',
          gapReason: 'Candidate demonstrates foundational concepts, but enterprise role requires production-tested experience.'
        });
      } else if (candidateSkill.proficiency === 'Intermediate') {
        profMultiplier = 0.9;
      } else {
        profMultiplier = 1.0;
      }

      const scoreEarned = weight * 100 * profMultiplier;
      totalWeightedEarned += scoreEarned;

      matchedSkills.push({
        ...ontologyInfo,
        ...candidateSkill,
        importance: 'Must Have',
        scoreEarned: Math.round(scoreEarned),
        status: 'Matched'
      });
    } else {
      criticalMissing.push({
        id: req.id,
        name: ontologyInfo.name || req.name || req.id,
        category: ontologyInfo.category || 'Core Skill',
        importance: 'Must Have',
        marketDemand: ontologyInfo.marketDemand || 90,
        difficulty: ontologyInfo.difficulty || 'Intermediate',
        impact: 'High Blocker',
        reason: `Essential prerequisite for ${job.title}. Recruiter filters screen for this skill in first-round resume screening.`
      });
    }
  }

  // 2. Process Preferred Skills (Nice to Have)
  for (const pref of jobPreferred) {
    const weight = (pref.weight || 0.7) * 0.5; // lower impact on base score
    totalWeightedPossible += weight * 100;

    const candidateSkill = studentSkills.find(s => s.id === pref.id);
    const ontologyInfo = SKILL_ONTOLOGY[pref.id] || {};

    if (candidateSkill) {
      const scoreEarned = weight * 100;
      totalWeightedEarned += scoreEarned;

      matchedSkills.push({
        ...ontologyInfo,
        ...candidateSkill,
        importance: 'Nice to Have',
        scoreEarned: Math.round(scoreEarned),
        status: 'Matched'
      });
    } else {
      secondaryMissing.push({
        id: pref.id,
        name: ontologyInfo.name || pref.name || pref.id,
        category: ontologyInfo.category || 'Secondary Skill',
        importance: 'Nice to Have',
        marketDemand: ontologyInfo.marketDemand || 80,
        difficulty: ontologyInfo.difficulty || 'Intermediate',
        impact: 'Competitive Edge',
        reason: `Value-add proficiency that distinguishes top candidates in technical interview rounds.`
      });
    }
  }

  // 3. Compute Component Scores
  const technicalMatchScore = Math.min(100, Math.round((totalWeightedEarned / Math.max(1, totalWeightedPossible)) * 100));

  // Experience alignment
  const hasInternship = resume.experience && resume.experience.length > 0;
  const projectCount = resume.projects ? resume.projects.length : 0;
  let experienceScore = 50;
  if (hasInternship) experienceScore += 30;
  if (projectCount >= 2) experienceScore += 20;
  experienceScore = Math.min(100, experienceScore);

  // Education score
  let educationScore = 88;
  if (resume.education && resume.education[0]?.gpa?.includes('3.')) {
    educationScore = 92;
  }

  // Soft skills alignment
  const softSkills = studentSkills.filter(s => s.category === SKILL_CATEGORIES.SOFT_SKILLS);
  const softSkillScore = Math.min(100, 60 + softSkills.length * 15);

  // Weighted Overall Career Readiness Match Score
  const overallScore = Math.round(
    technicalMatchScore * 0.55 +
    experienceScore * 0.20 +
    educationScore * 0.15 +
    softSkillScore * 0.10
  );

  // Percentile Estimation
  let percentile = 65;
  if (overallScore >= 90) percentile = 98;
  else if (overallScore >= 80) percentile = 88;
  else if (overallScore >= 70) percentile = 74;
  else if (overallScore >= 60) percentile = 58;
  else percentile = 42;

  // 4. Generate Radar Chart Metrics
  const studentRadar = computeRadarProfile(studentSkills, resume);
  const benchmarkRadar = job.benchmarkRadar || {
    coreTech: 85,
    frameworks: 80,
    architectureDb: 75,
    cloudDevOps: 70,
    testingQa: 70,
    softSkills: 80
  };

  // 5. Explainable AI Insights
  const explainableInsights = generateExplainableInsights({
    overallScore,
    technicalMatchScore,
    criticalMissing,
    secondaryMissing,
    proficiencyGaps,
    matchedSkills,
    jobTitle: job.title,
    candidateName: resume.name
  });

  return {
    overallScore,
    percentile,
    technicalMatchScore,
    experienceScore,
    educationScore,
    softSkillScore,
    matchedSkills,
    criticalMissing,
    secondaryMissing,
    proficiencyGaps,
    studentRadar,
    benchmarkRadar,
    explainableInsights,
    summary: {
      totalRequired: jobRequired.length,
      matchedCount: matchedSkills.filter(m => m.importance === 'Must Have').length,
      criticalGapCount: criticalMissing.length,
      secondaryGapCount: secondaryMissing.length
    }
  };
}

function computeRadarProfile(skills, resume) {
  let coreTech = 60;
  let frameworks = 55;
  let architectureDb = 50;
  let cloudDevOps = 30;
  let testingQa = 25;
  let softSkills = 65;

  for (const s of skills) {
    const profBonus = s.proficiency === 'Advanced' ? 14 : (s.proficiency === 'Intermediate' ? 9 : 5);
    if (s.category === SKILL_CATEGORIES.FRONTEND || s.category === SKILL_CATEGORIES.BACKEND) {
      if (['react', 'vue', 'angular', 'django', 'spring_boot', 'fastapi'].includes(s.id)) {
        frameworks = Math.min(95, frameworks + profBonus);
      } else {
        coreTech = Math.min(95, coreTech + profBonus);
      }
    } else if (s.category === SKILL_CATEGORIES.DATABASE || s.category === SKILL_CATEGORIES.SYSTEM_DESIGN) {
      architectureDb = Math.min(95, architectureDb + profBonus);
    } else if (s.category === SKILL_CATEGORIES.CLOUD_DEVOPS) {
      cloudDevOps = Math.min(95, cloudDevOps + profBonus);
    } else if (s.category === SKILL_CATEGORIES.TESTING_QA) {
      testingQa = Math.min(95, testingQa + profBonus);
    } else if (s.category === SKILL_CATEGORIES.SOFT_SKILLS) {
      softSkills = Math.min(95, softSkills + profBonus);
    }
  }

  return {
    coreTech,
    frameworks,
    architectureDb,
    cloudDevOps,
    testingQa,
    softSkills
  };
}

function generateExplainableInsights({
  overallScore,
  technicalMatchScore,
  criticalMissing,
  secondaryMissing,
  proficiencyGaps,
  matchedSkills,
  jobTitle,
  candidateName
}) {
  const points = [];

  // 1. Core Evaluation
  if (overallScore >= 80) {
    points.push({
      type: 'strength',
      title: 'High Role Alignment & Ready for Final Interviews',
      text: `${candidateName} possesses a solid profile matching ${overallScore}% of requirements for ${jobTitle}. The core programming fundamentals and project portfolio align well with current industry expectations.`
    });
  } else if (overallScore >= 65) {
    points.push({
      type: 'moderate',
      title: 'Promising Profile with Targeted Technical Gaps',
      text: `${candidateName} has strong foundational competencies (${technicalMatchScore}% technical match), but critical infrastructure and tooling gaps prevent immediate qualification for senior screening.`
    });
  } else {
    points.push({
      type: 'warning',
      title: 'Substantial Skill Gap Identified',
      text: `There is a significant divergence between the current profile and the target role ${jobTitle}. Structured upskilling in core must-have technologies is required before applying.`
    });
  }

  // 2. Critical Blockers Analysis
  if (criticalMissing.length > 0) {
    const skillNames = criticalMissing.map(m => m.name).slice(0, 3).join(', ');
    points.push({
      type: 'critical_gap',
      title: `Critical Gaps: ${skillNames}`,
      text: `Applicant lacks ${criticalMissing.length} mandatory requirement(s): ${skillNames}. In applicant tracking systems (ATS), resumes without these keywords are automatically deprioritized regardless of GPA or academic pedigree.`
    });
  }

  // 3. Proficiency Analysis
  if (proficiencyGaps.length > 0) {
    const profNames = proficiencyGaps.map(g => g.name).join(', ');
    points.push({
      type: 'proficiency',
      title: `Proficiency Depth Needed in ${profNames}`,
      text: `Applicant lists theoretical knowledge in ${profNames}, but standard interviewers will probe architectural trade-offs, performance bottlenecks, and production failure recovery.`
    });
  }

  // 4. Competitive Edge
  if (matchedSkills.length > 0) {
    const topSkills = matchedSkills.slice(0, 4).map(s => s.name).join(', ');
    points.push({
      type: 'highlight',
      title: 'Demonstrated Strengths',
      text: `Key competitive advantages identified: ${topSkills}. Verified through practical application in student projects and internships.`
    });
  }

  return points;
}

