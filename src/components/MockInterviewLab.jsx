import React, { useState, useEffect } from 'react';
import { 
  MessageSquareCode, 
  Mic, 
  MicOff, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  HelpCircle, 
  Play, 
  RotateCcw,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions.js';
import { evaluateInterviewResponse } from '../services/interviewEvaluator.js';

export default function MockInterviewLab({ activeJob, activeResume }) {
  const [selectedQuestion, setSelectedQuestion] = useState(INTERVIEW_QUESTIONS[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer(prev => prev + ' ' + transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognitionInstance(recognition);
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionInstance) {
      alert('Speech recognition is not supported in this browser. You can type your answer in the box.');
      return;
    }

    if (isListening) {
      recognitionInstance.stop();
      setIsListening(false);
    } else {
      try {
        recognitionInstance.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      const result = evaluateInterviewResponse(userAnswer, selectedQuestion);
      setEvaluation(result);
      setIsEvaluating(false);
    }, 450);
  };

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setUserAnswer('');
    setEvaluation(null);
    setShowHint(false);
  };

  const loadSampleAnswer = () => {
    setUserAnswer(selectedQuestion.idealAnswer);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white shadow-md">
              <MessageSquareCode className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  AI-Powered Technical & Behavioral Mock Interview Lab
                </h2>
                <span className="badge badge-cyan text-xs">Requirement 6</span>
              </div>
              <p className="text-xs text-slate-400">
                Practice role-specific interview questions, speak or type your answer, and receive real-time AI scoring against industry rubrics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge badge-indigo text-xs">
              Target Role: {activeJob.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Interview Practice Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Question Bank Selector */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Question Bank ({INTERVIEW_QUESTIONS.length})</h3>
            <span className="text-[10px] text-slate-400">Select to Practice</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {INTERVIEW_QUESTIONS.map((q) => {
              const isSelected = selectedQuestion.id === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500/50 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] text-cyan-400 font-medium">{q.category}</span>
                    <span className={`badge ${
                      q.difficulty === 'Advanced' ? 'badge-rose' :
                      q.difficulty === 'Intermediate' ? 'badge-indigo' : 'badge-emerald'
                    } text-[9px]`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-2">
                    {q.question}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center & Right Column: Interactive Practice Arena & Evaluation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Question Card */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="badge badge-cyan text-xs">{selectedQuestion.category}</span>
                <span className="badge badge-indigo text-xs">{selectedQuestion.difficulty}</span>
              </div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Interviewer Hint'}</span>
              </button>
            </div>

            <h3 className="text-base font-bold text-white leading-relaxed">
              {selectedQuestion.question}
            </h3>

            {showHint && (
              <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">What the Interviewer Looks For:</strong>
                  <span>{selectedQuestion.promptHint}</span>
                </div>
              </div>
            )}

            {/* Answer Input Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="font-semibold text-slate-300">Your Response:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadSampleAnswer}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Auto-Fill Model Answer
                  </button>
                  <button
                    onClick={() => setUserAnswer('')}
                    className="text-[11px] text-slate-500 hover:text-slate-300"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <textarea
                rows={7}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your technical explanation here, or click the mic button below to speak your response aloud..."
                className="w-full rounded-xl bg-slate-950/80 border border-slate-700 p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
              />

              {/* Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSpeechRecognition}
                    className={`btn btn-sm ${
                      isListening ? 'btn-primary bg-rose-600 border-rose-500 animate-pulse' : 'btn-secondary'
                    } text-xs flex items-center gap-1.5`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-3.5 h-3.5" />
                        <span>Recording Speech (Listening...)</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Speak Answer (Voice AI)</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {userAnswer.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !userAnswer.trim()}
                  className="btn btn-sm btn-primary text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isEvaluating ? 'Evaluating with AI...' : 'Evaluate Answer with AI'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Evaluation Results Card */}
          {evaluation && (
            <div className="glass-panel p-5 space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">AI Evaluation Scorecard</h4>
                    <p className="text-xs text-slate-400">Scored against production engineering interview rubrics</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-white">{evaluation.score}</span>
                    <span className="text-xs text-slate-400">/100</span>
                  </div>
                  <span className={`badge ${evaluation.badgeColor} text-xs`}>
                    {evaluation.ratingLabel}
                  </span>
                </div>
              </div>

              {/* Sub-scores */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-400">Technical Accuracy:</span>
                    <span className="text-cyan-400 font-bold">{evaluation.accuracyScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${evaluation.accuracyScore}%` }}></div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-400">Concept Completeness:</span>
                    <span className="text-indigo-400 font-bold">{evaluation.completenessScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: `${evaluation.completenessScore}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Keyword Analysis */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Industry Terminology Breakdown
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.detectedTerms.map((term, idx) => (
                    <span key={idx} className="badge badge-emerald text-[10px]">
                      ✓ {term}
                    </span>
                  ))}
                  {evaluation.missingTerms.map((term, idx) => (
                    <span key={idx} className="badge badge-rose text-[10px]">
                      ✗ {term} (missed)
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                  <h5 className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Key Candidate Strengths
                  </h5>
                  <ul className="space-y-1 text-slate-300">
                    {evaluation.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                  <h5 className="font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Areas to Improve in Live Round
                  </h5>
                  <ul className="space-y-1 text-slate-300">
                    {evaluation.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exemplary Model Answer */}
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    Exemplary Model Answer (L5 / Senior Benchmark)
                  </h5>
                  <span className="badge badge-indigo text-[9px]">Gold Standard</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                  {evaluation.modelAnswer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

