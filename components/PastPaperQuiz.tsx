
import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, FileText, PenTool, BrainCircuit } from 'lucide-react';
import { explainMcq, gradeStructuredAnswer } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

// Sample Data extracted from the user's provided PDF (2023/2024 AL ICT Paper)
const MCQS = [
  {
    id: 1,
    question: "Which of the following statements are correct regarding software categories?",
    statements: [
      "A - Word processors and spreadsheet software belong to the category of utility software.",
      "B - A compiler is an example for a program translator.",
      "C - It is illegal to use a proprietary software without obtaining its license."
    ],
    options: [
      "A only",
      "B only",
      "C only",
      "A and B only",
      "B and C only"
    ],
    correctAnswer: 4, // 0-indexed -> Option 5 (B and C)
    explanation: "Word processors are Application software, not Utility. Compilers translate source code (True). Proprietary software requires a license (True)."
  },
  {
    id: 7,
    question: "What is the correct binary equivalent of decimal 13.125?",
    options: [
      "1100.001",
      "1100.100",
      "1101.001",
      "1101.100",
      "1101.101"
    ],
    correctAnswer: 2, // Option 3: 1101.001
    explanation: "Integer 13 is 1101 in binary. Fractional 0.125 is 0.001 in binary (0.125 * 2 = 0.25 -> 0, 0.25 * 2 = 0.5 -> 0, 0.5 * 2 = 1.0 -> 1)."
  },
  {
    id: 14,
    question: "A program in execution in a computer is called a process. Which of the following is a possible state transition sequence of such a process?",
    options: [
      "New → Ready → Running → Terminated",
      "New → Blocked → Terminated",
      "New → Ready → Blocked → Running → Terminated",
      "New → Running → Ready → Running → Terminated",
      "New → Blocked → Ready → Running → Terminated"
    ],
    correctAnswer: 0, // Option 1
    explanation: "Standard lifecycle: Process is created (New), goes to Ready queue, dispatched to Running. If finished, Terminated. It cannot go New->Blocked directly."
  }
];

const ESSAY_QUESTIONS = [
  {
    id: 'Q42',
    title: 'Python Programming - Lists & Logic',
    content: `Write the output of the following Python code:

original_list = [1, 2, 3, 4, 5]
new_list = original_list.copy()
new_list.clear()
original_list.append(6)
print(original_list)
print(new_list)`,
    type: 'code'
  },
  {
    id: 'Q8_a',
    title: 'Python Functions - Control Flow',
    content: `Write the output of the Python code given below:

def function1(str):
    newstr = ""
    for character in str:
        if character in 'aeiouAEIOU':
            newstr += '*'
        else:
            newstr += character
    return newstr

str1 = "LibRArY"
str2 = function1(str1)
print(str2)`,
    type: 'code'
  }
];

