
import React, { useState, useEffect } from 'react';
import { ShoppingCart, CreditCard, Lock, Server, ShieldCheck, ArrowRight, Globe, Check } from 'lucide-react';

const ECommerceSim: React.FC = () => {
  const [step, setStep] = useState(0);
  const [encrypted, setEncrypted] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const reset = () => { setStep(0); setEncrypted(false); };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          Secure E-Commerce (Unit 10)
        </h2>
        <button 
          onClick={reset}
          className="text-sm text-slate-400 hover:text-white underline"
        >
          Restart Transaction
        </button>
      </div>

      <div className="relative h-[400px] bg-slate-900 rounded-xl border border-slate-700 p-8 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Connection Line */}
        <div className="absolute top-1/2 left-20 right-20 h-1 bg-slate-700 -z-0"></div>

        {/* Steps Visualization */}
        <div className="flex justify-between w-full relative z-10">
          
          {/* Client */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${step >= 0 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="w-20 h-20 bg-slate-800 border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/50">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-xs font-bold text-blue-300 uppercase">Customer Browser</span>
          </div>

          {/* Web Server */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="w-20 h-20 bg-slate-800 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-900/50">
              <Server className="w-8 h-8 text-purple-400" />
            </div>
            <span className="text-xs font-bold text-purple-300 uppercase">Merchant Server</span>
          </div>

          {/* Payment Gateway */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="w-20 h-20 bg-slate-800 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="text-xs font-bold text-emerald-300 uppercase">Payment Gateway</span>
          </div>

        </div>

        {/* Moving Packet */}
        <div 
          className={`absolute top-[calc(50%-24px)] transition-all duration-1000 ease-in-out flex flex-col items-center`}
          style={{ 
            left: step === 0 ? '10%' : step === 1 ? '25%' : step === 2 ? '50%' : step === 3 ? '75%' : '90%',
            opacity: step === 4 ? 0 : 1
          }}
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-xl ${encrypted ? 'bg-green-600' : 'bg-red-500'}`}>
            {encrypted ? <Lock className="w-6 h-6 text-white" /> : <CreditCard className="w-6 h-6 text-white" />}
          </div>
          <span className={`text-[10px] mt-2 font-bold px-2 py-1 rounded ${encrypted ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
            {encrypted ? "HTTPS Encrypted" : "Plain Text"}
          </span>
        </div>

        {/* Success Message */}
        {step === 4 && (
          <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-50 animate-in zoom-in">
            <div className="bg-slate-800 p-8 rounded-2xl border border-green-500 text-center shadow-2xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Transaction Successful!</h3>
              <p className="text-slate-400">Secure payment verified via Gateway.</p>
              <button onClick={reset} className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
                New Transaction
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Control Panel */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
          <h4 className="text-slate-300 font-bold mb-4">Transaction Flow</h4>
          <div className="space-y-4">
            <div className={`flex items-center gap-3 p-2 rounded-lg ${step === 0 ? 'bg-blue-900/30 border border-blue-500/30' : 'opacity-50'}`}>
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">1</div>
              <span className="text-sm text-slate-300">User enters Credit Card info</span>
            </div>
            <div className={`flex items-center gap-3 p-2 rounded-lg ${step === 1 ? 'bg-purple-900/30 border border-purple-500/30' : 'opacity-50'}`}>
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">2</div>
              <span className="text-sm text-slate-300">Browser Handshake (SSL/TLS)</span>
            </div>
            <div className={`flex items-center gap-3 p-2 rounded-lg ${step >= 2 ? 'bg-emerald-900/30 border border-emerald-500/30' : 'opacity-50'}`}>
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">3</div>
              <span className="text-sm text-slate-300">Encrypted Data sent to Gateway</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col justify-center items-center text-center">
          <p className="text-slate-400 text-sm mb-6 max-w-xs">
            {step === 0 && "Start the transaction. Ensure the connection is secure before sending data!"}
            {step === 1 && "The browser and server are establishing a secure connection (Handshake)."}
            {step === 2 && encrypted && "Data is now encrypted using the Public Key. It's safe to travel."}
            {step === 2 && !encrypted && "WARNING! Sending plain text is dangerous. Hackers can intercept it."}
            {step === 3 && "The Payment Gateway decrypts the data using its Private Key to process the charge."}
          </p>

          <div className="flex gap-4">
            {step === 1 && (
              <button 
                onClick={() => { setEncrypted(true); nextStep(); }}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> Encrypt & Send
              </button>
            )}
            
            {step !== 1 && step < 4 && (
              <button 
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 flex items-center gap-2"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECommerceSim;
