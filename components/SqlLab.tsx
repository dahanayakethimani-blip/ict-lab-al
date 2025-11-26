
import React, { useState } from 'react';
import { Database, Play, RefreshCw, Lightbulb, AlertCircle, Table2, Trophy } from 'lucide-react';
import { askSyllabusTutor } from '../services/geminiService';
import QuizOverlay from './QuizOverlay';
import { ModuleType } from '../types';

// Mock Database
const INITIAL_DB = {
  Students: [
    { id: 1, name: "Amara", city: "Colombo", grade: "12-A", marks: 85 },
    { id: 2, name: "Nimal", city: "Kandy", grade: "12-B", marks: 72 },
    { id: 3, name: "Kamal", city: "Galle", grade: "12-A", marks: 90 },
    { id: 4, name: "Sunil", city: "Colombo", grade: "12-C", marks: 65 },
    { id: 5, name: "Mala", city: "Jaffna", grade: "12-B", marks: 88 },
  ]
};

const SqlLab: React.FC = () => {
  const [query, setQuery] = useState("SELECT * FROM Students");
  const [result, setResult] = useState<any[]>(INITIAL_DB.Students);
  const [error, setError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const runQuery = () => {
    setError(null);
    const q = query.trim();
    
    try {
      if (!q.toUpperCase().startsWith("SELECT")) throw new Error("Only SELECT queries are supported in this lab.");
      if (!q.toUpperCase().includes("FROM STUDENTS")) throw new Error("Table 'Students' not found or syntax error.");

      let data = [...INITIAL_DB.Students];

      const whereSplit = q.toUpperCase().split("WHERE");
      if (whereSplit.length > 1) {
        const condition = q.substring(q.toUpperCase().indexOf("WHERE") + 5).trim();
        
        if (condition) {
          data = data.filter(row => {
            if (condition.includes('=')) {
              const [key, val] = condition.split('=').map(s => s.trim());
              const cleanVal = val.replace(/['"]/g, '');
              return String(row[key.toLowerCase() as keyof typeof row]).toLowerCase() === cleanVal.toLowerCase();
            }
            if (condition.includes('>')) {
              const [key, val] = condition.split('>').map(s => s.trim());
              return (row[key.toLowerCase() as keyof typeof row] as number) > Number(val);
            }
            if (condition.includes('<')) {
              const [key, val] = condition.split('<').map(s => s.trim());
              return (row[key.toLowerCase() as keyof typeof row] as number) < Number(val);
            }
            return true;
          });
        }
      }

      const selectPart = q.substring(6, q.toUpperCase().indexOf("FROM")).trim();
      if (selectPart !== "*") {
        const columns = selectPart.split(',').map(c => c.trim().toLowerCase());
        data = data.map(row => {
          const newRow: any = {};
          columns.forEach(col => {
            if (row[col as keyof typeof row] !== undefined) {
              newRow[col] = row[col as keyof typeof row];
            }
          });
          return newRow;
        });
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Syntax Error");
      setResult([]);
    }
  };

  const getChallenge = async () => {
    setLoadingAi(true);
    const prompt = "Generate a simple SQL SELECT query challenge based on a table named 'Students' with columns: id, name, city, grade, marks. Just give the question statement, not the answer.";
    const response = await askSyllabusTutor(prompt);
    setChallenge(response);
    setLoadingAi(false);
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.SQL_LAB} onClose={() => setShowQuiz(false)} />}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          SQL Playground (Unit 7)
        </h2>
        <div className="flex gap-2">
            <button 
                onClick={() => setShowQuiz(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all"
            >
                <Trophy className="w-4 h-4" /> Quiz
            </button>
            <button 
            onClick={getChallenge}
            disabled={loadingAi}
            className="flex items-center gap-2 text-sm bg-pink-600/20 text-pink-300 hover:bg-pink-600/30 px-3 py-2 rounded-lg transition-colors border border-pink-600/30"
            >
            <Lightbulb className="w-4 h-4" />
            {loadingAi ? "Thinking..." : "Get AI Challenge"}
            </button>
        </div>
      </div>

      {challenge && (
        <div className="mb-6 bg-pink-900/20 border border-pink-500/30 p-4 rounded-xl animate-in fade-in">
          <h4 className="text-pink-300 font-bold text-sm mb-1">Challenge:</h4>
          <p className="text-slate-200 text-sm">{challenge}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Table2 className="w-4 h-4" /> Schema: Students
            </div>
            <div className="space-y-1">
              {['id (int)', 'name (text)', 'city (text)', 'grade (text)', 'marks (int)'].map(col => (
                <div key={col} className="text-sm text-slate-300 font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700/50">
                  {col}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">SQL Query</label>
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-32 bg-slate-900 border border-slate-600 rounded-lg p-4 text-green-400 font-mono text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all"
              spellCheck={false}
            />
            <div className="flex gap-2">
              <button 
                onClick={runQuery}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" /> Run Query
              </button>
              <button 
                onClick={() => { setQuery("SELECT * FROM Students"); runQuery(); }}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
          <div className="bg-slate-800 p-3 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Query Results</span>
            <span className="text-xs text-slate-500">{result.length} rows returned</span>
          </div>
          
          <div className="flex-1 overflow-auto">
            {result.length > 0 ? (
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs font-bold">
                  <tr>
                    {Object.keys(result[0]).map(key => (
                      <th key={key} className="px-4 py-3">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {result.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className="px-4 py-3 font-mono">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 text-sm italic p-8">
                No results to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlLab;
