import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Code2, 
  ExternalLink, 
  Sparkles, 
  FolderGit2, 
  TrendingUp,
  Layers,
  Award
} from 'lucide-react';
import { generatePersonalizedRoadmap } from '../services/roadmapGenerator.js';

export default function RoadmapView({ gapAnalysis, activeJob, activeResume }) {
  const initialPhases = generatePersonalizedRoadmap(gapAnalysis, activeJob);
  const [phases, setPhases] = useState(initialPhases);
  const [completedModules, setCompletedModules] = useState(new Set());

  // Calculate total modules and completed progress
  const allModules = phases.flatMap(p => p.modules);
  const totalModulesCount = allModules.length;
  const completedCount = completedModules.size;
  const progressPercent = totalModulesCount > 0 
    ? Math.round((completedCount / totalModulesCount) * 100) 
    : 0;

  // Toggle completion of a module
  const toggleModuleCompletion = (skillId) => {
    setCompletedModules(prev => {
      const next = new Set(prev);
      if (next.has(skillId)) {
        next.delete(skillId);
      } else {
        next.add(skillId);
        // Confetti celebration if high progress or phase complete
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
      return next;
    });
  };

  // Dynamic simulated readiness score boost
  const baseScore = gapAnalysis?.overallScore || 70;
  const boostedScore = Math.min(100, Math.round(baseScore + ((100 - baseScore) * (progressPercent / 100))));

  return (
    <div className="space-y-6">
      {/* Roadmap Header & Progress Gauge */}
      <div className="glass-panel p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Personalized Career Upskilling Roadmap
                </h2>
                <span className="badge badge-indigo text-xs">Requirement 5</span>
              </div>
              <p className="text-xs text-slate-400">
                Custom structured milestone path bridging your {gapAnalysis?.criticalMissing.length || 0} critical skill gaps for{' '}
                <strong className="text-cyan-300 font-semibold">{activeJob.title}</strong>
              </p>
            </div>
          </div>

          {/* Interactive Progress Meter */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-400">Roadmap Progress:</span>
                <span className="text-indigo-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {completedCount} of {totalModulesCount} skills mastered
              </div>
            </div>

            <div className="pl-3 border-l border-slate-800 text-right">
              <span className="text-[10px] text-slate-400 block uppercase">Projected Readiness</span>
              <span className="text-lg font-extrabold text-emerald-400">{boostedScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phases Showcase */}
      <div className="space-y-6">
        {phases.map((phase) => {
          const phaseCompletedCount = phase.modules.filter(m => completedModules.has(m.skillId)).length;
          const isPhaseDone = phaseCompletedCount === phase.modules.length;

          return (
            <div key={phase.phaseNumber} className="glass-panel p-5 relative overflow-hidden space-y-4">
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isPhaseDone 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  }`}>
                    {isPhaseDone ? <CheckCircle2 className="w-4 h-4" /> : `0${phase.phaseNumber}`}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {phase.title}
                      {isPhaseDone && <span className="badge badge-emerald text-[10px]">Phase Mastered!</span>}
                    </h3>
                    <p className="text-xs text-slate-400">{phase.focus}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    ~{phase.totalHours} hrs ({phase.estWeeks} weeks)
                  </span>
                  <span className="text-slate-600">|</span>
                  <span>{phaseCompletedCount}/{phase.modules.length} modules</span>
                </div>
              </div>

              {/* Skills Modules Grid */}
              <div className="space-y-4">
                {phase.modules.map((module) => {
                  const isChecked = completedModules.has(module.skillId);

                  return (
                    <div 
                      key={module.skillId}
                      className={`p-4 rounded-xl border transition-all ${
                        isChecked 
                          ? 'bg-emerald-950/15 border-emerald-500/30' 
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleModuleCompletion(module.skillId)}
                            className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors"
                            title={isChecked ? 'Mark Incomplete' : 'Mark Completed'}
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                            )}
                          </button>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className={`text-sm font-bold ${isChecked ? 'text-emerald-300 line-through' : 'text-white'}`}>
                                {module.skillName}
                              </h4>
                              <span className="badge badge-indigo text-[10px]">{module.difficulty}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                                ~{module.estHours} hrs
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {module.overview}
                            </p>
                          </div>
                        </div>

                        {/* Priority Badge */}
                        <span className={`badge ${
                          module.priority.includes('High') ? 'badge-rose' :
                          module.priority.includes('Medium') ? 'badge-amber' : 'badge-cyan'
                        } text-[10px] self-start`}>
                          {module.priority}
                        </span>
                      </div>

                      {/* Key Topics & Curated Resources */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* Key Topics */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
                            <Layers className="w-3 h-3 text-cyan-400" />
                            Core Concepts to Master
                          </span>
                          <ul className="space-y-1 text-slate-300">
                            {module.keyTopics.map((topic, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">›</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Curated Courses / Tutorials */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-indigo-400" />
                            Verified Curated Learning Resources
                          </span>
                          <ul className="space-y-1.5">
                            {module.courses.map((course, cIdx) => (
                              <li key={cIdx} className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                                <div className="truncate mr-2">
                                  <a 
                                    href={course.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-slate-200 hover:text-cyan-300 font-medium truncate flex items-center gap-1"
                                  >
                                    <span className="truncate">{course.title}</span>
                                    <ExternalLink className="w-3 h-3 shrink-0 text-slate-500" />
                                  </a>
                                  <span className="text-[10px] text-slate-400">{course.provider} • {course.type}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Capstone Project Prompt */}
                      {module.capstoneProject && (
                        <div className="mt-3 p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                              Capstone Project: {module.capstoneProject.title}
                            </span>
                            <span className="text-[10px] text-indigo-400 font-mono">Portfolio Proof</span>
                          </div>
                          <p className="text-slate-300 text-[11px]">
                            {module.capstoneProject.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {module.capstoneProject.deliverables.map((del, dIdx) => (
                              <span key={dIdx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-200 border border-indigo-500/30">
                                ✓ {del}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

