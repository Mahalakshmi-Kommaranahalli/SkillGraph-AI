import React from 'react';
import { 
  Sparkles, 
  FileText, 
  Briefcase, 
  GitCompare, 
  Network, 
  Compass, 
  MessageSquareCode, 
  LayoutDashboard, 
  Printer,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  activeResume, 
  activeJob, 
  gapAnalysis, 
  onOpenExport 
}) {
  const tabs = [
    { id: 'resume', label: '1. Resume Intelligence', icon: FileText, badge: `${activeResume.skills.length} Skills` },
    { id: 'job', label: '2. Job Analyzer', icon: Briefcase, badge: activeJob.title.split(' ')[0] },
    { id: 'gap', label: '3. Skill Gap & Match', icon: GitCompare, badge: gapAnalysis ? `${gapAnalysis.overallScore}% Match` : 'Analyze' },
    { id: 'graph', label: '4. SkillGraph', icon: Network, badge: 'Interactive' },
    { id: 'roadmap', label: '5. Learning Roadmap', icon: Compass, badge: gapAnalysis ? `${gapAnalysis.criticalMissing.length} Gaps` : 'Roadmap' },
    { id: 'interview', label: '6. AI Mock Interview', icon: MessageSquareCode, badge: 'AI Prep' },
    { id: 'dashboard', label: '7. Career Dashboard', icon: LayoutDashboard, badge: gapAnalysis ? `Top ${100 - gapAnalysis.percentile}%` : 'Insights' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-all">
      {/* Top Banner Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-900/60 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">AI Career Intelligence Engine Active</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Profile: <strong className="text-indigo-300 font-semibold">{activeResume.name}</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Target Role: <strong className="text-cyan-300 font-semibold">{activeJob.title}</strong></span>
        </div>

        <div className="flex items-center gap-3">
          {gapAnalysis && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <span>Readiness: <strong>{gapAnalysis.overallScore}%</strong> (Rank #{gapAnalysis.percentile}th)</span>
            </div>
          )}
          <button 
            onClick={onOpenExport}
            className="btn btn-sm btn-secondary hover:bg-slate-800 flex items-center gap-1.5 text-xs text-slate-200 border-slate-700"
            title="Export Career Intelligence Dossier PDF"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  SkillGraph<span className="text-indigo-400"> AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Career Intelligence
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal">
                AI Skill Gap Analysis & Personalized Roadmaps
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      isActive 
                        ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/30' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile / Horizontal Tab Strip for smaller screens */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-900">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label.replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

