
import React, { useState, useEffect } from 'react';
import { Process, SchedulerResult, ModuleType } from '../types';
import { Cpu, Play, RotateCcw, Plus, Trophy } from 'lucide-react';
import QuizOverlay from './QuizOverlay';

const COLORS = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500'];

const OsVisualizer: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, name: 'P1', arrivalTime: 0, burstTime: 4, color: COLORS[0] },
    { id: 2, name: 'P2', arrivalTime: 1, burstTime: 3, color: COLORS[1] },
    { id: 3, name: 'P3', arrivalTime: 2, burstTime: 1, color: COLORS[2] },
  ]);
  const [results, setResults] = useState<SchedulerResult[]>([]);
  const [algorithm, setAlgorithm] = useState<'FCFS' | 'SJF'>('FCFS');
  const [showQuiz, setShowQuiz] = useState(false);

  const calculateSchedule = () => {
    // Simple First-Come-First-Serve Logic
    // (Note: For simplicity in this demo, assumes ordered by Arrival Time if FCFS)
    // For SJF (Non-preemptive), we need to sort based on available queue.
    
    let currentTime = 0;
    let completed: SchedulerResult[] = [];
    let pending = [...processes];

    // Simple sort for FCFS initial state
    pending.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (pending.length > 0) {
      let available = pending.filter(p => p.arrivalTime <= currentTime);
      
      if (available.length === 0) {
        currentTime++;
        continue;
      }

      let selected: Process;
      if (algorithm === 'SJF') {
        // Sort by burst time for SJF
        available.sort((a, b) => a.burstTime - b.burstTime);
        selected = available[0];
      } else {
        // FCFS
        selected = available[0];
      }

      const startTime = currentTime;
      const endTime = startTime + selected.burstTime;
      const turnaroundTime = endTime - selected.arrivalTime;
      const waitingTime = startTime - selected.arrivalTime;

      completed.push({
        processId: selected.id,
        startTime,
        endTime,
        turnaroundTime,
        waitingTime
      });

      currentTime = endTime;
      pending = pending.filter(p => p.id !== selected.id);
    }

    setResults(completed);
  };

  useEffect(() => {
    calculateSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processes, algorithm]);

  const addProcess = () => {
    if (processes.length >= 5) return;
    const id = processes.length + 1;
    setProcesses([...processes, {
      id,
      name: `P${id}`,
      arrivalTime: Math.floor(Math.random() * 5),
      burstTime: Math.floor(Math.random() * 5) + 1,
      color: COLORS[id % COLORS.length]
    }]);
  };

  const reset = () => {
    setProcesses([
      { id: 1, name: 'P1', arrivalTime: 0, burstTime: 4, color: COLORS[0] },
      { id: 2, name: 'P2', arrivalTime: 1, burstTime: 3, color: COLORS[1] },
    ]);
  };

  const avgWait = results.length > 0 
    ? (results.reduce((acc, cur) => acc + cur.waitingTime, 0) / results.length).toFixed(2) 
    : 0;

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.OS_SCHEDULING} onClose={() => setShowQuiz(false)} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          CPU Scheduling (Unit 5.3)
        </h2>
        <div className="flex gap-2">
            <button 
                onClick={() => setShowQuiz(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-1.5 rounded-lg font-bold shadow-lg text-sm mr-4"
            >
                <Trophy className="w-4 h-4" />
                Quiz
            </button>
          <button 
            onClick={() => setAlgorithm('FCFS')}
            className={`px-3 py-1 rounded text-sm font-bold ${algorithm === 'FCFS' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            FCFS
          </button>
          <button 
            onClick={() => setAlgorithm('SJF')}
            className={`px-3 py-1 rounded text-sm font-bold ${algorithm === 'SJF' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            SJF
          </button>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300 mb-4">
          <thead className="text-xs uppercase bg-slate-900 text-slate-400">
            <tr>
              <th className="px-4 py-2">Process</th>
              <th className="px-4 py-2">Arrival Time</th>
              <th className="px-4 py-2">Burst Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr key={p.id} className="border-b border-slate-700">
                <td className="px-4 py-2 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${p.color}`}></div>
                  {p.name}
                </td>
                <td className="px-4 py-2">{p.arrivalTime}</td>
                <td className="px-4 py-2">{p.burstTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2">
          <button onClick={addProcess} className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Process
          </button>
          <button onClick={reset} className="flex items-center gap-1 bg-red-900/50 hover:bg-red-900 text-red-200 px-3 py-1 rounded text-sm transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 overflow-hidden">
        <h3 className="text-slate-400 text-xs uppercase font-bold mb-4 tracking-wider">Gantt Chart Visualization</h3>
        <div className="flex h-16 w-full rounded-lg overflow-hidden bg-slate-800 relative">
          {results.length === 0 && <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">No Processes Scheduled</div>}
          
          {results.map((r, idx) => {
            const totalTime = results[results.length-1].endTime;
            const width = ((r.endTime - r.startTime) / totalTime) * 100;
            const process = processes.find(p => p.id === r.processId);
            
            return (
              <div 
                key={idx} 
                style={{ width: `${width}%` }} 
                className={`${process?.color} h-full flex items-center justify-center text-white font-bold text-xs border-r border-slate-900/50 relative group transition-all hover:brightness-110`}
              >
                {process?.name}
                <div className="absolute bottom-0 right-0 bg-black/50 px-1 text-[10px]">{r.endTime}</div>
                {idx === 0 && <div className="absolute bottom-0 left-0 bg-black/50 px-1 text-[10px]">{r.startTime}</div>}
                
                {/* Tooltip */}
                <div className="hidden group-hover:block absolute bottom-full mb-2 bg-slate-800 text-white text-xs p-2 rounded shadow-lg z-10 w-max border border-slate-600">
                  Wait: {r.waitingTime}ms | Turnaround: {r.turnaroundTime}ms
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-slate-400">
            Total Time: <span className="text-white font-mono">{results.length > 0 ? results[results.length-1].endTime : 0}</span> units
          </div>
          <div className="text-sm text-slate-400">
            Avg Waiting Time: <span className="text-green-400 font-mono font-bold">{avgWait}</span> units
          </div>
        </div>
      </div>
    </div>
  );
};

export default OsVisualizer;
