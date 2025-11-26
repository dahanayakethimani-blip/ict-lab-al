
import React, { useState, useEffect } from 'react';
import { Clock, Trophy, AlertCircle, CheckCircle2, XCircle, BrainCircuit, X } from 'lucide-react';
import { ModuleType, QuizMode } from '../types';
import { QUIZ_DATABASE } from '../data/quizData';

interface QuizOverlayProps {
  moduleType: ModuleType;
  onClose: () => void;
}

const QuizOverlay: React.FC<QuizOverlayProps> = ({ moduleType, onClose }) => {
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const quizData = QUIZ_DATABASE[moduleType];
  const questions = mode ? quizData?.[mode === 'PRACTICE' ? 'practice' : mode === 'MODEL' ? 'model' : 'pastPaper'] || [] : [];

  // Timer Logic
  useEffect(() => {
    if (!mode || finished || mode === 'PRACTICE') return;

    if (timeLeft <= 0) {
      handleNext(); // Auto submit on timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, mode, finished]);

  const startQuiz = (selectedMode: QuizMode) => {
    setMode(selectedMode);
    setCurrentQIndex(0);
    setScore(0);
    setFinished(false);
    
    // Set Timer per question logic (Total time = Questions * Time per question)
    const timePerQ = selectedMode === 'MODEL' ? 60 : 45; // 60s for Model, 45s for Past Paper
    setTimeLeft(questions.length > 0 ? (quizData?.[selectedMode === 'MODEL' ? 'model' : 'pastPaper']?.length || 0) * timePerQ : 0);
    
    // Actually, let's just set a timer for the CURRENT question to make it more intense? 
    // Or a total quiz timer. Let's do Total Quiz Timer for simplicity in UI.
    const qCount = quizData?.[selectedMode === 'MODEL' ? 'model' : 'pastPaper']?.length || 0;
    setTimeLeft(qCount * timePerQ);
  };

  const handleAnswer = (idx: number) => {
    if (showExplanation) return; // Prevent changing after selection
    setSelectedAnswer(idx);
    setShowExplanation(true); // Show immediate feedback for Practice
    
    if (idx === questions[currentQIndex].correctAnswer) {
      setScore(s => s + 1);
    }

    // Auto advance for timed modes after brief delay, or let manual next for practice
    if (mode !== 'PRACTICE') {
      setTimeout(() => {
        handleNext();
      }, 1000);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  if (!quizData) return null;

  // 1. Mode Selection Screen
  if (!mode) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-8 relative shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X /></button>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Knowledge Check</h2>
            <p className="text-slate-400">Select a difficulty mode to begin testing your knowledge for this module.</p>
          </div>

          <div className="grid gap-4">
            <button 
              onClick={() => startQuiz('PRACTICE')}
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded-xl flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white">
                <BrainCircuit />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Practice Mode</h3>
                <p className="text-xs text-slate-400">Untimed • Immediate Feedback • Learn as you go</p>
              </div>
            </button>

            <button 
              onClick={() => startQuiz('MODEL')}
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-yellow-500 rounded-xl flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white">
                <Clock />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Model Quiz</h3>
                <p className="text-xs text-slate-400">Timed (1 min/q) • Standard Difficulty • Exam Prep</p>
              </div>
            </button>

            <button 
              onClick={() => startQuiz('PAST_PAPER')}
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500 rounded-xl flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white">
                <Trophy />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Past Paper Challenge</h3>
                <p className="text-xs text-slate-400">Strict Timer (45s/q) • Real AL Questions • Hard</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Results Screen
  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-8 relative shadow-2xl text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X /></button>
          
          <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-6 border-4 border-slate-700">
             {percentage >= 75 ? <Trophy className="w-10 h-10 text-yellow-400" /> : <CheckCircle2 className="w-10 h-10 text-blue-400" />}
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">{percentage}% Score</h2>
          <p className="text-slate-400 mb-6">You got <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{questions.length}</span> correct.</p>

          <div className="flex gap-4">
            <button onClick={() => setMode(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-bold">
                Main Menu
            </button>
            <button onClick={() => startQuiz(mode)} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold">
                Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Quiz Interface
  const currentQ = questions[currentQIndex];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
           <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  mode === 'PRACTICE' ? 'bg-blue-900 text-blue-300' :
                  mode === 'MODEL' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
              }`}>
                  {mode.replace('_', ' ')}
              </span>
              <span className="text-slate-400 text-sm">Question {currentQIndex + 1}/{questions.length}</span>
           </div>
           
           {mode !== 'PRACTICE' && (
               <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                   <Clock className="w-4 h-4" />
                   {formatTime(timeLeft)}
               </div>
           )}
           
           <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-800">
            <div 
                className="h-full bg-blue-500 transition-all duration-300" 
                style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
            ></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
            <h3 className="text-xl text-white font-bold mb-8 leading-relaxed">
                {currentQ.question}
            </h3>

            <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentQ.correctAnswer;
                    
                    let btnClass = "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700";
                    if (showExplanation) {
                        if (isCorrect) btnClass = "bg-green-900/40 border-green-500 text-green-100";
                        else if (isSelected) btnClass = "bg-red-900/40 border-red-500 text-red-100";
                        else btnClass = "bg-slate-800 border-slate-700 opacity-50";
                    } else if (isSelected) {
                        btnClass = "bg-blue-600 border-blue-500 text-white";
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={showExplanation}
                            className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${btnClass}`}
                        >
                            <span>{opt}</span>
                            {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                            {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                        </button>
                    );
                })}
            </div>

            {/* Explanation Box (Visible in Practice Mode or after answering) */}
            {showExplanation && (
                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                        <AlertCircle className="w-4 h-4" /> Explanation
                    </div>
                    <p className="text-blue-100/80 text-sm leading-relaxed">
                        {currentQ.explanation}
                    </p>
                    
                    {mode === 'PRACTICE' && (
                        <div className="mt-4 flex justify-end">
                             <button onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-500 transition-colors">
                                 Next Question
                             </button>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default QuizOverlay;
