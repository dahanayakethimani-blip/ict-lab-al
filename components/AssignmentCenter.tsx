
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, FileText, ChevronRight, BrainCircuit } from 'lucide-react';
import { WEEKLY_ASSIGNMENTS } from '../data/assignmentData';
import { Assignment, AssignmentResult } from '../types';
import { gradeStructuredAnswer } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const AssignmentCenter: React.FC = () => {
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<{[key: number]: number}>({});
  const [structuredAnswer, setStructuredAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedAssignments, setCompletedAssignments] = useState<AssignmentResult[]>([]);

  // Load results from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ict_lab_results');
    if (saved) {
      setCompletedAssignments(JSON.parse(saved));
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    if (!activeAssignment || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit(); // Auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAssignment, timeLeft]);

  const startAssignment = (assignment: Assignment) => {
    setActiveAssignment(assignment);
    setTimeLeft(assignment.durationMinutes * 60);
    setMcqAnswers({});
    setStructuredAnswer("");
  };

  const handleSubmit = async () => {
    if (!activeAssignment || isSubmitting) return;
    setIsSubmitting(true);

    // 1. Grade MCQs
    let mcqScore = 0;
    activeAssignment.questions.forEach(q => {
      if (mcqAnswers[q.id] === q.correctAnswer) {
        mcqScore++;
      }
    });

    // 2. Grade Structured (AI)
    let structuredScore = 0;
    let feedback = "";
    try {
      if (structuredAnswer.trim()) {
        const aiResponse = await gradeStructuredAnswer(activeAssignment.structuredQuestion.question, structuredAnswer);
        // Simple heuristic parsing to extract a score out of 10 from AI text if possible, else default to manual review needed msg
        // For this demo, let's assume the AI puts "Score: X/10" in the text.
        const scoreMatch = aiResponse.match(/Score:\s*(\d+)/i);
        if (scoreMatch) {
          structuredScore = parseInt(scoreMatch[1]);
        } else {
          structuredScore = 5; // Default if parsing fails
        }
        feedback = aiResponse;
      }
    } catch (e) {
      feedback = "Error grading structured answer. Please review manually.";
    }

    const totalMarks = activeAssignment.questions.length + activeAssignment.structuredQuestion.maxMarks;
    const finalScore = mcqScore + structuredScore;

    const result: AssignmentResult = {
      assignmentId: activeAssignment.id,
      date: new Date().toISOString(),
      score: finalScore,
      totalMarks: totalMarks,
      mcqScore,
      structuredScore,
      feedback
    };

    const newResults = [...completedAssignments.filter(r => r.assignmentId !== activeAssignment.id), result];
    setCompletedAssignments(newResults);
    localStorage.setItem('ict_lab_results', JSON.stringify(newResults));
    
    setIsSubmitting(false);
    setActiveAssignment(null);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- RENDER: EXAM MODE ---
  if (activeAssignment) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-50 overflow-y-auto">
        {/* Exam Header */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10 shadow-xl flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">{activeAssignment.title}</h2>
            <p className="text-sm text-slate-400">Week {activeAssignment.week} Assessment</p>
          </div>
          <div className={`flex items-center gap-2 text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            <Clock className="w-6 h-6" />
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {/* MCQ Section */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Part I: Multiple Choice</h3>
            <div className="space-y-6">
              {activeAssignment.questions.map((q, idx) => (
                <div key={q.id}>
                  <p className="text-slate-200 font-medium mb-3">{idx + 1}. {q.question}</p>
                  <div className="space-y-2 pl-4">
                    {q.options.map((opt, optIdx) => (
                      <label key={optIdx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 hover:bg-slate-800 cursor-pointer transition-colors">
                        <input 
                          type="radio" 
                          name={`q-${q.id}`} 
                          className="accent-blue-500 w-4 h-4"
                          checked={mcqAnswers[q.id] === optIdx}
                          onChange={() => setMcqAnswers(prev => ({...prev, [q.id]: optIdx}))}
                        />
                        <span className="text-slate-400 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Section */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Part II: Structured Essay</h3>
            <div className="mb-4">
              <p className="text-slate-200 font-medium">{activeAssignment.structuredQuestion.question}</p>
              <span className="text-xs text-slate-500 mt-1 block">({activeAssignment.structuredQuestion.maxMarks} Marks)</span>
            </div>
            <textarea
              value={structuredAnswer}
              onChange={(e) => setStructuredAnswer(e.target.value)}
              className="w-full h-48 bg-slate-950 border border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm"
              placeholder="Type your answer here..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6 pb-20">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-green-900/20 flex items-center gap-2 transition-all"
            >
              {isSubmitting ? "Submitting..." : "Submit Assignment"}
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: DASHBOARD ---
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-400" />
            Weekly Assignments
            </h2>
            <p className="text-slate-400 text-sm mt-1">Participate in timed assessments to test your knowledge.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WEEKLY_ASSIGNMENTS.map((assignment) => {
          const result = completedAssignments.find(r => r.assignmentId === assignment.id);
          const isCompleted = !!result;

          return (
            <div key={assignment.id} className={`p-6 rounded-xl border transition-all ${isCompleted ? 'bg-slate-900/50 border-green-900/50' : 'bg-slate-800 border-slate-700 hover:border-blue-500'}`}>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${isCompleted ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                  Week {assignment.week}
                </span>
                {isCompleted && (
                  <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Completed
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{assignment.title}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{assignment.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 font-mono">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {assignment.durationMinutes} mins</span>
                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {assignment.moduleTag}</span>
              </div>

              {isCompleted ? (
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-400 text-sm">Your Score</span>
                    <span className="text-xl font-bold text-white">{result.score}/{result.totalMarks}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${(result.score / result.totalMarks) * 100}%` }}></div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => startAssignment(assignment)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                >
                  Start Exam <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignmentCenter;
