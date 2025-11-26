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
import ProfileSettings from './components/ProfileSettings';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LayoutDashboard, Binary, Cpu, Bot, BookOpen, Workflow, FileText, Database, CircuitBoard, Network, Code, ShoppingCart, Table, Globe, Zap, Server, BrainCircuit, ClipboardList, Menu, X, Flame, Trophy, Calendar, TrendingUp, LogOut, Sun, Moon, Settings } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [xp, setXp] = useState(1350);
  const [streak, setStreak] = useState(4);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center text-gray-900 dark:text-white">Loading...</div>;
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
    setIsMobileMenuOpen(false);
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
      case ModuleType.PROGRESS: return <ProgressReport />;
      case ModuleType.PROFILE_SETTINGS: return <ProfileSettings />;
      default: return <Dashboard onSelect={handleModuleSelect} xp={xp} streak={streak} />;
    }
  };

  const menuCategories = [
    {
      title: "Main",
      items: [
        { id: ModuleType.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
        { id: ModuleType.PROGRESS, label: 'Progress', icon: TrendingUp },
        { id: ModuleType.ASSIGNMENTS, label: 'Assignments', icon: BookOpen },
      ]
    },
    {
      title: "Computer Science",
      items: [
        { id: ModuleType.LOGIC_GATES, label: 'Logic Gates', icon: Binary },
        { id: ModuleType.NUMBER_SYSTEMS, label: 'Number Systems', icon: FileText },
        { id: ModuleType.OS_SCHEDULING, label: 'OS Visualizer', icon: Cpu },
        { id: ModuleType.FETCH_EXECUTE, label: 'CPU Architecture', icon: CircuitBoard },
      ]
    },
    {
      title: "Programming & Web",
      items: [
        { id: ModuleType.PYTHON_LAB, label: 'Python Lab', icon: Code },
        { id: ModuleType.WEB_STUDIO, label: 'Web Studio', icon: Globe },
        { id: ModuleType.PHP_LAB, label: 'PHP Lab', icon: Server },
        { id: ModuleType.SQL_LAB, label: 'SQL Lab', icon: Database },
      ]
    },
    {
      title: "Networking",
      items: [
        { id: ModuleType.NETWORK_LAB, label: 'Network Designer', icon: Network },
        { id: ModuleType.SUBNETTING, label: 'Subnetting Lab', icon: Network },
        { id: ModuleType.IOT_SIM, label: 'IoT Simulator', icon: Zap },
      ]
    },
    {
      title: "Advanced",
      items: [
        { id: ModuleType.AI_TUTOR, label: 'AI Tutor', icon: Bot },
        { id: ModuleType.AGENT_SYSTEMS, label: 'AI Agents', icon: Bot },
        { id: ModuleType.NEURAL_NET, label: 'Neural Networks', icon: BrainCircuit },
        { id: ModuleType.NORMALIZATION, label: 'Normalization', icon: Table },
        { id: ModuleType.ECOMMERCE, label: 'E-Commerce', icon: ShoppingCart },
      ]
    },
    {
      title: "Tools",
      items: [
        { id: ModuleType.FLOWCHART, label: 'Flowcharts', icon: Workflow },
        { id: ModuleType.PROJECT_MANAGER, label: 'Project Manager', icon: ClipboardList },
        { id: ModuleType.PAST_PAPERS, label: 'Past Papers', icon: FileText },
      ]
    },
    {
      title: "Settings",
      items: [
        { id: ModuleType.PROFILE_SETTINGS, label: 'Profile Settings', icon: Settings },
      ]
    }
  ];

  const allMenuItems = menuCategories.flatMap(category => category.items);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ICT Lab</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Grade 12 & 13</p>
            </div>
          </div>

          <div className="space-y-6 h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar pb-6">
            {menuCategories.map((category, index) => (
              <div key={index}>
                <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleModuleSelect(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeModule === item.id
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={logout}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        <header className="h-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-30">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {allMenuItems.find(m => m.id === activeModule)?.label}
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium border border-orange-100 dark:border-orange-900/30">
              <Flame size={16} />
              <span>{streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium border border-brand-100 dark:border-brand-900/30">
              <Trophy size={16} />
              <span>{xp} XP</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-xs font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="h-[calc(100vh-64px)] overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ onSelect: (m: ModuleType) => void, xp: number, streak: number }> = ({ onSelect, xp, streak }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-3xl p-6 text-white shadow-lg shadow-brand-500/20">
        <h3 className="text-lg font-medium opacity-90 mb-1">Total XP</h3>
        <div className="text-4xl font-bold mb-4">{xp}</div>
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <div className="bg-white rounded-full h-2 w-[70%]"></div>
        </div>
        <p className="text-sm opacity-80">Level 12 • 350 XP to next level</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weekly Activity</h3>
          <Calendar className="text-gray-400" size={20} />
        </div>
        <div className="flex items-end justify-between h-24 gap-2">
          {[40, 70, 30, 85, 50, 65, 45].map((h, i) => (
            <div key={i} className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-lg relative group">
              <div
                className="absolute bottom-0 left-0 right-0 bg-brand-500 rounded-t-lg transition-all duration-500 group-hover:bg-brand-400"
                style={{ height: `${h}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Current Streak</h3>
          <Flame className="text-orange-500" size={20} />
        </div>
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{streak} <span className="text-lg text-gray-400 font-normal">days</span></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">You're on fire! Complete a lesson today to keep it going.</p>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-6">Continue Learning</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Logic Gates", icon: Binary, color: "bg-blue-500", id: ModuleType.LOGIC_GATES },
          { title: "Python Basics", icon: Code, color: "bg-yellow-500", id: ModuleType.PYTHON_LAB },
          { title: "Network Design", icon: Network, color: "bg-green-500", id: ModuleType.NETWORK_LAB }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="group bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all duration-300 text-left shadow-sm hover:shadow-md"
          >
            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg opacity-90 group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-bold mb-2 group-hover:text-brand-500 transition-colors">{item.title}</h4>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-2 overflow-hidden">
              <div className="bg-brand-500 h-full w-2/3 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">65% Complete</p>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
