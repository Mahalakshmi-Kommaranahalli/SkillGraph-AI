import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileText 
} from 'lucide-react';

export default function ExportModal({ 
  isOpen, 
  onClose, 
  gapAnalysis, 
  activeResume, 
  activeJob 
}) {
  if (!isOpen || !gapAnalysis) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      candidate: activeResume,
      targetRole: activeJob,
      gapAnalysis
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SkillGraph_AI_Report_${activeResume.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl space-y-6">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Official Career Intelligence Dossier & Skill Gap Report
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="btn btn-sm btn-secondary text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn btn-sm btn-primary text-xs flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Dossier Content */}
        <div className="space-y-6 print:space-y-4 print:text-black print:bg-white p-2">
          {/* Header */}
          <div className="flex justify-between items-start pb-4 border-b border-slate-800 print:border-gray-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-indigo-400 print:text-indigo-600">
                  SkillGraph AI
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 print:border-gray-400 print:text-black">
                  Verified Assessment
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                Automated AI Career Intelligence & Explainable Skill Gap Audit
              </p>
            </div>

            <div className="text-right text-xs text-slate-400 print:text-gray-600">
              <p>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              <p className="font-mono text-indigo-400 print:text-indigo-700">Audit ID: SG-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          {/* Candidate & Role Comparison Bar */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 print:bg-gray-50 print:border-gray-300 text-xs">
            <div>
              <span className="text-slate-400 print:text-gray-500 uppercase tracking-wider block text-[10px] font-bold">
                Student Profile
              </span>
              <h4 className="text-sm font-bold text-white print:text-black mt-0.5">{activeResume.name}</h4>
              <p className="text-slate-300 print:text-gray-700">{activeResume.title}</p>
              <p className="text-slate-400 print:text-gray-600 mt-1">{activeResume.email} • {activeResume.location}</p>
            </div>

            <div>
              <span className="text-slate-400 print:text-gray-500 uppercase tracking-wider block text-[10px] font-bold">
                Target Industry Role
              </span>
              <h4 className="text-sm font-bold text-white print:text-black mt-0.5">{activeJob.title}</h4>
              <p className="text-slate-300 print:text-gray-700">{activeJob.level} ({activeJob.department})</p>
              <p className="text-emerald-400 print:text-emerald-700 font-mono font-medium mt-1">
                Salary Benchmark: {activeJob.avgSalary}
              </p>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-gray-300 print:bg-white">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase">Overall Match</span>
              <span className="text-2xl font-extrabold text-indigo-400 print:text-indigo-600">{gapAnalysis.overallScore}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-gray-300 print:bg-white">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase">Technical Skills</span>
              <span className="text-2xl font-extrabold text-cyan-400 print:text-cyan-700">{gapAnalysis.technicalMatchScore}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-gray-300 print:bg-white">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase">Experience Fit</span>
              <span className="text-2xl font-extrabold text-emerald-400 print:text-emerald-700">{gapAnalysis.experienceScore}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-gray-300 print:bg-white">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase">Applicant Rank</span>
              <span className="text-2xl font-extrabold text-amber-400 print:text-amber-700">#{gapAnalysis.percentile}th</span>
            </div>
          </div>

          {/* Critical Gaps & Recommendations */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white print:text-black flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-400 print:text-rose-600" />
              Critical Missing Skills Identified ({gapAnalysis.criticalMissing.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {gapAnalysis.criticalMissing.map(m => (
                <div key={m.id} className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/30 print:border-gray-300 print:bg-gray-50">
                  <span className="font-bold text-rose-300 print:text-rose-700 block">{m.name}</span>
                  <p className="text-slate-300 print:text-gray-700 text-[11px] mt-0.5">{m.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Matched Skills */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white print:text-black flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
              Verified Competencies ({gapAnalysis.matchedSkills.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {gapAnalysis.matchedSkills.map(s => (
                <span key={s.id} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 print:border-gray-300 print:text-black text-[11px]">
                  ✓ {s.name} ({s.proficiency || 'Verified'})
                </span>
              ))}
            </div>
          </div>

          {/* Verification Footer */}
          <div className="pt-4 border-t border-slate-800 print:border-gray-300 flex justify-between items-center text-[10px] text-slate-500 print:text-gray-500">
            <span>Powered by SkillGraph AI Engine • Artificial Intelligence & Natural Language Processing</span>
            <span>Confidential & Prepared for Student Career Advancement</span>
          </div>
        </div>
      </div>
    </div>
  );
}

