import React from 'react';
import { 
  GitCompare, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Award,
  Layers,
  Info
} from 'lucide-react';

export default function SkillGapAnalysis({ 
  gapAnalysis, 
  activeResume, 
  activeJob, 
  onNavigateToRoadmap, 
  onNavigateToInterview 
}) {
  if (!gapAnalysis) {
    return (
      <div className="glass-panel p-8 text-center text-slate-400">
        Calculating compatibility match...
      </div>
    );
  }

  const {
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
    explainableInsights
  } = gapAnalysis;

  // Render SVG Radar Chart
  const radarDimensions = [
    { key: 'coreTech', label: 'Core Tech' },
    { key: 'frameworks', label: 'Frameworks' },
    { key: 'architectureDb', label: 'DB & Arch' },
    { key: 'cloudDevOps', label: 'Cloud/DevOps' },
    { key: 'testingQa', label: 'Testing & QA' },
    { key: 'softSkills', label: 'Soft Skills' }
  ];

  const radarPointsStudent = getRadarPolygonPoints(studentRadar, radarDimensions, 120, 130, 95);
  const radarPointsBenchmark = getRadarPolygonPoints(benchmarkRadar, radarDimensions, 120, 130, 95);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white shadow-md">
              <GitCompare className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Skill Gap & Role Compatibility Analysis
                </h2>
                <span className="badge badge-emerald text-xs">Requirements 3 & 4</span>
              </div>
              <p className="text-xs text-slate-400">
                Comparing <strong className="text-indigo-300 font-semibold">{activeResume.name}</strong> against{' '}
                <strong className="text-cyan-300 font-semibold">{activeJob.title}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToRoadmap}
              className="btn btn-sm btn-primary text-xs flex items-center gap-1.5"
            >
              <span>Bridge Gaps with Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Readiness Gauge */}
        <div className="glass-panel p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Overall Compatibility
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white">{overallScore}%</span>
                <span className="text-xs text-emerald-400 font-medium font-mono">
                  Rank #{percentile}th
                </span>
              </div>
            </div>
            <div className={`p-2 rounded-lg ${overallScore >= 75 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
              <span>Candidate Match</span>
              <span>Top {100 - percentile}% of Pool</span>
            </div>
          </div>
        </div>

        {/* Technical Match */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Technical Skills Fit
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-cyan-400">{technicalMatchScore}%</span>
                <span className="text-xs text-slate-400">weighted</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            {matchedSkills.length} matched skills out of {activeJob.requiredSkills.length + activeJob.preferredSkills.length} required.
          </p>
        </div>

        {/* Experience Alignment */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Experience Alignment
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-indigo-400">{experienceScore}%</span>
                <span className="text-xs text-slate-400">practical</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Verified across {activeResume.projects.length} portfolio projects and {activeResume.experience.length} work experiences.
          </p>
        </div>

        {/* Critical Gaps Count */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Critical Blockers
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-rose-400">{criticalMissing.length}</span>
                <span className="text-xs text-rose-300 font-medium">Must-Have Gaps</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Missing requirements that must be bridged prior to recruitment rounds.
          </p>
        </div>
      </div>

      {/* Middle Row: Radar Chart Comparison & Explainable AI Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Radar Chart (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Competency Radar vs Role Benchmark
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            6-dimensional comparison of student capabilities against industry requirements.
          </p>

          {/* SVG Radar Visualizer */}
          <div className="relative flex items-center justify-center py-2">
            <svg width="260" height="260" className="overflow-visible">
              {/* Radar Rings (20%, 40%, 60%, 80%, 100%) */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => {
                const r = 95 * level;
                return (
                  <circle
                    key={idx}
                    cx="130"
                    cy="130"
                    r={r}
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray={idx === 4 ? "none" : "3,3"}
                  />
                );
              })}

              {/* Radial Axes */}
              {radarDimensions.map((dim, idx) => {
                const angle = (Math.PI * 2 / radarDimensions.length) * idx - Math.PI / 2;
                const x2 = 130 + 95 * Math.cos(angle);
                const y2 = 130 + 95 * Math.sin(angle);
                const labelX = 130 + 115 * Math.cos(angle);
                const labelY = 130 + 115 * Math.sin(angle);

                return (
                  <g key={dim.key}>
                    <line x1="130" y1="130" x2={x2} y2={y2} stroke="#334155" strokeWidth="1" />
                    <text
                      x={labelX}
                      y={labelY}
                      fill="#94a3b8"
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {dim.label}
                    </text>
                  </g>
                );
              })}

              {/* Benchmark Polygon (Dashed Gray/Cyan) */}
              <polygon
                points={radarPointsBenchmark}
                fill="rgba(6, 182, 212, 0.12)"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              {/* Student Polygon (Indigo Filled) */}
              <polygon
                points={radarPointsStudent}
                fill="rgba(99, 102, 241, 0.35)"
                stroke="#6366f1"
                strokeWidth="2.5"
              />

              {/* Center Dot */}
              <circle cx="130" cy="130" r="3" fill="#6366f1" />
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-500"></span>
              <span className="text-slate-300 font-medium">Candidate Profile</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-cyan-400"></span>
              <span className="text-slate-400">Role Benchmark</span>
            </div>
          </div>
        </div>

        {/* Explainable AI Insights (3 cols) */}
        <div className="lg:col-span-3 glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Explainable AI Skill Gap Intelligence
              </h3>
              <p className="text-xs text-slate-400">
                Transparent rationale detailing why specific gaps affect hiring probability.
              </p>
            </div>
            <span className="badge badge-indigo text-xs">Explainable AI</span>
          </div>

          <div className="space-y-3">
            {explainableInsights.map((insight, idx) => {
              let borderClass = 'border-slate-800';
              let icon = <Info className="w-4 h-4 text-indigo-400" />;

              if (insight.type === 'critical_gap') {
                borderClass = 'border-rose-500/30 bg-rose-950/20';
                icon = <AlertTriangle className="w-4 h-4 text-rose-400" />;
              } else if (insight.type === 'strength') {
                borderClass = 'border-emerald-500/30 bg-emerald-950/20';
                icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
              } else if (insight.type === 'proficiency') {
                borderClass = 'border-amber-500/30 bg-amber-950/20';
                icon = <HelpCircle className="w-4 h-4 text-amber-400" />;
              }

              return (
                <div key={idx} className={`p-3.5 rounded-xl border ${borderClass} space-y-1.5`}>
                  <div className="flex items-center gap-2">
                    {icon}
                    <h4 className="text-xs font-bold text-white">{insight.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {insight.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Categorized Skill Gap Breakdown */}
      <div className="space-y-6">
        {/* Critical Missing Skills (Blockers) */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                Critical Missing Skills ({criticalMissing.length} Blockers)
              </h3>
              <p className="text-xs text-slate-400">
                Mandatory requirements missing from resume. Target these first in your roadmap.
              </p>
            </div>
            <span className="badge badge-rose text-xs">High Impact</span>
          </div>

          {criticalMissing.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {criticalMissing.map((skill) => (
                <div key={skill.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-rose-500/30 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-white">{skill.name}</h4>
                      <p className="text-[11px] text-slate-400">{skill.category}</p>
                    </div>
                    <span className="badge badge-rose text-[10px]">Must-Have</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {skill.reason}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Difficulty: <strong className="text-slate-200">{skill.difficulty}</strong></span>
                    <span className="text-rose-400 font-mono font-medium">{skill.marketDemand}% Market Demand</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Outstanding! Candidate meets 100% of the mandatory required skills for this role.</span>
            </div>
          )}
        </div>

        {/* Secondary Gaps & Matched Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Secondary Missing Skills */}
          <div className="glass-panel p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Secondary Nice-to-Have Gaps ({secondaryMissing.length})
              </h3>
              <span className="badge badge-amber text-xs">Competitive Edge</span>
            </div>

            {secondaryMissing.length > 0 ? (
              <div className="space-y-2.5">
                {secondaryMissing.map((skill) => (
                  <div key={skill.id} className="p-3 rounded-lg bg-slate-900/60 border border-amber-500/20 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">{skill.name}</h4>
                      <p className="text-[11px] text-slate-400">{skill.reason}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 shrink-0">
                      Nice to Have
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No secondary gaps detected.</p>
            )}
          </div>

          {/* Matched Skills */}
          <div className="glass-panel p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Verified Matched Skills ({matchedSkills.length})
              </h3>
              <span className="badge badge-emerald text-xs">Qualified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {matchedSkills.map((skill) => (
                <div key={skill.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-emerald-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{skill.name}</h4>
                    <span className="badge badge-emerald text-[9px]">{skill.proficiency || 'Proficient'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Verified in {skill.verifiedIn || 'Resume'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to compute polygon points for Radar Chart
function getRadarPolygonPoints(data, dimensions, cx, cy, maxRadius) {
  const points = dimensions.map((dim, idx) => {
    const val = data[dim.key] || 50;
    const radius = (val / 100) * maxRadius;
    const angle = (Math.PI * 2 / dimensions.length) * idx - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return points.join(' ');
}

