
import React, { useState } from 'react';
import { ClipboardList, Plus, MoreHorizontal } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  tag: string;
}

const ProjectManager: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: Task[] }>({
    todo: [
      { id: '1', title: 'Identify Problem Definition', tag: 'Analysis' },
      { id: '2', title: 'Gather Requirements', tag: 'Analysis' },
    ],
    progress: [
      { id: '3', title: 'Design ER Diagram', tag: 'Design' },
    ],
    done: [
      { id: '4', title: 'Submit Proposal', tag: 'Planning' },
    ]
  });

  const moveTask = (taskId: string, fromCol: string, toCol: string) => {
    const task = columns[fromCol].find(t => t.id === taskId);
    if (!task) return;

    setColumns(prev => ({
      ...prev,
      [fromCol]: prev[fromCol].filter(t => t.id !== taskId),
      [toCol]: [...prev[toCol], task]
    }));
  };

  return (
    <div className="p-4 md:p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl min-h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          Project Management
        </h2>
        <p className="text-slate-400 text-sm mt-1">Manage your Individual Final Project (SDLC Phases)</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[300px] h-full">
            <Column 
            title="To Do (Backlog)" 
            tasks={columns.todo} 
            colId="todo" 
            color="border-t-red-500" 
            onMove={moveTask} 
            nextCol="progress"
            />
            <Column 
            title="In Progress" 
            tasks={columns.progress} 
            colId="progress" 
            color="border-t-yellow-500" 
            onMove={moveTask} 
            nextCol="done"
            />
            <Column 
            title="Completed" 
            tasks={columns.done} 
            colId="done" 
            color="border-t-green-500" 
            onMove={moveTask} 
            nextCol="todo" // Loop back for demo
            />
        </div>
      </div>
    </div>
  );
};

const Column = ({ title, tasks, colId, color, onMove, nextCol }: any) => (
  <div className={`flex flex-col bg-slate-900 rounded-xl border border-slate-700 border-t-4 ${color} min-h-[300px]`}>
    <div className="p-4 border-b border-slate-800 flex justify-between items-center">
      <h3 className="font-bold text-white">{title}</h3>
      <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded-full">{tasks.length}</span>
    </div>
    <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[400px] md:max-h-none">
      {tasks.map((task: Task) => (
        <div 
          key={task.id} 
          onClick={() => onMove(task.id, colId, nextCol)}
          className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg group"
        >
          <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              task.tag === 'Analysis' ? 'bg-purple-900 text-purple-200' :
              task.tag === 'Design' ? 'bg-orange-900 text-orange-200' :
              'bg-blue-900 text-blue-200'
            }`}>
              {task.tag}
            </span>
            <MoreHorizontal className="w-4 h-4 text-slate-600 group-hover:text-white" />
          </div>
          <p className="text-sm text-slate-200 font-medium">{task.title}</p>
        </div>
      ))}
      <button className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-slate-500 text-sm hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center gap-1">
        <Plus className="w-4 h-4" /> Add Task
      </button>
    </div>
  </div>
);

export default ProjectManager;
