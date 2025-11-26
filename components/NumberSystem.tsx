
import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Trophy } from 'lucide-react';
import QuizOverlay from './QuizOverlay';
import { ModuleType } from '../types';

const NumberSystem: React.FC = () => {
  const [dec, setDec] = useState<string>('0');
  const [bin, setBin] = useState<string>('0');
  const [oct, setOct] = useState<string>('0');
  const [hex, setHex] = useState<string>('0');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleConvert = (value: string, fromBase: number) => {
    let decimalValue = 0;
    
    try {
      if (value === '') {
        setDec(''); setBin(''); setOct(''); setHex('');
        return;
      }
      
      decimalValue = parseInt(value, fromBase);
      
      if (isNaN(decimalValue)) {
        return; // Invalid input
      }

      setDec(decimalValue.toString(10));
      setBin(decimalValue.toString(2));
      setOct(decimalValue.toString(8));
      setHex(decimalValue.toString(16).toUpperCase());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.NUMBER_SYSTEMS} onClose={() => setShowQuiz(false)} />}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            Data Representation
          </h2>
          <div className="text-slate-400 text-sm font-mono mt-1">
            Unit 3.1
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Decimal (Base 10)</label>
          <input
            type="number"
            value={dec}
            onChange={(e) => handleConvert(e.target.value, 10)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            placeholder="0-9"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Binary (Base 2)</label>
          <input
            type="text"
            value={bin}
            onChange={(e) => {
              if (/^[01]*$/.test(e.target.value)) handleConvert(e.target.value, 2);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            placeholder="0-1"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Octal (Base 8)</label>
          <input
            type="text"
            value={oct}
            onChange={(e) => {
              if (/^[0-7]*$/.test(e.target.value)) handleConvert(e.target.value, 8);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            placeholder="0-7"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Hexadecimal (Base 16)</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => {
              if (/^[0-9A-Fa-f]*$/.test(e.target.value)) handleConvert(e.target.value, 16);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            placeholder="0-9, A-F"
          />
        </div>
      </div>

      <div className="mt-8 bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          Conversion Insight
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Computers use the <span className="text-white font-bold">Binary</span> system (0s and 1s) because their internal circuits act like switches (OFF/ON). 
          <span className="text-white font-bold ml-1">Hexadecimal</span> is widely used by programmers because it's more compact than binary; one Hex digit represents exactly 4 binary bits (a nibble).
        </p>
      </div>
    </div>
  );
};

export default NumberSystem;
