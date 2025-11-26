
import React, { useState } from 'react';
import { Server, Play, Code, Database, Globe } from 'lucide-react';
import { runPhpCode } from '../services/geminiService';

const PHP_SNIPPETS = [
  {
    name: "Basic Variables",
    code: `<?php
  $name = "Kamal";
  $age = 18;
  
  echo "<h1>Student Profile</h1>";
  echo "<p>Name: " . $name . "</p>";
  echo "<p>Age: " . $age . "</p>";
  
  if ($age >= 18) {
    echo "<div style='color:green'>Status: Adult</div>";
  } else {
    echo "Status: Minor";
  }
?>`
  },
  {
    name: "Arrays & Loops",
    code: `<?php
  $marks = array(85, 92, 78, 64, 88);
  $total = 0;
  
  echo "<h3>Exam Results</h3>";
  echo "<ul>";
  
  foreach ($marks as $mark) {
    echo "<li>Mark: " . $mark . "</li>";
    $total += $mark;
  }
  
  echo "</ul>";
  echo "<p><strong>Average: " . ($total / count($marks)) . "</strong></p>";
?>`
  },
  {
    name: "Mock Database",
    code: `<?php
  // Simulating Unit 10.7 MySQL connection
  $conn = mysqli_connect("localhost", "root", "", "school_db");
  
  $query = "SELECT * FROM students";
  // Simulated output for learning purposes
  
  echo "<table border='1' cellpadding='5'>";
  echo "<tr><th>ID</th><th>Name</th><th>Stream</th></tr>";
  echo "<tr><td>1</td><td>Amara</td><td>Bio</td></tr>";
  echo "<tr><td>2</td><td>Nimal</td><td>Maths</td></tr>";
  echo "</table>";
?>`
  }
];

const PhpLab: React.FC = () => {
  const [code, setCode] = useState(PHP_SNIPPETS[0].code);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    const result = await runPhpCode(code);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl min-h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 shrink-0 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            PHP & Server-Side
          </h2>
          <p className="text-xs text-slate-400 mt-1">Simulated Apache/PHP Environment</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <select 
            onChange={(e) => setCode(PHP_SNIPPETS[parseInt(e.target.value)].code)}
            className="bg-slate-700 text-white text-sm rounded-lg px-3 py-2 border border-slate-600 outline-none w-full"
          >
            {PHP_SNIPPETS.map((s, i) => (
              <option key={i} value={i}>{s.name}</option>
            ))}
          </select>
          <button 
            onClick={handleRun}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold transition-colors w-full sm:w-auto"
          >
            <Play className="w-4 h-4" />
            {loading ? "Processing..." : "Run on Server"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border border-slate-700 overflow-hidden min-h-[300px]">
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Code className="w-3 h-3" /> Source Code (.php)
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-slate-900 p-4 text-indigo-100 font-mono text-sm resize-none focus:outline-none leading-relaxed min-h-[200px]"
            spellCheck={false}
          />
        </div>

        {/* Browser Preview */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-700 overflow-hidden min-h-[300px]">
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-3 h-3" /> Browser Output (localhost)
            </span>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {output ? (
              <div dangerouslySetInnerHTML={{ __html: output }} className="prose prose-sm max-w-none text-black" />
            ) : (
              <div className="text-slate-400 italic text-sm text-center mt-10">
                Server response will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhpLab;
