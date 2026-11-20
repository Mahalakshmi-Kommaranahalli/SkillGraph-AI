// SkillGraph AI - Resume Optimization & Impact Quantification Service

const STRONG_VERBS = ['Architected', 'Engineered', 'Orchestrated', 'Optimized', 'Streamlined', 'Spearheaded', 'Automated', 'Scaled'];

export function optimizeResumeBullet(bulletText) {
  if (!bulletText || typeof bulletText !== 'string') return null;

  const trimmed = bulletText.replace(/^[•\-\*]\s*/, '').trim();

  // Suggest quantified enhancement if bullet lacks numbers
  const hasNumbers = /\d+%|\d+x|\d+\s*(ms|s|users|queries|requests|records)/i.test(trimmed);

  let rewritten = trimmed;
  let suggestion = '';

  // Check if starts with weak verb like "worked on", "helped", "assisted", "responsible for"
  const weakStarters = /^(worked on|helped with|assisted with|responsible for|handled|did|made)\s+/i;
  if (weakStarters.test(trimmed)) {
    const randomStrong = STRONG_VERBS[Math.floor(Math.random() * STRONG_VERBS.length)];
    rewritten = trimmed.replace(weakStarters, `${randomStrong} `);
    suggestion = `Replaced passive phrasing with strong engineering action verb (${randomStrong}).`;
  }

  // Add impact metric template if missing
  if (!hasNumbers) {
    rewritten += ', reducing latency by 32% and enhancing system throughput.';
    suggestion += (suggestion ? ' Also added ' : 'Added ') + 'quantifiable performance metrics to demonstrate business and technical impact.';
  }

  return {
    original: trimmed,
    improved: rewritten,
    actionVerb: rewritten.split(' ')[0],
    hasQuantifiableMetric: true,
    impactNote: suggestion || 'Enhanced with strong technical causality (Action -> Tech Stack -> Measurable Metric).'
  };
}

export function generateResumeOptimizationList(resume) {
  if (!resume) return [];

  const bulletsToOptimize = [];

  // Extract from experience
  if (resume.experience) {
    for (const exp of resume.experience) {
      if (exp.bullets) {
        for (const b of exp.bullets) {
          bulletsToOptimize.push(optimizeResumeBullet(b));
        }
      }
    }
  }

  // Extract from projects if needed
  if (resume.projects && bulletsToOptimize.length < 3) {
    for (const proj of resume.projects) {
      if (proj.highlights) {
        for (const h of proj.highlights) {
          bulletsToOptimize.push(optimizeResumeBullet(h));
        }
      }
    }
  }

  return bulletsToOptimize.slice(0, 4);
}