const PastPaperQuiz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mcq' | 'essay'>('mcq');
  
  // MCQ State
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showExplanation, setShowExplanation] = useState<{[key: number]: boolean}>({});
  const [aiExplanations, setAiExplanations] = useState<{[key: number]: string}>({});
  const [loadingExp, setLoadingExp] = useState<number | null>(null);

  // Essay State
  const [activeEssayId, setActiveEssayId] = useState(ESSAY_QUESTIONS[0].id);
  const [essayInput, setEssayInput] = useState('');
  const [essayFeedback, setEssayFeedback] = useState<string | null>(null);
  const [grading, setGrading] = useState(false);

  const handleMcqSelect = (qId: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleGetAiExplanation = async (qId: number, question: any) => {
    if (aiExplanations[qId]) {
      setShowExplanation(prev => ({...prev, [qId]: !prev[qId]}));
      return;
    }

    setLoadingExp(qId);
    const text = await explainMcq(
      question.question + (question.statements ? ' ' + question.statements.join(' ') : ''),
      question.options,
      question.options[question.correctAnswer]
    );
    setAiExplanations(prev => ({...prev, [qId]: text}));
    setShowExplanation(prev => ({...prev, [qId]: true}));
    setLoadingExp(null);
  };

  const handleGradeEssay = async () => {
    if (!essayInput.trim()) return;
    
    setGrading(true);
    const currentQ = ESSAY_QUESTIONS.find(q => q.id === activeEssayId);
    const result = await gradeStructuredAnswer(currentQ?.content || '', essayInput);
    setEssayFeedback(result);
    setGrading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-emerald-400" />
            Past Paper Practice
          </h2>
          <p className="text-slate-400 mt-1">Based on 2023/2024 AL ICT Paper Structure</p>
        </div>
        
        <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveTab('mcq')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'mcq' 
                ? 'bg-blue-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Part A: MCQ
          </button>
          <button
            onClick={() => setActiveTab('essay')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'essay' 
                ? 'bg-blue-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Part B: Structured
          </button>
        </div>
      </div>

      {/* MCQ View */}
      {activeTab === 'mcq' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {MCQS.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

            return (
              <div key={q.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 shadow-lg">
                <div className="flex gap-4 mb-4">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center shrink-0 text-slate-300 font-mono font-bold">
                    {q.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-white font-medium mb-3">{q.question}</h3>
                    {q.statements && (
                      <div className="bg-slate-900/50 p-3 rounded-lg mb-4 space-y-1 border border-slate-800">
                        {q.statements.map((stmt, i) => (
                          <p key={i} className="text-slate-300 text-sm font-mono">{stmt}</p>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => !isAnswered && handleMcqSelect(q.id, optIdx)}
                          disabled={isAnswered}
                          className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                            selectedAnswers[q.id] === optIdx
                              ? isCorrect 
                                ? 'bg-green-900/30 border-green-500/50 text-green-100'
                                : 'bg-red-900/30 border-red-500/50 text-red-100'
                              : isAnswered && optIdx === q.correctAnswer
                                ? 'bg-green-900/20 border-green-500/30 text-green-200'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500/50'
                          }`}
                        >
                          <span>{optIdx + 1}) {opt}</span>
                          {selectedAnswers[q.id] === optIdx && (
                            isCorrect 
                              ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                              : <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                {isAnswered && (
                  <div className="mt-4 pl-12 border-t border-slate-700/50 pt-4">
                    <div className="flex flex-col gap-4">
                      <div className={`text-sm font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect ? 'Correct Answer!' : 'Incorrect. Try to understand why.'}
                      </div>
                      
                      <button
                        onClick={() => handleGetAiExplanation(q.id, q)}
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium w-fit transition-colors"
                        disabled={loadingExp === q.id}
                      >
                        <BrainCircuit className={`w-4 h-4 ${loadingExp === q.id ? 'animate-pulse' : ''}`} />
                        {showExplanation[q.id] ? 'Hide Tutor Explanation' : 'Ask AI Tutor to Explain'}
                      </button>

                      {showExplanation[q.id] && (
                        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 text-sm text-indigo-100 prose prose-invert max-w-none">
                          <ReactMarkdown>
                            {aiExplanations[q.id] || "Generating explanation..."}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Essay View */}
      {activeTab === 'essay' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
          {/* Question List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Questions</h3>
            {ESSAY_QUESTIONS.map(q => (
              <button
                key={q.id}
                onClick={() => {
                  setActiveEssayId(q.id);
                  setEssayInput('');
                  setEssayFeedback(null);
                }}
                className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                  activeEssayId === q.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <div className="font-bold">{q.id}</div>
                <div className="truncate opacity-80 text-xs">{q.title}</div>
              </button>
            ))}
          </div>

          {/* Workspace */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {ESSAY_QUESTIONS.find(q => q.id === activeEssayId)?.title}
                  </h3>
                  <div className="mt-4 bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 whitespace-pre-wrap border border-slate-700">
                    {ESSAY_QUESTIONS.find(q => q.id === activeEssayId)?.content}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Your Answer</label>
                  <textarea
                    value={essayInput}
                    onChange={(e) => setEssayInput(e.target.value)}
                    className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder:text-slate-600"
                    placeholder="Type your python output or code here..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleGradeEssay}
                    disabled={grading || !essayInput}
                    className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all"
                  >
                    {grading ? (
                      <>Checking...</>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Check Answer
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            {essayFeedback && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 animate-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 mb-4 text-purple-400">
                  <BrainCircuit className="w-5 h-5" />
                  <h4 className="font-bold">AI Examiner Feedback</h4>
                </div>
                <div className="prose prose-invert prose-sm max-w-none bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <ReactMarkdown>{essayFeedback}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PastPaperQuiz;
