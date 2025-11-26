
import React, { useState } from 'react';
import { Database, ArrowRight, Check, Split, AlertTriangle } from 'lucide-react';

const NormalizationLab: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          Normalization Workshop (Unit 7)
        </h2>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s as any)}
              className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                step === s ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'
              }`}
            >
              {s === 0 ? 'UNF' : `${s}NF`}
            </button>
          ))}
        </div>
      </div>

      {/* Educational Context */}
      <div className="mb-6 bg-indigo-900/20 border-l-4 border-indigo-500 p-4 rounded-r-lg">
        <h3 className="text-indigo-300 font-bold mb-1">
          {step === 0 && "Unnormalized Form (UNF)"}
          {step === 1 && "First Normal Form (1NF)"}
          {step === 2 && "Second Normal Form (2NF)"}
          {step === 3 && "Third Normal Form (3NF)"}
        </h3>
        <p className="text-sm text-slate-300">
          {step === 0 && "Data contains repeating groups. Multiple values in 'Subject' and 'Marks' cells."}
          {step === 1 && "Eliminate Repeating Groups. Every cell must hold a single atomic value. Identify the Primary Key."}
          {step === 2 && "Eliminate Partial Dependencies. Non-key attributes must depend on the WHOLE primary key."}
          {step === 3 && "Eliminate Transitive Dependencies. Non-key attributes must not depend on other non-key attributes."}
        </p>
      </div>

      {/* Visualization Area */}
      <div className="space-y-8 animate-in slide-in-from-right duration-500">
        
        {/* 0NF View */}
        {step === 0 && (
          <div className="bg-white text-slate-900 rounded-lg overflow-hidden border-4 border-red-400/50">
            <table className="w-full text-sm">
              <thead className="bg-slate-200 font-bold">
                <tr>
                  <th className="p-3 border">Student_ID</th>
                  <th className="p-3 border">Student_Name</th>
                  <th className="p-3 border">Subjects</th>
                  <th className="p-3 border">Marks</th>
                  <th className="p-3 border">Teacher</th>
                  <th className="p-3 border">Teacher_Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">S001</td>
                  <td className="p-3 border">Amara</td>
                  <td className="p-3 border bg-red-100">ICT, Math</td>
                  <td className="p-3 border bg-red-100">85, 70</td>
                  <td className="p-3 border bg-red-100">Mr. Perera, Mrs. Silva</td>
                  <td className="p-3 border bg-red-100">077-111, 071-222</td>
                </tr>
                <tr>
                  <td className="p-3 border">S002</td>
                  <td className="p-3 border">Nimal</td>
                  <td className="p-3 border bg-red-100">ICT</td>
                  <td className="p-3 border bg-red-100">60</td>
                  <td className="p-3 border bg-red-100">Mr. Perera</td>
                  <td className="p-3 border bg-red-100">077-111</td>
                </tr>
              </tbody>
            </table>
            <div className="p-4 bg-red-50 text-red-800 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Repeating groups detected! Click 1NF to atomize data.
            </div>
          </div>
        )}

        {/* 1NF View */}
        {step === 1 && (
          <div className="bg-white text-slate-900 rounded-lg overflow-hidden border-4 border-orange-400/50">
            <table className="w-full text-sm">
              <thead className="bg-slate-200 font-bold">
                <tr>
                  <th className="p-3 border bg-yellow-100">Student_ID (PK)</th>
                  <th className="p-3 border">Student_Name</th>
                  <th className="p-3 border bg-yellow-100">Subject_ID (PK)</th>
                  <th className="p-3 border">Marks</th>
                  <th className="p-3 border">Teacher</th>
                  <th className="p-3 border">Teacher_Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border">S001</td><td className="p-2 border">Amara</td><td className="p-2 border">SB01</td><td className="p-2 border">85</td><td className="p-2 border">Mr. Perera</td><td className="p-2 border">077-111</td></tr>
                <tr><td className="p-2 border">S001</td><td className="p-2 border">Amara</td><td className="p-2 border">SB02</td><td className="p-2 border">70</td><td className="p-2 border">Mrs. Silva</td><td className="p-2 border">071-222</td></tr>
                <tr><td className="p-2 border">S002</td><td className="p-2 border">Nimal</td><td className="p-2 border">SB01</td><td className="p-2 border">60</td><td className="p-2 border">Mr. Perera</td><td className="p-2 border">077-111</td></tr>
              </tbody>
            </table>
            <div className="p-4 bg-orange-50 text-orange-800 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Issues: 'Student_Name' depends only on 'Student_ID', not 'Subject_ID'. This is a Partial Dependency.
            </div>
          </div>
        )}

        {/* 2NF View */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white text-slate-900 rounded-lg overflow-hidden border-2 border-blue-400">
              <div className="bg-blue-100 p-2 text-xs font-bold uppercase text-center">Table: Students</div>
              <table className="w-full text-sm">
                <thead className="bg-slate-200"><tr><th className="p-2 border bg-yellow-100">Student_ID (PK)</th><th className="p-2 border">Student_Name</th></tr></thead>
                <tbody>
                  <tr><td className="p-2 border">S001</td><td className="p-2 border">Amara</td></tr>
                  <tr><td className="p-2 border">S002</td><td className="p-2 border">Nimal</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white text-slate-900 rounded-lg overflow-hidden border-2 border-blue-400">
              <div className="bg-blue-100 p-2 text-xs font-bold uppercase text-center">Table: Grades</div>
              <table className="w-full text-sm">
                <thead className="bg-slate-200">
                  <tr>
                    <th className="p-2 border bg-yellow-100">S_ID (PK)</th>
                    <th className="p-2 border bg-yellow-100">Sub_ID (PK)</th>
                    <th className="p-2 border">Marks</th>
                    <th className="p-2 border bg-red-100">Teacher</th>
                    <th className="p-2 border bg-red-100">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border">S001</td><td className="p-2 border">SB01</td><td className="p-2 border">85</td><td className="p-2 border">Mr. Perera</td><td className="p-2 border">077-111</td></tr>
                  <tr><td className="p-2 border">S001</td><td className="p-2 border">SB02</td><td className="p-2 border">70</td><td className="p-2 border">Mrs. Silva</td><td className="p-2 border">071-222</td></tr>
                </tbody>
              </table>
            </div>
            <div className="col-span-full p-4 bg-blue-50 text-blue-800 text-sm rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Issue: 'Teacher_Phone' depends on 'Teacher', not the Primary Key. This is a Transitive Dependency.
            </div>
          </div>
        )}

        {/* 3NF View */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white text-slate-900 rounded-lg overflow-hidden border-2 border-emerald-500">
              <div className="bg-emerald-100 p-2 text-xs font-bold uppercase text-center">Students</div>
              <table className="w-full text-xs">
                <thead className="bg-slate-200"><tr><th className="p-2 border">ID (PK)</th><th className="p-2 border">Name</th></tr></thead>
                <tbody>
                  <tr><td className="p-2 border">S001</td><td className="p-2 border">Amara</td></tr>
                  <tr><td className="p-2 border">S002</td><td className="p-2 border">Nimal</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white text-slate-900 rounded-lg overflow-hidden border-2 border-emerald-500">
              <div className="bg-emerald-100 p-2 text-xs font-bold uppercase text-center">Marks</div>
              <table className="w-full text-xs">
                <thead className="bg-slate-200"><tr><th className="p-2 border">S_ID (PK)</th><th className="p-2 border">Sub_ID (PK)</th><th className="p-2 border">Marks</th><th className="p-2 border">T_ID (FK)</th></tr></thead>
                <tbody>
                  <tr><td className="p-2 border">S001</td><td className="p-2 border">SB01</td><td className="p-2 border">85</td><td className="p-2 border">T01</td></tr>
                  <tr><td className="p-2 border">S001</td><td className="p-2 border">SB02</td><td className="p-2 border">70</td><td className="p-2 border">T02</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white text-slate-900 rounded-lg overflow-hidden border-2 border-emerald-500">
              <div className="bg-emerald-100 p-2 text-xs font-bold uppercase text-center">Teachers</div>
              <table className="w-full text-xs">
                <thead className="bg-slate-200"><tr><th className="p-2 border">ID (PK)</th><th className="p-2 border">Name</th><th className="p-2 border">Phone</th></tr></thead>
                <tbody>
                  <tr><td className="p-2 border">T01</td><td className="p-2 border">Perera</td><td className="p-2 border">077...</td></tr>
                  <tr><td className="p-2 border">T02</td><td className="p-2 border">Silva</td><td className="p-2 border">071...</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="col-span-full p-4 bg-emerald-50 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4" />
              Success! Database is now in 3rd Normal Form. All transitive dependencies removed.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NormalizationLab;
