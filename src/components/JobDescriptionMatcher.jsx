import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  CheckCircle, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Layers, 
  ArrowRight, 
  Cpu, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { JOB_ROLES } from '../data/jobRoles.js';
import { analyzeJobDescription } from '../services/jobAnalyzer.js';

export default function JobDescriptionMatcher({ 
  activeJob, 
  onSelectJob, 
  onJobUpdated, 
  onProceedToGap 
}) {
  const [customText, setCustomText] = useState('');
  const [customRoleTitle, setCustomRoleTitle] = useState('Senior Frontend / Fullstack Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const handleAnalyzeCustom = () => {
    if (!customText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const analyzed = analyzeJobDescription(customText, customRoleTitle);
      if (analyzed) {
        onJobUpdated(analyzed);
        setShowCustomModal(false);
      }
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Presets */}
      <div className="glass-panel p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Briefcase className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Job Description Analyzer & Skill Extractor
                  <span className="badge badge-cyan text-xs">Requirement 2</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Select an industry target role or paste any job description to extract required technical & soft skills.
                </p>
              </div>
            </div>
          </div>

          {/* Role Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Industry Roles:</span>
            {JOB_ROLES.map((role) => {
              const isSelected = activeJob.id === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => onSelectJob(role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  {role.title}
                </button>
              );
            })}

            <button
              onClick={() => setShowCustomModal(!showCustomModal)}
              className="btn btn-sm btn-outline-cyan text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Paste Custom JD</span>
            </button>
          </div>
        </div>

        {/* Custom JD Drawer */}
        {showCustomModal && (
          <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Analyze Any Custom Job Description
              </h3>
              <input
                type="text"
                placeholder="Job Title (e.g. Lead React Developer)"
                value={customRoleTitle}
                onChange={(e) => setCustomRoleTitle(e.target.value)}
                className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1 text-xs text-slate-200 placeholder-slate-500"
              />
            </div>

            <textarea
              rows={6}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste raw Job Description text here (including Responsibilities, Must-Have Requirements, and Nice-to-Haves)..."
              className="w-full rounded-lg bg-slate-950/80 border border-slate-700 p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setCustomText(JOB_ROLES[0].rawDescription)}
                className="btn btn-sm btn-secondary text-xs"
              >
                Load Sample JD
              </button>
              <button
                onClick={handleAnalyzeCustom}
                disabled={isAnalyzing || !customText.trim()}
                className="btn btn-sm btn-primary text-xs"
              >
                {isAnalyzing ? 'Extracting Skills...' : 'Analyze & Extract Skills'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Role Analysis Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Role Overview & Market Trend Card */}
        <div className="space-y-6">
          <div className="glass-panel p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

            <div className="flex items-start justify-between">
              <div>
                <span className="badge badge-cyan text-[11px] mb-2">{activeJob.level}</span>
                <h3 className="text-base font-bold text-white">{activeJob.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeJob.department}</p>
              </div>
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-5 h-5" />
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              {activeJob.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Estimated Salary:
                </span>
                <span className="text-emerald-400 font-mono font-semibold">{activeJob.avgSalary}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  Hiring Trajectory:
                </span>
                <span className="text-cyan-300 font-mono font-semibold">{activeJob.hiringGrowth}</span>
              </div>
            </div>

            {/* Top Companies */}
            {activeJob.topCompanies && (
              <div className="mt-4">
                <span className="text-slate-400 block text-[11px] font-semibold mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  Top Hiring Employers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeJob.topCompanies.map((comp, idx) => (
                    <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action to proceed to gap analysis */}
            <div className="mt-5 pt-3 border-t border-slate-800">
              <button
                onClick={onProceedToGap}
                className="w-full btn btn-primary text-xs flex items-center justify-center gap-2"
              >
                <span>Run Skill Gap & Compatibility Match</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Job Requirements Blueprint */}
          <div className="glass-panel p-5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
              Extraction Breakdown Summary
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-900/50">
                <span className="text-slate-400">Total Mandatory Skills:</span>
                <span className="text-rose-400 font-semibold">{activeJob.requiredSkills.length}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/50">
                <span className="text-slate-400">Preferred / Bonus Skills:</span>
                <span className="text-amber-400 font-semibold">{activeJob.preferredSkills.length}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/50">
                <span className="text-slate-400">Target Industry Demand:</span>
                <span className="text-emerald-400 font-semibold">{activeJob.marketDemand}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right Column: Extracted Required vs Preferred Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mandatory Must-Have Skills */}
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Mandatory Must-Have Skills ({activeJob.requiredSkills.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Critical skills checked during ATS keyword screening and technical interviews.
                </p>
              </div>
              <span className="badge badge-rose text-[10px]">Weight: 1.0</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeJob.requiredSkills.map((req) => (
                <div 
                  key={req.id}
                  className="p-3 rounded-xl bg-slate-900/70 border border-rose-500/20 hover:border-rose-500/40 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{req.name || req.id}</h4>
                      <p className="text-[11px] text-slate-400">{req.category || 'Core Skill'}</p>
                    </div>
                    <span className="badge badge-rose text-[10px]">
                      Mandatory
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Recruiter Impact:</span>
                    <span className="text-rose-400 font-medium">Critical Prerequisite</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred / Nice-to-Have Skills */}
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Preferred / Nice-to-Have Skills ({activeJob.preferredSkills.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Value-add skills that differentiate competitive applicants in round 2+ interviews.
                </p>
              </div>
              <span className="badge badge-amber text-[10px]">Weight: 0.7</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeJob.preferredSkills.map((pref) => (
                <div 
                  key={pref.id}
                  className="p-3 rounded-xl bg-slate-900/70 border border-amber-500/20 hover:border-amber-500/40 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{pref.name || pref.id}</h4>
                      <p className="text-[11px] text-slate-400">{pref.category || 'Preferred'}</p>
                    </div>
                    <span className="badge badge-amber text-[10px]">
                      Nice to Have
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Advantage:</span>
                    <span className="text-amber-400 font-medium">Competitive Edge</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Raw Job Description Text */}
          <div className="glass-panel p-5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Full Job Description Text
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line max-h-64 overflow-y-auto">
              {activeJob.rawDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

