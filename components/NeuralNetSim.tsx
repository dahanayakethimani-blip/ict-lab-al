import React, { useState, useEffect } from 'react';
import { BrainCircuit, Play, RotateCcw, Zap } from 'lucide-react';

const NeuralNetSim: React.FC = () => {
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [accuracy, setAccuracy] = useState(0.5);
  
  // Weights (visual thickness)
  const [weights, setWeights] = useState({
    w1: 1, w2: 1, w3: 1, w4: 1, w5: 1, w6: 1
  });

  const runTrainingStep = () => {
    setEpoch(prev => prev + 1);
    
    // Simulate learning (adjusting weights randomly towards a "solution")
    setWeights(prev => ({
      w1: Math.min(4, Math.max(1, prev.w1 + (Math.random() - 0.4))),
      w2: Math.min(4, Math.max(1, prev.w2 + (Math.random() - 0.4))),
      w3: Math.min(4, Math.max(1, prev.w3 + (Math.random() - 0.4))),
      w4: Math.min(4, Math.max(1, prev.w4 + (Math.random() - 0.4))),
      w5: Math.min(4, Math.max(1, prev.w5 + (Math.random() - 0.4))),
      w6: Math.min(4, Math.max(1, prev.w6 + (Math.random() - 0.4))),
    }));

    // Simulate accuracy improving logarithmically
    setAccuracy(prev => Math.min(0.99, prev + (1 - prev) * 0.1));
  };

  useEffect(() => {
    let interval: any;
    if (isTraining && epoch < 100) {
      interval = setInterval(runTrainingStep, 100);
    } else if (epoch >= 100) {
      setIsTraining(false);
    }
    return () => clearInterval(interval);
  }, [isTraining, epoch]);

  const reset = () => {
    setEpoch(0);
    setAccuracy(0.5);
    setWeights({ w1: 1, w2: 1, w3: 1, w4: 1, w5: 1, w6: 1 });
    setIsTraining(false);
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-6 shrink-0 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-fuchsia-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            Neural Network (Unit 13.1)
          </h2>
          <p className="text-slate-400 text-sm mt-1">Simulating a simple AI learning an XOR pattern</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 text-center">
              <div className="text-xs text-slate-500 uppercase font-bold">Epoch</div>
              <div className="text-xl font-mono text-white">{epoch}</div>
           </div>
           <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 text-center">
              <div className="text-xs text-slate-500 uppercase font-bold">Accuracy</div>
              <div className="text-xl font-mono text-fuchsia-400">{(accuracy * 100).toFixed(1)}%</div>
           </div>
           <button 
             onClick={() => setIsTraining(!isTraining)}
             disabled={epoch >= 100}
             className="bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
           >
             <Play className="w-4 h-4" /> {isTraining ? 'Training...' : 'Train AI'}
           </button>
           <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg">
             <RotateCcw className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden flex items-center justify-center">
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Connections Layer 1 */}
          <line x1="20%" y1="30%" x2="50%" y2="20%" stroke="#a21caf" strokeWidth={weights.w1} className="transition-all duration-300" opacity="0.6" />
          <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#a21caf" strokeWidth={weights.w2} className="transition-all duration-300" opacity="0.6" />
          <line x1="20%" y1="70%" x2="50%" y2="20%" stroke="#a21caf" strokeWidth={weights.w3} className="transition-all duration-300" opacity="0.6" />
          <line x1="20%" y1="70%" x2="50%" y2="50%" stroke="#a21caf" strokeWidth={weights.w4} className="transition-all duration-300" opacity="0.6" />
          
          {/* Connections Layer 2 */}
          <line x1="50%" y1="20%" x2="80%" y2="50%" stroke="#e879f9" strokeWidth={weights.w5} className="transition-all duration-300" opacity="0.6" />
          <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#e879f9" strokeWidth={weights.w6} className="transition-all duration-300" opacity="0.6" />
        </svg>

        <div className="flex justify-between w-[80%] z-10">
          {/* Input Layer */}
          <div className="flex flex-col gap-24">
             <div className="w-16 h-16 bg-slate-800 border-2 border-slate-500 rounded-full flex items-center justify-center shadow-xl">
               <span className="font-bold text-slate-300">In 1</span>
             </div>
             <div className="w-16 h-16 bg-slate-800 border-2 border-slate-500 rounded-full flex items-center justify-center shadow-xl">
               <span className="font-bold text-slate-300">In 2</span>
             </div>
             <span className="text-center text-slate-500 text-xs mt-2 font-bold uppercase">Input Layer</span>
          </div>

          {/* Hidden Layer */}
          <div className="flex flex-col gap-8 -mt-12">
             <div className={`w-16 h-16 bg-slate-800 border-2 border-fuchsia-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(192,38,211,0.3)] transition-all ${isTraining ? 'scale-110' : ''}`}>
               <Zap className={`w-6 h-6 text-fuchsia-500 ${isTraining ? 'animate-pulse' : ''}`} />
             </div>
             <div className={`w-16 h-16 bg-slate-800 border-2 border-fuchsia-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(192,38,211,0.3)] transition-all ${isTraining ? 'scale-110 delay-100' : ''}`}>
               <Zap className={`w-6 h-6 text-fuchsia-500 ${isTraining ? 'animate-pulse' : ''}`} />
             </div>
             <span className="text-center text-slate-500 text-xs mt-2 font-bold uppercase">Hidden Layer (Neurons)</span>
          </div>

          {/* Output Layer */}
          <div className="flex flex-col justify-center">
             <div className={`w-20 h-20 bg-slate-800 border-4 ${accuracy > 0.9 ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]' : 'border-slate-500'} rounded-full flex items-center justify-center transition-all`}>
               <span className="font-bold text-white text-xl">{accuracy > 0.9 ? '1' : '?'}</span>
             </div>
             <span className="text-center text-slate-500 text-xs mt-4 font-bold uppercase">Output</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetSim;