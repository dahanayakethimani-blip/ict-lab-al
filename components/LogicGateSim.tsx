
import React, { useState, useEffect } from 'react';
import { LogicGateState, ModuleType } from '../types';
import { CheckCircle2, Circle, Lightbulb, Info, Trophy } from 'lucide-react';
import QuizOverlay from './QuizOverlay';

const LogicGateSim: React.FC = () => {
  const [state, setState] = useState<LogicGateState>({
    type: 'AND',
    inputA: false,
    inputB: false,
  });

  const [output, setOutput] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    let res = false;
    switch (state.type) {
      case 'AND': res = state.inputA && state.inputB; break;
      case 'OR': res = state.inputA || state.inputB; break;
      case 'NOT': res = !state.inputA; break;
      case 'NAND': res = !(state.inputA && state.inputB); break;
      case 'NOR': res = !(state.inputA || state.inputB); break;
      case 'XOR': res = state.inputA !== state.inputB; break;
    }
    setOutput(res);
  }, [state]);

  const handleGateChange = (type: LogicGateState['type']) => {
    setState(prev => ({ ...prev, type }));
  };

  const toggleInput = (input: 'A' | 'B') => {
    setState(prev => ({
      ...prev,
      [input === 'A' ? 'inputA' : 'inputB']: !prev[input === 'A' ? 'inputA' : 'inputB']
    }));
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.LOGIC_GATES} onClose={() => setShowQuiz(false)} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-lg font-mono">&</span>
            </div>
            Digital Logic Simulator
            </h2>
            <div className="text-slate-400 text-sm font-mono mt-1">
            Unit 4.1 - 4.3
            </div>
        </div>
        
        <button 
            onClick={() => setShowQuiz(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-5 py-2 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105"
        >
            <Trophy className="w-5 h-5" />
            Take Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
          <h3 className="text-slate-300 font-semibold mb-4">Select Gate</h3>
          <div className="grid grid-cols-2 gap-2">
            {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'] as const).map((gate) => (
              <button
                key={gate}
                onClick={() => handleGateChange(gate)}
                className={`px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  state.type === gate
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {gate}
              </button>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="flex items-start gap-3 bg-blue-900/20 p-3 rounded-lg text-sm text-blue-200">
              <Info className="w-5 h-5 mt-0.5 shrink-0" />
              <p>
                {state.type === 'AND' && "Output is TRUE only if both inputs are TRUE."}
                {state.type === 'OR' && "Output is TRUE if at least one input is TRUE."}
                {state.type === 'NOT' && "Inverts the input. Only Input A is used."}
                {state.type === 'NAND' && "Opposite of AND. TRUE unless both inputs are TRUE."}
                {state.type === 'NOR' && "Opposite of OR. TRUE only if both inputs are FALSE."}
                {state.type === 'XOR' && "Output is TRUE if inputs are different."}
              </p>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden p-8 min-h-[300px]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="flex items-center gap-8 relative z-10">
            {/* Inputs */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleInput('A')}
                  className={`w-16 h-10 rounded-full transition-colors flex items-center px-1 ${state.inputA ? 'bg-green-500 justify-end' : 'bg-slate-600 justify-start'}`}
                >
                  <div className="w-8 h-8 bg-white rounded-full shadow-md" />
                </button>
                <span className="font-mono font-bold text-white">A: {state.inputA ? '1' : '0'}</span>
              </div>

              {state.type !== 'NOT' && (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleInput('B')}
                    className={`w-16 h-10 rounded-full transition-colors flex items-center px-1 ${state.inputB ? 'bg-green-500 justify-end' : 'bg-slate-600 justify-start'}`}
                  >
                    <div className="w-8 h-8 bg-white rounded-full shadow-md" />
                  </button>
                  <span className="font-mono font-bold text-white">B: {state.inputB ? '1' : '0'}</span>
                </div>
              )}
            </div>

            {/* Gate Representation (Simplified Visual) */}
            <div className="w-32 h-32 bg-slate-800 rounded-xl border-2 border-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <span className="text-2xl font-black text-blue-400">{state.type}</span>
            </div>

            {/* Output */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
                output 
                  ? 'bg-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.6)]' 
                  : 'bg-slate-700 shadow-inner'
              }`}>
                <Lightbulb className={`w-10 h-10 ${output ? 'text-white' : 'text-slate-500'}`} />
              </div>
              <span className="font-mono font-bold text-white">OUT: {output ? '1' : '0'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Truth Table */}
      <div className="mt-8">
        <h3 className="text-slate-300 font-semibold mb-4">Truth Table: {state.type}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs uppercase bg-slate-900 text-slate-400">
              <tr>
                <th className="px-6 py-3">Input A</th>
                {state.type !== 'NOT' && <th className="px-6 py-3">Input B</th>}
                <th className="px-6 py-3">Output</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Generate rows dynamically */}
              {(state.type === 'NOT' ? [[0], [1]] : [[0,0], [0,1], [1,0], [1,1]]).map((row, idx) => {
                const a = !!row[0];
                const b = !!row[1];
                let res = false;
                if (state.type === 'AND') res = a && b;
                if (state.type === 'OR') res = a || b;
                if (state.type === 'NOT') res = !a;
                if (state.type === 'NAND') res = !(a && b);
                if (state.type === 'NOR') res = !(a || b);
                if (state.type === 'XOR') res = a !== b;

                const isActive = state.inputA === a && (state.type === 'NOT' || state.inputB === b);

                return (
                  <tr key={idx} className={`border-b border-slate-700 ${isActive ? 'bg-blue-900/30' : 'bg-slate-800'}`}>
                    <td className="px-6 py-4 font-mono">{row[0]}</td>
                    {state.type !== 'NOT' && <td className="px-6 py-4 font-mono">{row[1]}</td>}
                    <td className="px-6 py-4 font-mono font-bold text-white">{res ? 1 : 0}</td>
                    <td className="px-6 py-4">
                      {isActive && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogicGateSim;
