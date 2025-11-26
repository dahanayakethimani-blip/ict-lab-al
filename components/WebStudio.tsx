
import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Code, Eye, Trophy } from 'lucide-react';
import QuizOverlay from './QuizOverlay';
import { ModuleType } from '../types';

const DEFAULT_HTML = `<!-- Grade 12 HTML Practice -->
<div class="card">
  <h1>Hello World!</h1>
  <p>This is a live preview of your code.</p>
  <button>Click Me</button>
</div>`;

const DEFAULT_CSS = `/* CSS Styling */
body {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f9ff;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  text-align: center;
}

h1 { color: #0284c7; }

button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

button:hover {
  background: #0369a1;
}`;

const WebStudio: React.FC = () => {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [srcDoc, setSrcDoc] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
          </body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css]);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden relative">
      {showQuiz && <QuizOverlay moduleType={ModuleType.WEB_STUDIO} onClose={() => setShowQuiz(false)} />}
      
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-700 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <LayoutTemplate className="w-5 h-5 text-white" />
          </div>
          Web Dev Studio
        </h2>
        <div className="flex gap-2 items-center">
            <button 
                onClick={() => setShowQuiz(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg text-sm"
            >
                <Trophy className="w-4 h-4" /> Quiz
            </button>
            <div className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700">
            HTML5 / CSS3 Live Preview
            </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editors Column */}
        <div className="flex-1 flex flex-col border-r border-slate-700 min-w-[300px]">
          {/* HTML Editor */}
          <div className="flex-1 flex flex-col border-b border-slate-700">
            <div className="bg-slate-800 px-4 py-2 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-2"><Code className="w-3 h-3 text-orange-400" /> HTML</span>
            </div>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="flex-1 w-full bg-slate-900 p-4 text-orange-100 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>

          {/* CSS Editor */}
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-800 px-4 py-2 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-2"><Code className="w-3 h-3 text-blue-400" /> CSS</span>
            </div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="flex-1 w-full bg-slate-900 p-4 text-blue-100 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Preview Column */}
        <div className="flex-1 bg-white flex flex-col min-w-[300px]">
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-3 h-3" /> Live Preview
            </span>
          </div>
          <iframe
            title="preview"
            srcDoc={srcDoc}
            className="flex-1 w-full h-full border-none bg-white"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default WebStudio;
