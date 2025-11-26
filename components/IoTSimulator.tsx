
import React, { useState, useEffect } from 'react';
import { Cpu, Play, Power, RefreshCw, Thermometer, Sun, Trophy } from 'lucide-react';
import QuizOverlay from './QuizOverlay';
import { ModuleType } from '../types';

const IoTSimulator: React.FC = () => {
  const [code, setCode] = useState(`// Grade 13: IoT Smart Home
// Pin A0: Temp Sensor
// Pin A1: Light Sensor (LDR)
// Pin 13: Fan/AC
// Pin 12: Night Light

void loop() {
  int temp = analogRead(A0);
  int light = analogRead(A1);

  // Temperature Control
  if (temp > 30) {
    digitalWrite(13, HIGH); // Turn ON Fan
  } else {
    digitalWrite(13, LOW);
  }

  // Light Control
  if (light < 500) {
    digitalWrite(12, HIGH); // Turn ON Lights
  } else {
    digitalWrite(12, LOW);
  }
  
  delay(500);
}`);

  const [ledState, setLedState] = useState(false); // Pin 13 (Fan)
  const [lightState, setLightState] = useState(false); // Pin 12 (Light)
  const [isSimulating, setIsSimulating] = useState(false);
  const [tempVal, setTempVal] = useState(25); // Celsius
  const [ldrVal, setLdrVal] = useState(800); // Lux/Raw value
  const [logs, setLogs] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    let interval: any;
    
    if (isSimulating) {
      interval = setInterval(() => {
        // Simple logic simulation based on the text in the code editor
        // In a real app, use a JS interpreter for C++
        const lines = code.split('\n');
        let newLedState = ledState;
        let newLightState = lightState;
        let logMsg = "";

        // Check Temperature Logic
        if (code.includes('if (temp >')) {
           const threshold = parseInt(code.match(/if \(temp > (\d+)\)/)?.[1] || "30");
           if (tempVal > threshold) newLedState = true;
           else newLedState = false;
        }

        // Check Light Logic
        if (code.includes('if (light <')) {
           const threshold = parseInt(code.match(/if \(light < (\d+)\)/)?.[1] || "500");
           if (ldrVal < threshold) newLightState = true;
           else newLightState = false;
        }

        if (newLedState !== ledState) {
            logMsg = newLedState ? "FAN (Pin 13) ON" : "FAN (Pin 13) OFF";
        }
        if (newLightState !== lightState) {
            logMsg = newLightState ? "LIGHT (Pin 12) ON" : "LIGHT (Pin 12) OFF";
        }

        setLedState(newLedState);
        setLightState(newLightState);
        
        if (logMsg) {
            setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${logMsg}`]);
        }

      }, 500);
    } else {
        setLedState(false);
        setLightState(false);
        setLogs([]);
    }

    return () => clearInterval(interval);
  }, [isSimulating, code, tempVal, ldrVal, ledState, lightState]);

  return (
    <div className="p-4 md:p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl min-h-[calc(100vh-100px)] flex flex-col relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.IOT_SIM} onClose={() => setShowQuiz(false)} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 shrink-0 gap-4">
        <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
            </div>
            IoT & Embedded Systems
            </h2>
            <p className="text-xs text-slate-400 mt-1">Simulate Microcontroller inputs (Sensors) and outputs (Actuators)</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
            <button 
                onClick={() => setShowQuiz(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all"
            >
                <Trophy className="w-4 h-4" />
                Quiz
            </button>
            <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex-1 md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all shadow-lg ${
                isSimulating 
                    ? 'bg-red-600 hover:bg-red-500 text-white' 
                    : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
            >
            {isSimulating ? <Power className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isSimulating ? "Stop Simulation" : "Upload & Run"}
            </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
        
        {/* Code Editor */}
        <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border border-slate-700 overflow-hidden min-h-[300px]">
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Sketch (C++)</span>
            <button onClick={() => setCode(code)} className="text-slate-500 hover:text-white"><RefreshCw className="w-3 h-3" /></button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-slate-900 p-4 text-teal-100 font-mono text-sm resize-none focus:outline-none leading-relaxed min-h-[200px]"
            spellCheck={false}
          />
          <div className="h-32 bg-black p-4 border-t border-slate-700 font-mono text-xs text-slate-400 overflow-y-auto">
            <div className="text-slate-600 mb-1">Serial Monitor</div>
            {logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>

        {/* Visual Board & Sensors */}
        <div className="flex-1 flex flex-col gap-4 min-h-[400px]">
            {/* Environment Controls (Sensors) */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                <h4 className="text-slate-300 font-bold mb-4 text-sm uppercase">Environment Sensors (Inputs)</h4>
                
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span className="flex items-center gap-1"><Thermometer className="w-4 h-4 text-rose-500" /> Temperature (A0)</span>
                            <span className="font-mono text-white">{tempVal}°C</span>
                        </div>
                        <input 
                            type="range" min="0" max="50" 
                            value={tempVal} onChange={(e) => setTempVal(parseInt(e.target.value))}
                            className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span className="flex items-center gap-1"><Sun className="w-4 h-4 text-yellow-500" /> Light Intensity LDR (A1)</span>
                            <span className="font-mono text-white">{ldrVal} raw</span>
                        </div>
                        <input 
                            type="range" min="0" max="1023" 
                            value={ldrVal} onChange={(e) => setLdrVal(parseInt(e.target.value))}
                            className="w-full accent-yellow-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Microcontroller Visual */}
            <div className="flex-1 bg-teal-900/20 rounded-xl border border-teal-500/30 p-8 flex items-center justify-center relative overflow-hidden min-h-[300px]">
                
                {/* Wires */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50">
                    <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="2" />
                    <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#eab308" strokeWidth="2" />
                </svg>

                <div className="relative w-[240px] h-[320px] bg-teal-700 rounded-md shadow-2xl border-b-8 border-r-8 border-teal-900 flex flex-col p-4 z-10 scale-90 sm:scale-100">
                    <div className="absolute top-2 left-2 text-white/80 font-bold font-mono text-xs tracking-widest">UNO R3</div>
                    
                    {/* Chip */}
                    <div className="w-32 h-10 bg-slate-900 absolute bottom-12 left-1/2 -translate-x-1/2 rounded flex items-center justify-center border border-slate-700">
                        <span className="text-[8px] text-slate-500">ATMEGA328P</span>
                    </div>

                    {/* Output LED 1 (Pin 13) */}
                    <div className="absolute top-8 right-2 flex items-center gap-2">
                        <span className="text-[8px] text-white">13</span>
                        <div className={`w-4 h-4 rounded-full border border-black transition-all ${ledState ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-red-900'}`}></div>
                    </div>

                    {/* Output LED 2 (Pin 12) */}
                    <div className="absolute top-14 right-2 flex items-center gap-2">
                        <span className="text-[8px] text-white">12</span>
                        <div className={`w-4 h-4 rounded-full border border-black transition-all ${lightState ? 'bg-yellow-400 shadow-[0_0_15px_yellow]' : 'bg-yellow-900'}`}></div>
                    </div>

                    {/* Power LED */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <span className="text-[8px] text-white">ON</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,1)]"></div>
                    </div>
                </div>

                {/* Actuator Labels */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-8 hidden sm:block">
                     <div className={`text-xs font-bold transition-all ${ledState ? 'text-red-400 scale-110' : 'text-slate-600'}`}>
                        {ledState ? "FAN SPINNING" : "FAN STOPPED"}
                     </div>
                     <div className={`text-xs font-bold transition-all ${lightState ? 'text-yellow-400 scale-110' : 'text-slate-600'}`}>
                        {lightState ? "LIGHTS ON" : "LIGHTS OFF"}
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IoTSimulator;
