// SkillGraph AI - AI Technical & Behavioral Interview Evaluation Service

export function evaluateInterviewResponse(userAnswer, question) {
  if (!userAnswer || userAnswer.trim().length === 0) {
    return {
      score: 0,
      accuracyScore: 0,
      completenessScore: 0,
      feedback: 'Please provide an answer to receive AI evaluation and feedback.',
      detectedTerms: [],
      missingTerms: question.keyTerms || [],
      strengths: [],
      improvements: ['Articulate key concepts clearly using industry-standard terminology.'],
      modelAnswer: question.idealAnswer
    };
  }

  const cleanAnswer = userAnswer.toLowerCase();
  const wordCount = cleanAnswer.split(/\s+/).filter(Boolean).length;
  const keyTerms = question.keyTerms || [];

  const detectedTerms = [];
  const missingTerms = [];

  for (const term of keyTerms) {
    const termLower = term.toLowerCase();
    if (cleanAnswer.includes(termLower)) {
      detectedTerms.push(term);
    } else {
      missingTerms.push(term);
    }
  }

  // 1. Completeness Score (based on term coverage and length)
  const termCoverageRatio = keyTerms.length > 0 ? (detectedTerms.length / keyTerms.length) : 0.8;
  let lengthFactor = Math.min(1.0, wordCount / 50); // reward depth up to 50+ words

  const completenessScore = Math.round(termCoverageRatio * 70 + lengthFactor * 30);

  // 2. Technical Accuracy Score
  let accuracyScore = Math.round(termCoverageRatio * 85 + 15);
  if (wordCount < 15) {
    accuracyScore = Math.min(45, accuracyScore);
  }

  // 3. Behavioral STAR check if category is behavioral
  let isBehavioral = question.category.toLowerCase().includes('behavioral');
  let starDetected = [];
  if (isBehavioral) {
    if (cleanAnswer.includes('situation') || cleanAnswer.includes('when') || cleanAnswer.includes('project')) starDetected.push('Situation');
    if (cleanAnswer.includes('task') || cleanAnswer.includes('needed') || cleanAnswer.includes('goal')) starDetected.push('Task');
    if (cleanAnswer.includes('action') || cleanAnswer.includes('i ') || cleanAnswer.includes('built') || cleanAnswer.includes('solved')) starDetected.push('Action');
    if (cleanAnswer.includes('result') || cleanAnswer.includes('outcome') || cleanAnswer.includes('learned') || cleanAnswer.includes('improved')) starDetected.push('Result');
  }

  // 4. Overall Score
  let overallScore = Math.round(accuracyScore * 0.6 + completenessScore * 0.4);
  if (isBehavioral && starDetected.length >= 3) {
    overallScore = Math.min(100, overallScore + 10);
  }

  // 5. Strengths & Improvements Generation
  const strengths = [];
  const improvements = [];

  if (detectedTerms.length > 0) {
    strengths.push(`Effective use of core technical terminology: ${detectedTerms.slice(0, 3).join(', ')}.`);
  }
  if (wordCount >= 40) {
    strengths.push('Provided solid architectural elaboration rather than brief one-liner answers.');
  }
  if (isBehavioral && starDetected.length >= 3) {
    strengths.push(`Clear narrative structure following STAR framework (${starDetected.join(', ')}).`);
  }

  if (missingTerms.length > 0) {
    improvements.push(`Incorporate high-priority technical concepts: ${missingTerms.slice(0, 3).join(', ')}.`);
  }
  if (wordCount < 30) {
    improvements.push('Expand on architectural trade-offs, edge cases, and performance considerations.');
  }
  if (isBehavioral && starDetected.length < 3) {
    improvements.push('Structure behavioral answers explicitly with the STAR method (Situation, Task, Action, Result) to give interviewers measurable outcomes.');
  }

  let ratingLabel = 'Needs Improvement';
  let badgeColor = 'badge-rose';
  if (overallScore >= 85) {
    ratingLabel = 'Strong Hire / Excellent Answer';
    badgeColor = 'badge-emerald';
  } else if (overallScore >= 70) {
    ratingLabel = 'Good Foundation / Passes Screening';
    badgeColor = 'badge-cyan';
  } else if (overallScore >= 50) {
    ratingLabel = 'Acceptable / Lacks Technical Depth';
    badgeColor = 'badge-amber';
  }

  return {
    score: overallScore,
    accuracyScore,
    completenessScore,
    ratingLabel,
    badgeColor,
    wordCount,
    detectedTerms,
    missingTerms,
    strengths: strengths.length > 0 ? strengths : ['Good initial attempt at the core concept.'],
    improvements: improvements.length > 0 ? improvements : ['Maintain this level of conciseness and technical accuracy in live interviews.'],
    starComponents: isBehavioral ? starDetected : null,
    modelAnswer: question.idealAnswer
  };
}

