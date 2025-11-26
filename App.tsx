
import React, { useState } from 'react';
import { ModuleType } from './types';
import LogicGateSim from './components/LogicGateSim';
import NumberSystem from './components/NumberSystem';
import OsVisualizer from './components/OsVisualizer';
import FetchExecuteSim from './components/FetchExecuteSim';
import SqlLab from './components/SqlLab';
import NetworkDesigner from './components/NetworkDesigner';
import PythonLab from './components/PythonLab';
import WebStudio from './components/WebStudio';
import AiTutor from './components/AiTutor';
import PastPaperQuiz from './components/PastPaperQuiz';
import SubnettingLab from './components/SubnettingLab';
import NormalizationLab from './components/NormalizationLab';
import ECommerceSim from './components/ECommerceSim';
import FlowchartLab from './components/FlowchartLab';
import IoTSimulator from './components/IoTSimulator';
import PhpLab from './components/PhpLab';
import AgentSystemSim from './components/AgentSystemSim';
import NeuralNetSim from './components/NeuralNetSim';
import ProjectManager from './components/ProjectManager';
import AssignmentCenter from './components/AssignmentCenter';
import ProgressReport from './components/ProgressReport';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import { useAuth } from './contexts/AuthContext';
import { LayoutDashboard, Binary, Cpu, Bot, BookOpen, Workflow, FileText, Database, CircuitBoard, Network, Code, ShoppingCart, Table, Globe, Zap, Server, BrainCircuit, ClipboardList, Menu, X, Flame, Trophy, Calendar, TrendingUp, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [xp, setXp] = useState(1350);
  const [streak, setStreak] = useState(4);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user) {
    if (showLogin) {
      return <LoginPage onBack={() => setShowLogin(false)} />;
    }
    return <LandingPage onGetStarted={() => setShowLogin(true)} />;
  }

  const handleModuleSelect = (module: ModuleType) => {
    setActiveModule(module);
    setXp(prev => prev + 5);
    setIsMobileMenuOpen(false); // Close menu on selection on mobile
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.LOGIC_GATES: return <LogicGateSim />;
      case ModuleType.NUMBER_SYSTEMS: return <NumberSystem />;
      case ModuleType.OS_SCHEDULING: return <OsVisualizer />;
      case ModuleType.FETCH_EXECUTE: return <FetchExecuteSim />;
      case ModuleType.SQL_LAB: return <SqlLab />;
      case ModuleType.NETWORK_LAB: return <NetworkDesigner />;
      case ModuleType.PYTHON_LAB: return <PythonLab />;
      case ModuleType.WEB_STUDIO: return <WebStudio />;
      case ModuleType.AI_TUTOR: return <AiTutor />;
      case ModuleType.PAST_PAPERS: return <PastPaperQuiz />;
      case ModuleType.SUBNETTING: return <SubnettingLab />;
      case ModuleType.NORMALIZATION: return <NormalizationLab />;
      case ModuleType.ECOMMERCE: return <ECommerceSim />;
      case ModuleType.FLOWCHART: return <FlowchartLab />;
      case ModuleType.IOT_SIM: return <IoTSimulator />;
      case ModuleType.PHP_LAB: return <PhpLab />;
      case ModuleType.AGENT_SYSTEMS: return <AgentSystemSim />;
      case ModuleType.NEURAL_NET: return <NeuralNetSim />;
      case ModuleType.PROJECT_MANAGER: return <ProjectManager />;
      case ModuleType.ASSIGNMENTS: return <AssignmentCenter />;
      case ModuleType.PROGRESS: return <ProgressReport />;
      default: return <Dashboard onSelect={handleModuleSelect} xp={xp} streak={streak} />;
    }
  };

  const getLevel = (xp: number) => Math.floor(xp / 1000) + 1;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 font-sans text-slate-200">

      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2 font-bold text-white">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span>ICT Lab</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-300 hover:text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:w-64 md:h-screen md:sticky md:top-0 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-800 hidden md:block">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            ICT Lab <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">A/L</span>
          </h1>
        </div>

        {/* User Stats (Mini) */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/50">
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-bold">Lvl {getLevel(xp)}</span>
          </div>
          <div className="flex items-center gap-1 text-orange-400">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-bold">{streak}</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Learning Path"
            active={activeModule === ModuleType.DASHBOARD}
            onClick={() => handleModuleSelect(ModuleType.DASHBOARD)}
          />

          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-500">Student Zone</div>
          <NavItem
            icon={<Calendar size={18} />}
            label="Assignments"
            active={activeModule === ModuleType.ASSIGNMENTS}
            onClick={() => handleModuleSelect(ModuleType.ASSIGNMENTS)}
          />
          <NavItem
            icon={<TrendingUp size={18} />}
            label="My Progress"
            active={activeModule === ModuleType.PROGRESS}
            onClick={() => handleModuleSelect(ModuleType.PROGRESS)}
          />

          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fundamentals</div>
          <NavItem
            icon={<CircuitBoard size={18} />}
            label="CPU Cycle"
            active={activeModule === ModuleType.FETCH_EXECUTE}
            onClick={() => handleModuleSelect(ModuleType.FETCH_EXECUTE)}
          />
          <NavItem
            icon={<Binary size={18} />}
            label="Number Systems"
            active={activeModule === ModuleType.NUMBER_SYSTEMS}
            onClick={() => handleModuleSelect(ModuleType.NUMBER_SYSTEMS)}
          />
          <NavItem
            icon={<Workflow size={18} />}
            label="Logic Simulator"
            active={activeModule === ModuleType.LOGIC_GATES}
            onClick={() => handleModuleSelect(ModuleType.LOGIC_GATES)}
          />

          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Systems & Network</div>
          <NavItem
            icon={<Cpu size={18} />}
            label="OS Scheduling"
            active={activeModule === ModuleType.OS_SCHEDULING}
            onClick={() => handleModuleSelect(ModuleType.OS_SCHEDULING)}
          />
          <NavItem
            icon={<Network size={18} />}
            label="Topology Lab"
            active={activeModule === ModuleType.NETWORK_LAB}
            onClick={() => handleModuleSelect(ModuleType.NETWORK_LAB)}
          />
          <NavItem
            icon={<Globe size={18} />}
            label="Subnetting"
            active={activeModule === ModuleType.SUBNETTING}
            onClick={() => handleModuleSelect(ModuleType.SUBNETTING)}
          />

          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Data Management</div>
          <NavItem
            icon={<Database size={18} />}
            label="SQL Lab"
            active={activeModule === ModuleType.SQL_LAB}
            onClick={() => handleModuleSelect(ModuleType.SQL_LAB)}
          />
          <NavItem
            icon={<Table size={18} />}
            label="Normalization"
            active={activeModule === ModuleType.NORMALIZATION}
            onClick={() => handleModuleSelect(ModuleType.NORMALIZATION)}
          />

          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Grade 13 Advanced</div>
          <NavItem
            icon={<Server size={18} />}
            label="PHP & Server"
            active={activeModule === ModuleType.PHP_LAB}
            onClick={() => handleModuleSelect(ModuleType.PHP_LAB)}
          />
          <NavItem
            icon={<Zap size={18} />}
            label="IoT Systems"
            active={activeModule === ModuleType.IOT_SIM}
            onClick={() => handleModuleSelect(ModuleType.IOT_SIM)}
          />
          <NavItem
            icon={<Bot size={18} />}
            label="Agent Systems"
            active={activeModule === ModuleType.AGENT_SYSTEMS}
            onClick={() => handleModuleSelect(ModuleType.AGENT_SYSTEMS)}
          />
          <NavItem
            icon={<BrainCircuit size={18} />}
            label="Neural Networks"
            active={activeModule === ModuleType.NEURAL_NET}
            onClick={() => handleModuleSelect(ModuleType.NEURAL_NET)}
          />

          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project & Exams</div>
          <NavItem
            icon={<ClipboardList size={18} />}
            label="Project Manager"
            active={activeModule === ModuleType.PROJECT_MANAGER}
            onClick={() => handleModuleSelect(ModuleType.PROJECT_MANAGER)}
          />
          <NavItem
            icon={<Code size={18} />}
            label="Python Lab"
            active={activeModule === ModuleType.PYTHON_LAB}
            onClick={() => handleModuleSelect(ModuleType.PYTHON_LAB)}
          />
          <NavItem
            icon={<ShoppingCart size={18} />}
            label="E-Commerce"
            active={activeModule === ModuleType.ECOMMERCE}
            onClick={() => handleModuleSelect(ModuleType.ECOMMERCE)}
          />
          <NavItem
            icon={<FileText size={18} />}
            label="Past Papers"
            active={activeModule === ModuleType.PAST_PAPERS}
            onClick={() => handleModuleSelect(ModuleType.PAST_PAPERS)}
          />

          <div className="pt-4 mt-auto border-t border-slate-800">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
            >
              <LogOut size={18} />
              <span className="font-medium text-sm">Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-3 md:p-6 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
          {renderModule()}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${active
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const Dashboard = ({ onSelect, xp, streak }: { onSelect: (m: ModuleType) => void, xp: number, streak: number }) => (
  <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20">
    {/* Hero Section */}
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl p-6 md:p-8 text-white shadow-2xl border border-indigo-700/50">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Syllabus Complete!</h2>
            <p className="text-blue-200 max-w-2xl text-sm md:text-base">
              You have access to all modules for Grade 12 & 13. Check the <span className="font-bold text-white">Assignments</span> tab for your weekly tasks.
            </p>
            <button
              onClick={() => onSelect(ModuleType.ASSIGNMENTS)}
              className="mt-4 bg-white text-blue-900 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              View Assignments
            </button>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur p-3 md:p-4 rounded-xl flex flex-col items-center min-w-[80px] md:min-w-[100px]">
              <span className="text-xs text-blue-200 uppercase font-bold">Level</span>
              <span className="text-2xl md:text-3xl font-black text-yellow-400">{Math.floor(xp / 1000) + 1}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent skew-x-12"></div>
    </div>

    {/* Learning Path */}
    <div className="space-y-6">
      <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-blue-400" />
        Grade 13 Final Modules
      </h3>

      <div className="grid grid-cols-1 gap-6">

        {/* Grade 13: Unit 13 & 14 */}
        <PathSection title="Trends & Project (Unit 13-14)" progress={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ModuleCard
              title="Neural Networks"
              desc="Unit 13.1: AI & Learning"
              icon={<BrainCircuit className="w-6 h-6 text-fuchsia-400" />}
              onClick={() => onSelect(ModuleType.NEURAL_NET)}
              unit="Unit 13"
              featured
            />
            <ModuleCard
              title="Project Manager"
              desc="Unit 14: SDLC Board"
              icon={<ClipboardList className="w-6 h-6 text-emerald-400" />}
              onClick={() => onSelect(ModuleType.PROJECT_MANAGER)}
              unit="Unit 14"
              featured
            />
            <ModuleCard
              title="Agent Systems"
              desc="Unit 13.2: Multi-Agents"
              icon={<Bot className="w-6 h-6 text-purple-400" />}
              onClick={() => onSelect(ModuleType.AGENT_SYSTEMS)}
              unit="Unit 13"
            />
          </div>
        </PathSection>

        {/* Grade 13: Unit 10 & 11 */}
        <PathSection title="Advanced Web & IoT (Unit 10-11)" progress={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ModuleCard
              title="PHP Server Lab"
              desc="Unit 10.7: Server-Side Scripting"
              icon={<Server className="w-6 h-6 text-indigo-400" />}
              onClick={() => onSelect(ModuleType.PHP_LAB)}
              unit="Unit 10"
            />
            <ModuleCard
              title="IoT Smart Home"
              desc="Unit 11: Sensors & Actuators"
              icon={<Zap className="w-6 h-6 text-teal-400" />}
              onClick={() => onSelect(ModuleType.IOT_SIM)}
              unit="Unit 11"
            />
          </div>
        </PathSection>
      </div>
    </div>
  </div>
);

const PathSection = ({ title, progress, children }: { title: string, progress: number, children?: React.ReactNode }) => (
  <div className="relative border-l-2 border-slate-800 pl-4 md:pl-8 pb-8 last:pb-0">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-950 shadow-lg shadow-blue-900"></div>
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-base md:text-lg font-semibold text-slate-200">{title}</h4>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-xs font-bold text-blue-400">{progress}%</span>
      </div>
    </div>
    {children}
  </div>
);

const ModuleCard = ({ title, desc, icon, onClick, unit, featured, completed }: any) => (
  <button onClick={onClick} className={`bg-slate-800 p-4 md:p-5 rounded-xl border text-left hover:border-blue-500 transition-all hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden ${featured ? 'border-blue-500/50 shadow-blue-900/20' : 'border-slate-700'} ${completed ? 'opacity-75 hover:opacity-100' : ''}`}>
    {featured && <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg">NEW</div>}
    {completed && <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>}
    <div className="flex justify-between items-start mb-3">
      <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-slate-800 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-mono text-slate-500 border border-slate-700 px-1.5 py-0.5 rounded">{unit}</span>
    </div>
    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{desc}</p>
  </button>
);

export default App;
