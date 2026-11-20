import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import ResumeExtractor from './components/ResumeExtractor.jsx';
import JobDescriptionMatcher from './components/JobDescriptionMatcher.jsx';
import SkillGapAnalysis from './components/SkillGapAnalysis.jsx';
import SkillGraphVisualizer from './components/SkillGraphVisualizer.jsx';
import RoadmapView from './components/RoadmapView.jsx';
import MockInterviewLab from './components/MockInterviewLab.jsx';
import CareerDashboard from './components/CareerDashboard.jsx';
import ExportModal from './components/ExportModal.jsx';

import { SAMPLE_RESUMES } from './data/sampleResumes.js';
import { JOB_ROLES } from './data/jobRoles.js';
import { calculateSkillGapMatch } from './services/matchingEngine.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeResume, setActiveResume] = useState(SAMPLE_RESUMES[0]);
  const [activeJob, setActiveJob] = useState(JOB_ROLES[0]);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Re-calculate multi-dimensional skill gap analysis dynamically
  const gapAnalysis = useMemo(() => {
    return calculateSkillGapMatch(activeResume, activeJob);
  }, [activeResume, activeJob]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeResume={activeResume}
        activeJob={activeJob}
        gapAnalysis={gapAnalysis}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'resume' && (
          <ResumeExtractor
            activeResume={activeResume}
            onSelectResume={(res) => setActiveResume(res)}
            onResumeUpdated={(parsed) => setActiveResume(parsed)}
          />
        )}

        {activeTab === 'job' && (
          <JobDescriptionMatcher
            activeJob={activeJob}
            onSelectJob={(job) => setActiveJob(job)}
            onJobUpdated={(customJob) => setActiveJob(customJob)}
            onProceedToGap={() => setActiveTab('gap')}
          />
        )}

        {activeTab === 'gap' && (
          <SkillGapAnalysis
            gapAnalysis={gapAnalysis}
            activeResume={activeResume}
            activeJob={activeJob}
            onNavigateToRoadmap={() => setActiveTab('roadmap')}
            onNavigateToInterview={() => setActiveTab('interview')}
          />
        )}

        {activeTab === 'graph' && (
          <SkillGraphVisualizer
            activeResume={activeResume}
            activeJob={activeJob}
            gapAnalysis={gapAnalysis}
            onNavigateToRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            gapAnalysis={gapAnalysis}
            activeJob={activeJob}
            activeResume={activeResume}
          />
        )}

        {activeTab === 'interview' && (
          <MockInterviewLab
            activeJob={activeJob}
            activeResume={activeResume}
          />
        )}

        {activeTab === 'dashboard' && (
          <CareerDashboard
            gapAnalysis={gapAnalysis}
            activeResume={activeResume}
            activeJob={activeJob}
            setActiveTab={setActiveTab}
            onOpenExport={() => setIsExportOpen(true)}
          />
        )}
      </main>

      {/* Printable / Downloadable Export Dossier Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        gapAnalysis={gapAnalysis}
        activeResume={activeResume}
        activeJob={activeJob}
      />

      {/* Platform Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 text-xs text-slate-500 mt-12 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-extrabold text-slate-300 text-sm">
              SkillGraph<span className="text-indigo-400"> AI</span>
            </span>
            <p className="mt-1 text-slate-400">
              "SkillGraph AI transforms resumes into actionable career intelligence through AI-powered skill analysis, job matching, and personalized learning roadmaps."
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>NLP Entity Extraction</span>
            <span>•</span>
            <span>Semantic Ontology Graph</span>
            <span>•</span>
            <span>Explainable AI Insights</span>
            <span>•</span>
            <span>Interactive Interview AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

