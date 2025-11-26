import React, { useState, useEffect } from 'react';
import { BarChart, TrendingUp, AlertTriangle, Lightbulb, BookOpen, RefreshCw, BrainCircuit } from 'lucide-react';
import { generateProgressReport } from '../services/geminiService';
import { AssignmentResult } from '../types';
import ReactMarkdown from 'react-markdown';

const ProgressReport: React.FC = () => {
  const [results, setResults] = useState<AssignmentResult[]>([]);
  const [aiReport, setAiReport] = useState<string>("");
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ict_lab_results');
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, []);

  const calculateStats = () => {
    const stats: {[key: string]: { total: number, scored: number }} = {};
    results.forEach(r => {
      // Find assignment to get tag (hacky lookup since we store simplified results)
      // Ideally we store tag in result, but let's assume we can derive or it's generic
      const tag = r.assignmentId.includes('logic') ? 'Logic' : 
                  r.assignmentId.includes('python') ? 'Python' : 
                  r.assignmentId.includes('os') ? 'Systems' : 'Database';
      
      if (!stats[tag]) stats[tag] = { total: 0, scored: 0 };
      stats[tag].total += r.totalMarks;
      stats[tag].scored += r.score;
    });
    return stats;
  };

  const handleGenerateReport = async () => {
    if (results.length === 0) return;
    setLoadingReport(true);
    const stats = calculateStats();
    // Convert to readable format for AI
    const readableStats = Object.entries(stats).map(([k, v]) => ({
      module: k,
      percentage: Math.round((v.scored / v.total) * 100)
    }));
    
    const report = await generateProgressReport(readableStats);
    setAiReport(report);
    setLoadingReport(false);
  };

  const stats = calculateStats();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            Student Progress
          </h2>
          <p className="text-slate-400 text-sm mt-1">Analytics based on your assignment performance.</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          disabled={loadingReport || results.length === 0}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg"
        >
          {loadingReport ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
          {loadingReport ? "Analyzing..." : "Get AI Guidance"}
        </button>
      </div>

      {results.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Data Available</h3>
          <p className="text-slate-400">Complete assignments in the "Assignments" tab to see your progress here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Performance Chart */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-blue-400" /> Module Performance
            </h3>
            <div className="space-y-6">
              {Object.entries(stats).map(([module, data]) => {
                const pct = Math.round((data.scored / data.total) * 100);
                return (
                  <div key={module}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 font-medium">{module}</span>
                      <span className={`font-bold ${pct >= 75 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Report Card */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl border border-indigo-500/30 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit className="w-24 h-24 text-white" />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-4 relative z-10">Personalized Guidance</h3>
            
            {aiReport ? (
              <div className="prose prose-invert prose-sm max-w-none relative z-10">
                <ReactMarkdown>{aiReport}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-slate-400 text-sm relative z-10 flex flex-col items-center justify-center h-48 text-center">
                <Lightbulb className="w-8 h-8 mb-2 opacity-50" />
                <p>Click "Get AI Guidance" to generate a study plan based on your weak areas.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressReport;