import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  User, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Code2, 
  Copy, 
  RefreshCw 
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes.js';
import { parseResumeText } from '../services/resumeParser.js';

export default function ResumeExtractor({ activeResume, onSelectResume, onResumeUpdated }) {
  const [isUploading, setIsUploading] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [isPasting, setIsPasting] = useState(false);
  const [viewMode, setViewMode] = useState('structured'); // 'structured' or 'raw'
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const parsed = parseResumeText(text);
        if (parsed) {
          onResumeUpdated(parsed);
        }
      }
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert('Error reading uploaded file. Please try pasting raw text instead.');
      setIsUploading(false);
    };

    reader.readAsText(file);
  };

  const handleParsePastedText = () => {
    if (!pasteText.trim()) return;
    setIsUploading(true);
    setTimeout(() => {
      const parsed = parseResumeText(pasteText);
      if (parsed) {
        onResumeUpdated(parsed);
        setIsPasting(false);
      }
      setIsUploading(false);
    }, 400);
  };

  // Group skills by category
  const skillsByCategory = activeResume.skills.reduce((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const allCategories = ['all', ...Object.keys(skillsByCategory)];

  const filteredSkills = activeCategoryFilter === 'all' 
    ? activeResume.skills 
    : (skillsByCategory[activeCategoryFilter] || []);

  return (
    <div className="space-y-6">
      {/* Top Profile Selector & Actions */}
      <div className="glass-panel p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Resume Intelligence & Skill Extraction
                  <span className="badge badge-indigo text-xs">Requirement 1</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Select a pre-configured student profile or upload / paste any custom resume to run NLP entity extraction.
                </p>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Presets:</span>
            {SAMPLE_RESUMES.map((res) => {
              const isSelected = activeResume.id === res.id;
              return (
                <button
                  key={res.id}
                  onClick={() => onSelectResume(res)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  {res.name} ({res.skills.length} skills)
                </button>
              );
            })}

            <button
              onClick={() => setIsPasting(!isPasting)}
              className="btn btn-sm btn-outline-cyan text-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isPasting ? 'Cancel Custom' : 'Upload / Paste'}</span>
            </button>
          </div>
        </div>

        {/* Custom Resume Upload / Paste Drawer */}
        {isPasting && (
          <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Upload File (.txt, .md, .docx) or Paste Raw Resume
              </h3>
              <label className="btn btn-sm btn-secondary cursor-pointer text-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Browse File</span>
                <input 
                  type="file" 
                  accept=".txt,.md,.json,.pdf,.docx" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>
            </div>

            <textarea
              rows={6}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste candidate resume text here (including Education, Technical Skills, Experience, and Projects)..."
              className="w-full rounded-lg bg-slate-950/80 border border-slate-700 p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPasteText(SAMPLE_RESUMES[0].rawText)}
                className="btn btn-sm btn-secondary text-xs"
              >
                Load Sample Text
              </button>
              <button
                onClick={handleParsePastedText}
                disabled={isUploading || !pasteText.trim()}
                className="btn btn-sm btn-primary text-xs"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Extracting Entities...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Extraction</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Extracted Profile Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Candidate Summary Card & Education */}
        <div className="space-y-6">
          {/* Candidate Card */}
          <div className="glass-panel p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-md">
                  {activeResume.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{activeResume.name}</h3>
                  <p className="text-xs text-indigo-300 font-medium">{activeResume.title}</p>
                </div>
              </div>
              <span className="badge badge-emerald text-[11px]">
                <CheckCircle2 className="w-3 h-3" />
                Parsed
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center justify-between">
                <span>Email:</span>
                <span className="text-slate-200 font-mono">{activeResume.email}</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Location:</span>
                <span className="text-slate-200">{activeResume.location}</span>
              </p>
              <p className="flex items-center justify-between">
                <span>LinkedIn:</span>
                <span className="text-indigo-400 font-mono">{activeResume.linkedin}</span>
              </p>
              <p className="flex items-center justify-between">
                <span>GitHub:</span>
                <span className="text-cyan-400 font-mono">{activeResume.github}</span>
              </p>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Executive Profile Summary
              </span>
              {activeResume.summary}
            </div>
          </div>

          {/* Education Card */}
          <div className="glass-panel p-5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Extracted Education
            </h4>
            <div className="space-y-3">
              {activeResume.education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex justify-between items-start">
                    <h5 className="text-xs font-semibold text-slate-200">{edu.degree}</h5>
                    <span className="badge badge-cyan text-[10px]">{edu.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{edu.institution}</p>
                  <p className="text-xs text-emerald-400 font-medium mt-1">GPA: {edu.gpa}</p>
                  
                  {edu.coursework && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {edu.coursework.map((c, cIdx) => (
                        <span key={cIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Card */}
          {activeResume.certifications && (
            <div className="glass-panel p-5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-amber-400" />
                Certifications & Badges
              </h4>
              <ul className="space-y-2 text-xs">
                {activeResume.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-300 p-2 rounded-lg bg-slate-900/50 border border-slate-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Center & Right Column: Extracted Skills & Experience */}
        <div className="lg:col-span-2 space-y-6">
          {/* Extracted Skills Section with Category Tabs */}
          <div className="glass-panel p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  Extracted Technical & Soft Skills ({activeResume.skills.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Categorized and scored against the SkillGraph master ontology.
                </p>
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800 self-start">
                <button
                  onClick={() => setViewMode('structured')}
                  className={`px-2.5 py-1 rounded text-xs font-medium ${
                    viewMode === 'structured' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Cards View
                </button>
                <button
                  onClick={() => setViewMode('raw')}
                  className={`px-2.5 py-1 rounded text-xs font-medium ${
                    viewMode === 'raw' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Raw Text
                </button>
              </div>
            </div>

            {viewMode === 'structured' ? (
              <>
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-4">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryFilter(cat)}
                      className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        activeCategoryFilter === cat
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {cat === 'all' ? 'All Skills' : cat}
                    </button>
                  ))}
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredSkills.map((skill) => {
                    const profBadgeClass = 
                      skill.proficiency === 'Advanced' ? 'badge-emerald' :
                      skill.proficiency === 'Intermediate' ? 'badge-cyan' : 'badge-slate';

                    return (
                      <div 
                        key={skill.id}
                        className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-white">{skill.name}</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">{skill.category}</p>
                          </div>
                          <span className={`badge ${profBadgeClass} text-[10px]`}>
                            {skill.proficiency}
                          </span>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">
                            Verified in: <strong className="text-slate-300 font-normal">{skill.verifiedIn}</strong>
                          </span>
                          <span className="text-indigo-400 font-mono font-semibold">
                            {skill.marketDemand ? `${skill.marketDemand}% Demand` : 'High'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-96">
                {activeResume.rawText}
              </pre>
            )}
          </div>

          {/* Work Experience & Projects Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience */}
            <div className="glass-panel p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Work Experience & Internships
              </h3>
              {activeResume.experience.length > 0 ? (
                activeResume.experience.map((exp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-white">{exp.role}</h4>
                        <p className="text-xs text-indigo-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.skillsUsed && (
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1">
                        {exp.skillsUsed.map((s, sIdx) => (
                          <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-500">
                  No formal work experience listed. Focus on project portfolio and academic accomplishments.
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="glass-panel p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-purple-400" />
                Featured Project Portfolio
              </h3>
              {activeResume.projects.map((proj, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-white">{proj.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      Portfolio
                    </span>
                  </div>
                  <p className="text-[11px] text-cyan-400 font-mono">{proj.tech}</p>
                  <p className="text-xs text-slate-300">{proj.description}</p>
                  
                  {proj.highlights && (
                    <ul className="space-y-1 text-xs text-slate-400">
                      {proj.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <span className="text-purple-400 font-bold">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

