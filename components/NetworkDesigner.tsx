
import React, { useState, useEffect } from 'react';
import { Network, Share2, Circle, Box, Zap, Send, Info, Trophy } from 'lucide-react';
import QuizOverlay from './QuizOverlay';
import { ModuleType } from '../types';

type Topology = 'BUS' | 'STAR' | 'RING';

const NetworkDesigner: React.FC = () => {
  const [topology, setTopology] = useState<Topology>('STAR');
  const [nodeCount, setNodeCount] = useState(4);
  const [animating, setAnimating] = useState(false);
  const [message, setMessage] = useState("");
  const [packetPos, setPacketPos] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    setAnimating(false);
    setPacketPos(null);
    setMessage("");
  }, [topology, nodeCount]);

  const simulatePacket = () => {
    if (animating) return;
    setAnimating(true);
    setPacketPos(0);

    if (topology === 'BUS') {
      setMessage("Broadcasting: Data travels along the single backbone cable...");
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setPacketPos(step);
        if (step > nodeCount) {
          clearInterval(interval);
          setAnimating(false);
          setMessage("Data reaches all nodes but only intended recipient processes it. Collision risk is high.");
        }
      }, 500);
    } 
    else if (topology === 'STAR') {
      setMessage("Sending to Hub/Switch...");
      setTimeout(() => {
        setMessage("Hub broadcasts to ALL nodes (or Switch sends to specific node).");
        setPacketPos(1); 
        setTimeout(() => {
          setPacketPos(2); 
          setAnimating(false);
        }, 1000);
      }, 1000);
    }
    else if (topology === 'RING') {
      setMessage("Token/Data travels in one direction...");
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setPacketPos(step);
        if (step >= nodeCount) {
          clearInterval(interval);
          setAnimating(false);
          setMessage("Data completes the loop. If a cable breaks, the whole network fails.");
        }
      }, 600);
    }
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.NETWORK_LAB} onClose={() => setShowQuiz(false)} />}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          Network Topology Lab (Unit 6)
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowQuiz(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-1.5 rounded-lg font-bold shadow-lg text-sm mr-4"
          >
            <Trophy className="w-4 h-4" /> Quiz
          </button>
          <button 
            onClick={() => setTopology('BUS')}
            className={`px-3 py-1 rounded text-sm font-bold transition-all ${topology === 'BUS' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Bus
          </button>
          <button 
            onClick={() => setTopology('STAR')}
            className={`px-3 py-1 rounded text-sm font-bold transition-all ${topology === 'STAR' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Star
          </button>
          <button 
            onClick={() => setTopology('RING')}
            className={`px-3 py-1 rounded text-sm font-bold transition-all ${topology === 'RING' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Ring
          </button>
        </div>
      </div>

      <div className="relative h-[400px] bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex items-center justify-center p-8">
        <div className="absolute top-4 left-4 z-10 bg-slate-800/80 backdrop-blur p-3 rounded-lg border border-slate-600 max-w-md">
          <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
            <Info className="w-4 h-4" /> {topology} Topology
          </div>
          <p className="text-xs text-slate-300">
            {topology === 'BUS' && "Nodes connect to a common backbone. Terminators at ends prevent signal bounce. High collision risk."}
            {topology === 'STAR' && "All nodes connect to a central device (Hub/Switch). Easy to troubleshoot. If central device fails, network fails."}
            {topology === 'RING' && "Each node connects to two others. Data travels in one direction. No collisions, but one break kills the network."}
          </p>
        </div>

        <div className="absolute bottom-4 right-4 z-10">
          <button 
            onClick={simulatePacket}
            disabled={animating}
            className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-all"
          >
            <Send className="w-4 h-4" /> Simulate Packet
          </button>
        </div>

        <div className="w-full h-full relative flex items-center justify-center">
          {topology === 'BUS' && (
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <div className="w-[80%] h-4 bg-blue-600 rounded-full relative shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center">
                <div className="absolute -left-2 w-4 h-6 bg-red-500 rounded-sm" title="Terminator"></div>
                <div className="absolute -right-2 w-4 h-6 bg-red-500 rounded-sm" title="Terminator"></div>
                
                {animating && (
                  <div 
                    className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] z-20 transition-all duration-500 ease-linear"
                    style={{ left: `${(packetPos! / (nodeCount + 1)) * 100}%` }}
                  />
                )}
              </div>
              
              <div className="w-[80%] flex justify-between px-4">
                {Array.from({ length: nodeCount }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-0 relative">
                    <div className="w-1 h-8 bg-slate-500"></div>
                    <div className={`w-12 h-12 bg-slate-700 rounded border-2 ${animating && packetPos === i + 1 ? 'border-yellow-400 bg-slate-600' : 'border-slate-500'} flex items-center justify-center relative z-10`}>
                      <Share2 className="w-6 h-6 text-slate-300" />
                    </div>
                    <span className="text-xs text-slate-500 mt-2">Node {i+1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {topology === 'STAR' && (
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              <div className={`w-20 h-20 bg-blue-600 rounded-lg flex flex-col items-center justify-center z-20 shadow-xl border-2 ${packetPos === 1 ? 'border-yellow-400 shadow-yellow-500/50' : 'border-blue-400'}`}>
                <Box className="w-8 h-8 text-white" />
                <span className="text-[10px] text-blue-100 font-bold">HUB</span>
              </div>

              {Array.from({ length: nodeCount }).map((_, i) => {
                const angle = (i * (360 / nodeCount)) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <React.Fragment key={i}>
                    <div 
                      className="absolute top-1/2 left-1/2 h-1 bg-slate-600 origin-left z-0"
                      style={{ 
                        width: '120px',
                        transform: `rotate(${i * (360 / nodeCount)}deg)` 
                      }}
                    >
                      {animating && packetPos === 2 && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
                      )}
                    </div>
                    <div 
                      className={`absolute w-12 h-12 bg-slate-700 rounded-full border-2 ${animating && packetPos === 2 ? 'border-yellow-400 bg-slate-600' : 'border-slate-500'} flex items-center justify-center z-10`}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      <Share2 className="w-5 h-5 text-slate-300" />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {topology === 'RING' && (
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-600 m-8"></div>
              
              {animating && (
                <div 
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] z-20"
                  style={{ 
                    top: '50%', left: '50%',
                    transform: `rotate(${(packetPos! * (360 / nodeCount)) - 90}deg) translate(134px) rotate(-${(packetPos! * (360 / nodeCount)) - 90}deg)`,
                    transition: 'transform 0.5s linear'
                  }}
                />
              )}

              {Array.from({ length: nodeCount }).map((_, i) => {
                const angle = (i * (360 / nodeCount)) - 90;
                const radius = 134;
                const x = Math.cos(angle * (Math.PI / 180)) * radius;
                const y = Math.sin(angle * (Math.PI / 180)) * radius;

                return (
                  <div 
                    key={i}
                    className={`absolute w-14 h-14 bg-slate-700 rounded-full border-2 ${animating && packetPos === i ? 'border-yellow-400 bg-slate-600' : 'border-slate-500'} flex items-center justify-center z-10`}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <Circle className="w-6 h-6 text-slate-300" />
                    <span className="absolute -bottom-5 text-xs text-slate-500">PC {i+1}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 h-12 bg-black/20 rounded-lg flex items-center px-4 border border-slate-700/50">
        {message ? (
          <div className="flex items-center gap-2 text-yellow-300 animate-pulse">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-mono">{message}</span>
          </div>
        ) : (
          <span className="text-slate-500 text-sm font-mono">System Ready. Select a topology and simulate.</span>
        )}
      </div>
    </div>
  );
};

export default NetworkDesigner;
