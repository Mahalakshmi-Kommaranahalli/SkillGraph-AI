import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Award, 
  DollarSign, 
  Building2, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  Copy, 
  Check, 
  ExternalLink,
  Target,
  Compass,
  MessageSquareCode,
  Printer
} from 'lucide-react';
import { generateResumeOptimizationList } from '../services/resumeOptimizer.js';

export default function CareerDashboard({ 
  gapAnalysis, 
  activeResume, 
  activeJob, 
  setActiveTab, 
  onOpenExport 
}) {
  const [copiedIdx, setCopiedIdx] = React.useState(null);

  if (!gapAnalysis) {
    return (
      <div className="glass-panel p-8 text-center text-slate-400">
        Loading career intelligence insights...
      </div>
    );
  }

  const { overallScore, percentile, technicalMatchScore, criticalMissing, secondaryMissing } = gapAnalysis;
  const optimizedBullets = generateResumeOptimizationList(activeResume);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Executive Hero Banner */}
      <div className="glass-panel p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="badge badge-emerald text-xs">AI Career Intelligence Active</span>
              <span className="text-xs text-slate-400">Candidate Evaluation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Career Readiness & Employability Dossier
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Synthesizing <strong className="text-indigo-300">{activeResume.name}</strong>'s skill taxonomy against current industry hiring demands for <strong className="text-cyan-300">{activeJob.title}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenExport}
              className="btn btn-secondary text-xs flex items-center gap-2 shadow-sm"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Export Full Dossier (PDF)</span>
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="btn btn-primary text-xs flex items-center gap-2 shadow-md shadow-indigo-600/30"
            >
              <span>Follow Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Executive Score */}
        <div className="glass-panel p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Employability Readiness
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-white">{overallScore}%</span>
                <span className="text-xs text-emerald-400 font-semibold font-mono">
                  Top {100 - percentile}%
                </span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Award className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            Percentile Rank: <strong className="text-slate-200">#{percentile}th</strong> among applicant pool.
          </div>
        </div>

        {/* Expected Compensation */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Target Salary Range
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-emerald-400">{activeJob.avgSalary.split(' - ')[0]}</span>
                <span className="text-xs text-slate-400">entry</span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            Mid-Level Ceiling: <strong className="text-emerald-300 font-semibold">{activeJob.avgSalary.split(' - ')[1]}</strong>
          </div>
        </div>

        {/* Market Growth */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Hiring Trajectory
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-cyan-400">{activeJob.hiringGrowth}</span>
                <span className="text-xs text-slate-400">annual</span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            Market Demand: <strong className="text-cyan-300 font-semibold">{activeJob.marketDemand}</strong>
          </div>
        </div>

        {/* Unresolved Blockers */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Critical Skill Gaps
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-rose-400">{criticalMissing.length}</span>
                <span className="text-xs text-rose-300 font-medium">To Bridge</span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Target className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            Structured modules generated in <strong className="text-indigo-300">Roadmap</strong>.
          </div>
        </div>
      </div>

      {/* Middle Row: Strategic Action Plan & Quick Navigation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategic Next Steps (1 col) */}
        <div className="glass-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Strategic Action Plan
          </h3>
          <p className="text-xs text-slate-400">
            Follow this chronological sequence to maximize technical interview callbacks:
          </p>

          <ol className="space-y-3 text-xs">
            <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                1
              </span>
              <div>
                <strong className="text-white block font-semibold">Master Critical Gaps</strong>
                <span className="text-slate-400">
                  Focus on {criticalMissing.slice(0, 2).map(m => m.name).join(', ')} to bypass ATS keyword rejection filters.
                </span>
              </div>
            </li>

            <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                2
              </span>
              <div>
                <strong className="text-white block font-semibold">Deploy High-Impact Capstone</strong>
                <span className="text-slate-400">
                  Build and deploy the containerized multi-service project outlined in Phase 3 of your roadmap.
                </span>
              </div>
            </li>

            <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                3
              </span>
              <div>
                <strong className="text-white block font-semibold">Practice Voice AI Interviews</strong>
                <span className="text-slate-400">
                  Drill questions in the Mock Interview Lab using STAR method and technical keywords.
                </span>
              </div>
            </li>
          </ol>
        </div>

        {/* AI Resume Bullet Point Optimizer (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                AI Resume Impact Optimizer
              </h3>
              <p className="text-xs text-slate-400">
                Transform passive bullet points into high-impact engineering accomplishments with metrics.
              </p>
            </div>
            <span className="badge badge-cyan text-xs">Quantified Impact</span>
          </div>

          <div className="space-y-3">
            {optimizedBullets.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Original Bullet:</span>
                  <span className="badge badge-slate text-[9px]">Passive</span>
                </div>
                <p className="text-xs text-slate-400 italic">
                  "{item.original}"
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Quantified Optimization:
                  </span>
                  <button
                    onClick={() => handleCopy(item.improved, idx)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Bullet</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-emerald-500/20">
                  {item.improved}
                </p>
                <span className="text-[10px] text-slate-500 block">
                  💡 {item.impactNote}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => setActiveTab('graph')}
          className="glass-card p-4 cursor-pointer hover:border-indigo-500/50 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <LayoutDashboard className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">Interactive SkillGraph</h4>
              <p className="text-[11px] text-slate-400">Explore relational skill topology</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
        </div>

        <div 
          onClick={() => setActiveTab('roadmap')}
          className="glass-card p-4 cursor-pointer hover:border-cyan-500/50 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">Personalized Roadmap</h4>
              <p className="text-[11px] text-slate-400">4-phase milestone curriculum</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
        </div>

        <div 
          onClick={() => setActiveTab('interview')}
          className="glass-card p-4 cursor-pointer hover:border-purple-500/50 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <MessageSquareCode className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">AI Mock Interview Lab</h4>
              <p className="text-[11px] text-slate-400">Practice questions with live scoring</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
}

