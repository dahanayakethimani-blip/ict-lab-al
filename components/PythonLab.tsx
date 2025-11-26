
import React, { useState } from 'react';
import { Play, Terminal, Code, RotateCcw, Book, Trophy } from 'lucide-react';
import { runPythonCode } from '../services/geminiService';
import QuizOverlay from './QuizOverlay';
import { ModuleType } from '../types';

const SNIPPETS = [
  {
    name: "Hello World",
    code: `# Grade 12 Python: Basic Output\n\nname = "Student"\nprint(f"Hello, {name}!")\nprint("Welcome to ICT Lab")`
  },
  {
    name: "Loops (For)",
    code: `# Grade 12 Python: Iteration\n\nnumbers = [1, 2, 3, 4, 5]\ntotal = 0\n\nfor num in numbers:\n    total += num\n    print(f"Added {num}, Total is now {total}")`
  },
  {
    name: "Functions",
    code: `# Grade 12 Python: Functions\n\ndef calculate_grade(marks):\n    if marks >= 75:\n        return 'A'\n    elif marks >= 65:\n        return 'B'\n    elif marks >= 50:\n        return 'C'\n    else:\n        return 'S'\n\nprint(calculate_grade(85))\nprint(calculate_grade(45))`
  },
  {
    name: "File Handling (Simulated)",
    code: `# Grade 12 Python: File Concept\n\n# Note: Real file I/O is restricted in browser\n# This logic demonstrates the concept\n\ndata = ["Amara,85", "Nimal,70", "Kamal,92"]\n\nfor record in data:\n    name, marks = record.split(',')\n    print(f"Student: {name} scored {marks}")`
  }
];

const PythonLab: React.FC = () => {
  const [code, setCode] = useState(SNIPPETS[0].code);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running code...");
    const result = await runPythonCode(code);
    setOutput(result);
    setIsRunning(false);
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl h-[calc(100vh-100px)] flex flex-col relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.PYTHON_LAB} onClose={() => setShowQuiz(false)} />}

      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          Python Programming Lab
        </h2>
        <div className="flex gap-2">
          <button 
                onClick={() => setShowQuiz(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all"
            >
                <Trophy className="w-4 h-4" /> Quiz
            </button>
          <select 
            onChange={(e) => setCode(SNIPPETS[parseInt(e.target.value)].code)}
            className="bg-slate-700 text-white text-sm rounded-lg px-3 border border-slate-600 focus:ring-2 focus:ring-yellow-500 outline-none"
          >
            {SNIPPETS.map((s, i) => (
              <option key={i} value={i}>{s.name}</option>
            ))}
          </select>
          <button 
            onClick={() => setCode('')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Clear Code"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-green-900/20"
          >
            <Play className="w-4 h-4" />
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
        <div className="flex flex-col bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Code className="w-3 h-3" /> Editor
            </span>
            <span className="text-xs text-slate-500">Python 3.x Syntax</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-slate-900 p-4 text-yellow-100 font-mono text-sm resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
            placeholder="Write your python code here..."
          />
        </div>

        <div className="flex flex-col bg-black rounded-xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Output Console
            </span>
            {isRunning && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-auto">
            {output ? (
              <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="text-slate-600 italic">Output will appear here...</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-yellow-900/20 border border-yellow-600/30 p-3 rounded-lg flex items-start gap-3 shrink-0">
        <Book className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
        <p className="text-sm text-yellow-200/80">
          <strong>Tip:</strong> This is an AI-simulated Python environment. It helps you learn logic and find errors. For complex file operations or heavy libraries, use a local IDE.
        </p>
      </div>
    </div>
  );
};

export default PythonLab;
