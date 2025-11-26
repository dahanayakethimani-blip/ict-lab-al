
import React, { useState, useEffect } from 'react';
import { Play, Plus, Trash2, ArrowDown, Code, RotateCcw } from 'lucide-react';

type BlockType = 'START' | 'INPUT' | 'PROCESS' | 'DECISION' | 'OUTPUT' | 'END';

interface Block {
  id: string;
  type: BlockType;
  content: string;
  yesBranch?: Block[]; // Simplified for demo
  noBranch?: Block[]; // Simplified for demo
}

const FlowchartLab: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'START', content: 'Start' },
    { id: '2', type: 'INPUT', content: 'Read Marks' },
    { id: '3', type: 'DECISION', content: 'Marks > 50?' },
    { id: '4', type: 'OUTPUT', content: 'Print "Pass"' },
    { id: '5', type: 'END', content: 'End' },
  ]);
  
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Auto-generate Python code when blocks change
  useEffect(() => {
    let code = "# Auto-generated Python Code\n\n";
    let indent = "";

    blocks.forEach((block, index) => {
      switch (block.type) {
        case 'INPUT':
          // Guessing variable name from content
          const varName = block.content.split(' ')[1]?.toLowerCase() || 'val';
          code += `${indent}${varName} = int(input("${block.content}: "))\n`;
          break;
        case 'PROCESS':
          code += `${indent}${block.content.toLowerCase().replace('calculate', '').trim()}\n`;
          break;
        case 'DECISION':
          // This is a simplified linear representation for the demo
          // In a real full app, we'd need a tree structure for blocks
          code += `${indent}if ${block.content.replace('?', '')}:\n`;
          indent += "    ";
          break;
        case 'OUTPUT':
          code += `${indent}print("${block.content.replace('Print', '').replace(/"/g, '').trim()}")\n`;
          // Crude reset of indent for demo purposes if next is END
          if (blocks[index + 1]?.type === 'END') indent = ""; 
          break;
      }
    });

    setGeneratedCode(code);
  }, [blocks]);

  const runSimulation = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    
    // Mock execution simulation
    let logs: string[] = [];
    setTimeout(() => logs.push("> Starting Program..."), 500);
    setTimeout(() => logs.push("> Input Marks: 75"), 1500);
    setTimeout(() => logs.push("> Checking Condition: 75 > 50 -> TRUE"), 2500);
    setTimeout(() => logs.push("> Output: Pass"), 3500);
    setTimeout(() => {
      logs.push("> Program Ended.");
      setConsoleOutput([...logs]);
      setIsRunning(false);
    }, 4500);

    // Stream logs for effect
    let i = 0;
    const interval = setInterval(() => {
      if (i < 5) {
        setConsoleOutput(prev => {
            // Look ahead in logs array based on time - simplified for UI feel
            if(i===0) return ["> Starting Program..."];
            if(i===1) return ["> Starting Program...", "> Input Marks: 75"];
            if(i===2) return ["> Starting Program...", "> Input Marks: 75", "> Checking: 75 > 50 is True"];
            if(i===3) return ["> Starting Program...", "> Input Marks: 75", "> Checking: 75 > 50 is True", "> Output: Pass"];
            return prev;
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getBlockColor = (type: BlockType) => {
    switch (type) {
      case 'START': case 'END': return 'bg-rose-500 border-rose-400'; // Oval-ish
      case 'INPUT': case 'OUTPUT': return 'bg-blue-600 border-blue-400'; // Parallelogram
      case 'PROCESS': return 'bg-yellow-600 border-yellow-400'; // Rectangle
      case 'DECISION': return 'bg-emerald-600 border-emerald-400'; // Diamond
      default: return 'bg-slate-600';
    }
  };

  const getShapeClass = (type: BlockType) => {
    switch (type) {
      case 'START': case 'END': return 'rounded-[2rem]';
      case 'INPUT': case 'OUTPUT': return '-skew-x-6 transform ml-2';
      case 'DECISION': return 'rotate-45 scale-90 my-2';
      default: return 'rounded-md';
    }
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-white" />
          </div>
          Algorithm Lab (Unit 8)
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={runSimulation}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-900/20"
          >
            <Play className="w-4 h-4" /> Run Logic
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        
        {/* Visual Flowchart Editor */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-8 overflow-y-auto relative">
          <div className="absolute top-4 right-4 flex gap-2">
             <div className="bg-slate-800 border border-slate-600 px-3 py-1 rounded text-xs text-slate-400">Drag & Drop (Simulated)</div>
          </div>

          <div className="flex flex-col items-center space-y-2 max-w-md mx-auto">
            {blocks.map((block, idx) => (
              <React.Fragment key={block.id}>
                <div className="group relative">
                  <div 
                    className={`
                      w-40 h-14 flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 transition-all cursor-pointer hover:scale-105
                      ${getBlockColor(block.type)}
                      ${getShapeClass(block.type)}
                    `}
                  >
                    <span className={block.type === 'INPUT' || block.type === 'OUTPUT' ? 'skew-x-6 inline-block' : block.type === 'DECISION' ? '-rotate-45 inline-block' : ''}>
                      {block.content}
                    </span>
                  </div>
                  
                  {/* Hover Controls */}
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                    {block.type !== 'START' && block.type !== 'END' && (
                        <button className="p-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                  </div>
                </div>
                
                {idx < blocks.length - 1 && (
                  <ArrowDown className="w-6 h-6 text-slate-600" />
                )}
              </React.Fragment>
            ))}
            
            <button className="mt-4 w-10 h-10 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500 transition-all">
                <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Generation & Output */}
        <div className="flex flex-col gap-6">
          
          {/* Generated Code */}
          <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4" /> Generated Python
              </span>
            </div>
            <div className="p-4 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre">
              {generatedCode}
            </div>
          </div>

          {/* Console */}
          <div className="h-48 bg-black rounded-xl border border-slate-700 p-4 font-mono text-sm overflow-y-auto">
            <div className="text-slate-500 mb-2"># Terminal Output</div>
            {consoleOutput.map((line, i) => (
              <div key={i} className="text-green-400 animate-in fade-in slide-in-from-left-2">
                {line}
              </div>
            ))}
            {isRunning && <div className="w-2 h-4 bg-green-500 animate-pulse inline-block ml-1"></div>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FlowchartLab;
