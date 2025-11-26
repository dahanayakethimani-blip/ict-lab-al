
import React, { useState } from 'react';
import { Bot, MessageSquare, ArrowRight, Zap, Target } from 'lucide-react';
import { simulateAgentSystem } from '../services/geminiService';

interface AgentLog {
  agent: string;
  message: string;
}

const AgentSystemSim: React.FC = () => {
  const [goal, setGoal] = useState("Plan a 3-day school trip to Sigiriya");
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = async () => {
    setIsSimulating(true);
    setLogs([]);
    const result = await simulateAgentSystem(goal);
    try {
        const parsed = JSON.parse(result);
        
        // Stream the logs for effect
        let i = 0;
        const interval = setInterval(() => {
            if (i < parsed.length) {
                setLogs(prev => [...prev, parsed[i]]);
                i++;
            } else {
                clearInterval(interval);
                setIsSimulating(false);
            }
        }, 1500);

    } catch (e) {
        setLogs([{ agent: "System", message: "Failed to simulate agents." }]);
        setIsSimulating(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl min-h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          Multi-Agent Systems
        </h2>
        <p className="text-slate-400 text-sm mt-1">Observe how autonomous software agents collaborate to solve complex problems.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700 p-2 flex items-center gap-3">
             <Target className="w-5 h-5 text-purple-400 ml-2 shrink-0" />
             <input 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none text-sm md:text-base"
                placeholder="Enter a complex goal..."
             />
        </div>
        <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-bold transition-all disabled:opacity-50 w-full md:w-auto"
        >
            {isSimulating ? "Agents Working..." : "Initialize Agents"}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 relative py-8">
        
        {/* Agent 1 */}
        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-0">
            <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center bg-slate-800 transition-all duration-500 ${logs.length > 0 && logs[logs.length-1].agent === 'Coordinator' ? 'border-purple-500 scale-110 shadow-[0_0_30px_purple]' : 'border-slate-600'}`}>
                <Bot className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
            <div className="text-left md:text-center">
                <h3 className="text-purple-300 font-bold mt-0 md:mt-4">Coordinator Agent</h3>
                <p className="text-slate-500 text-xs mt-1">Decomposes tasks & assigns work</p>
            </div>
        </div>

        {/* Agent 2 */}
        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-0">
             <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center bg-slate-800 transition-all duration-500 ${logs.length > 0 && logs[logs.length-1].agent === 'Research' ? 'border-blue-500 scale-110 shadow-[0_0_30px_blue]' : 'border-slate-600'}`}>
                <Zap className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
            <div className="text-left md:text-center">
                <h3 className="text-blue-300 font-bold mt-0 md:mt-4">Research Agent</h3>
                <p className="text-slate-500 text-xs mt-1">Searches knowledge base</p>
            </div>
        </div>

        {/* Agent 3 */}
        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-0">
             <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center bg-slate-800 transition-all duration-500 ${logs.length > 0 && logs[logs.length-1].agent === 'Report' ? 'border-green-500 scale-110 shadow-[0_0_30px_green]' : 'border-slate-600'}`}>
                <MessageSquare className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
            <div className="text-left md:text-center">
                <h3 className="text-green-300 font-bold mt-0 md:mt-4">Reporting Agent</h3>
                <p className="text-slate-500 text-xs mt-1">Compiles final solution</p>
            </div>
        </div>

        {/* Communication Visual Lines - Desktop Only */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-slate-700 -z-10"></div>
        {/* Mobile Vertical Line */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-slate-700 -z-10"></div>

      </div>

      {/* Communication Log */}
      <div className="mt-8 flex-1 bg-slate-900 rounded-xl border border-slate-700 p-6 overflow-y-auto max-h-[300px] md:max-h-none">
         <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">System Event Log</h4>
         <div className="space-y-4">
            {logs.map((log, i) => (
                <div key={i} className="flex gap-4 animate-in slide-in-from-left-2">
                    <div className={`w-24 text-right text-xs font-bold py-1 ${log.agent === 'Coordinator' ? 'text-purple-400' : log.agent === 'Research' ? 'text-blue-400' : 'text-green-400'}`}>
                        {log.agent}
                    </div>
                    <div className="flex-1 bg-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-700 text-sm text-slate-200">
                        {log.message}
                    </div>
                </div>
            ))}
            {isSimulating && <div className="text-slate-500 text-xs italic ml-28">Processing...</div>}
         </div>
      </div>

    </div>
  );
};

export default AgentSystemSim;
