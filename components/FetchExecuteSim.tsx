
import React, { useState, useEffect } from 'react';
import { ArrowRight, Database, Cpu, RotateCcw, Play, SkipForward, Trophy } from 'lucide-react';
import QuizOverlay from './QuizOverlay';
import { ModuleType } from '../types';

type Stage = 'IDLE' | 'FETCH_1' | 'FETCH_2' | 'FETCH_3' | 'DECODE' | 'EXECUTE_1' | 'EXECUTE_2';

interface Registers {
  PC: number;
  MAR: number;
  MDR: string | number;
  CIR: string;
  ACC: number;
}

const INITIAL_RAM: { [key: number]: string | number } = {
  0: "LOAD 10",
  1: "ADD 11",
  2: "SUB 12",
  3: "STORE 13",
  4: "HALT",
  10: 5,
  11: 3,
  12: 1,
  13: 0
};

const FetchExecuteSim: React.FC = () => {
  const [registers, setRegisters] = useState<Registers>({ PC: 0, MAR: 0, MDR: 0, CIR: "", ACC: 0 });
  const [ram, setRam] = useState(INITIAL_RAM);
  const [stage, setStage] = useState<Stage>('IDLE');
  const [description, setDescription] = useState("Ready to start. Click Step.");
  const [highlight, setHighlight] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const step = () => {
    switch (stage) {
      case 'IDLE':
        // Start Fetch: Copy PC to MAR
        if (ram[registers.PC] === "HALT") {
          setDescription("Program Halted.");
          return;
        }
        setStage('FETCH_1');
        setRegisters(prev => ({ ...prev, MAR: prev.PC }));
        setDescription("FETCH: Copy Program Counter (PC) to Memory Address Register (MAR).");
        setHighlight(['PC', 'MAR', 'BUS_ADDR']);
        break;

      case 'FETCH_1':
        // Fetch from RAM to MDR
        setStage('FETCH_2');
        setRegisters(prev => ({ ...prev, MDR: ram[prev.MAR] }));
        setDescription("FETCH: Fetch instruction from Memory at MAR address to Memory Data Register (MDR).");
        setHighlight(['RAM', 'MDR', 'BUS_DATA']);
        break;

      case 'FETCH_2':
        // Copy MDR to CIR
        setStage('FETCH_3');
        setRegisters(prev => ({ ...prev, CIR: registers.MDR.toString() }));
        setDescription("FETCH: Copy instruction from MDR to Current Instruction Register (CIR).");
        setHighlight(['MDR', 'CIR']);
        break;

      case 'FETCH_3':
        // Increment PC
        setStage('DECODE');
        setRegisters(prev => ({ ...prev, PC: prev.PC + 1 }));
        setDescription("FETCH: Increment Program Counter (PC) for next cycle.");
        setHighlight(['PC']);
        break;

      case 'DECODE':
        setStage('EXECUTE_1');
        const [op, operand] = registers.CIR.split(' ');
        setDescription(`DECODE: Decoding instruction '${op}'. Identifying operand address ${operand || ''}.`);
        setHighlight(['CIR', 'CU']);
        break;

      case 'EXECUTE_1':
        executeInstruction();
        break;
        
      case 'EXECUTE_2':
        setStage('IDLE');
        setDescription("Cycle complete. Ready for next instruction.");
        setHighlight([]);
        break;
    }
  };

  const executeInstruction = () => {
    const [op, valStr] = registers.CIR.split(' ');
    const addr = parseInt(valStr);

    switch (op) {
      case 'LOAD':
        setRegisters(prev => ({ ...prev, ACC: ram[addr] as number }));
        setDescription(`EXECUTE: Loading value ${ram[addr]} from address ${addr} into Accumulator (ACC).`);
        setHighlight(['RAM', 'ACC']);
        setStage('EXECUTE_2');
        break;
      case 'ADD':
        setRegisters(prev => ({ ...prev, ACC: prev.ACC + (ram[addr] as number) }));
        setDescription(`EXECUTE: ALU adds value at address ${addr} (${ram[addr]}) to ACC.`);
        setHighlight(['ALU', 'ACC']);
        setStage('EXECUTE_2');
        break;
      case 'SUB':
        setRegisters(prev => ({ ...prev, ACC: prev.ACC - (ram[addr] as number) }));
        setDescription(`EXECUTE: ALU subtracts value at address ${addr} (${ram[addr]}) from ACC.`);
        setHighlight(['ALU', 'ACC']);
        setStage('EXECUTE_2');
        break;
      case 'STORE':
        setRam(prev => ({ ...prev, [addr]: registers.ACC }));
        setDescription(`EXECUTE: Storing ACC value (${registers.ACC}) into memory address ${addr}.`);
        setHighlight(['ACC', 'RAM']);
        setStage('EXECUTE_2');
        break;
      case 'HALT':
        setDescription("EXECUTE: Stop program.");
        setStage('IDLE');
        setHighlight([]);
        break;
    }
  };

  const reset = () => {
    setRegisters({ PC: 0, MAR: 0, MDR: 0, CIR: "", ACC: 0 });
    setRam(INITIAL_RAM);
    setStage('IDLE');
    setDescription("Ready to start.");
    setHighlight([]);
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.FETCH_EXECUTE} onClose={() => setShowQuiz(false)} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            Fetch-Execute Cycle (Unit 2)
          </h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowQuiz(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all"
          >
            <Trophy className="w-4 h-4" /> Quiz
          </button>
          <button onClick={step} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold transition-colors">
            <SkipForward className="w-4 h-4" /> Step
          </button>
          <button onClick={reset} className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-2 rounded-lg font-medium transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CPU Visualization */}
        <div className="lg:col-span-8 relative bg-slate-900/50 p-8 rounded-xl border border-slate-700 min-h-[400px]">
          <h3 className="absolute top-4 left-4 text-slate-500 font-bold tracking-widest text-xs">CENTRAL PROCESSING UNIT</h3>
          
          {/* Buses */}
          <div className={`absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 transition-colors duration-300 ${highlight.includes('BUS_DATA') ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-800'}`} />
          <div className={`absolute top-1/3 left-0 w-full h-2 transition-colors duration-300 ${highlight.includes('BUS_ADDR') ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-800'}`} />

          <div className="grid grid-cols-2 gap-12 relative z-10">
            {/* Control Unit Group */}
            <div className="space-y-4">
              <div className="p-2 border-2 border-dashed border-slate-600 rounded-lg">
                <div className="text-center text-slate-500 text-xs mb-2">Control Unit</div>
                <RegisterBox name="PC" val={registers.PC} active={highlight.includes('PC')} />
                <div className="h-4"></div>
                <RegisterBox name="CIR" val={registers.CIR} active={highlight.includes('CIR')} />
              </div>
            </div>

            {/* Arithmetic Logic Unit Group */}
            <div className="space-y-4">
              <div className={`p-2 border-2 border-dashed ${highlight.includes('ALU') ? 'border-yellow-500 bg-yellow-900/20' : 'border-slate-600'} rounded-lg transition-colors duration-300`}>
                <div className="text-center text-slate-500 text-xs mb-2">ALU</div>
                <RegisterBox name="ACC" val={registers.ACC} active={highlight.includes('ACC')} />
              </div>
            </div>

            {/* Memory Interface Group */}
            <div className="col-span-2 flex justify-center gap-8">
              <RegisterBox name="MAR" val={registers.MAR} active={highlight.includes('MAR')} />
              <RegisterBox name="MDR" val={registers.MDR} active={highlight.includes('MDR')} />
            </div>
          </div>
        </div>

        {/* RAM Visualization */}
        <div className="lg:col-span-4 bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-slate-300 font-semibold">
            <Database className="w-4 h-4" /> Main Memory (RAM)
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-slate-700">
            {Object.entries(ram).map(([addr, val]) => (
              <div 
                key={addr} 
                className={`flex justify-between px-3 py-2 rounded font-mono text-sm transition-colors duration-300 ${
                  (highlight.includes('RAM') && (registers.MAR === parseInt(addr)))
                    ? 'bg-green-900/50 border border-green-500/50 text-white'
                    : registers.PC === parseInt(addr) 
                      ? 'bg-blue-900/30 border border-blue-500/30 text-blue-200'
                      : 'bg-slate-800 text-slate-400'
                }`}
              >
                <span className="opacity-50">{addr.padStart(2, '0')}</span>
                <span className="font-bold">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation Bar */}
      <div className="mt-6 bg-black/30 p-4 rounded-xl border-l-4 border-orange-500 flex items-start gap-3">
        <div className="bg-orange-500/20 p-2 rounded-full shrink-0">
          <Play className="w-4 h-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-orange-400 font-bold text-sm mb-1 uppercase tracking-wider">{stage.replace('_', ' ')} PHASE</h4>
          <p className="text-slate-200 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const RegisterBox = ({ name, val, active }: { name: string, val: string | number, active: boolean }) => (
  <div className={`p-3 rounded-lg border-2 transition-all duration-300 ${active ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105' : 'bg-slate-800 border-slate-600'}`}>
    <div className="text-xs text-slate-400 mb-1 font-bold tracking-wider">{name}</div>
    <div className="text-center text-white font-mono text-lg font-bold">{val}</div>
  </div>
);

export default FetchExecuteSim;
