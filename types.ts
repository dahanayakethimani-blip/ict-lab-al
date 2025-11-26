
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  LOGIC_GATES = 'LOGIC_GATES',
  NUMBER_SYSTEMS = 'NUMBER_SYSTEMS',
  OS_SCHEDULING = 'OS_SCHEDULING',
  DATA_COMMS = 'DATA_COMMS',
  FETCH_EXECUTE = 'FETCH_EXECUTE',
  SQL_LAB = 'SQL_LAB',
  NETWORK_LAB = 'NETWORK_LAB',
  PYTHON_LAB = 'PYTHON_LAB',
  WEB_STUDIO = 'WEB_STUDIO',
  AI_TUTOR = 'AI_TUTOR',
  PAST_PAPERS = 'PAST_PAPERS',
  SUBNETTING = 'SUBNETTING',
  NORMALIZATION = 'NORMALIZATION',
  ECOMMERCE = 'ECOMMERCE',
  FLOWCHART = 'FLOWCHART',
  IOT_SIM = 'IOT_SIM',
  PHP_LAB = 'PHP_LAB',
  AGENT_SYSTEMS = 'AGENT_SYSTEMS',
  NEURAL_NET = 'NEURAL_NET',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  ASSIGNMENTS = 'ASSIGNMENTS',
  PROGRESS = 'PROGRESS'
}

export interface Process {
  id: number;
  name: string;
  arrivalTime: number;
  burstTime: number;
  color: string;
}

export interface SchedulerResult {
  processId: number;
  startTime: number;
  endTime: number;
  waitingTime: number;
  turnaroundTime: number;
}

export interface LogicGateState {
  type: 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR';
  inputA: boolean;
  inputB: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Quiz Types
export type QuizMode = 'PRACTICE' | 'MODEL' | 'PAST_PAPER';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index
  explanation: string;
}

export interface QuizData {
  practice: QuizQuestion[];
  model: QuizQuestion[];
  pastPaper: QuizQuestion[];
}

// Assignment Types
export interface Assignment {
  id: string;
  week: number;
  title: string;
  description: string;
  durationMinutes: number; // Exam duration
  moduleTag: string; // For analytics grouping
  questions: QuizQuestion[];
  structuredQuestion: {
    id: string;
    question: string;
    maxMarks: number;
  };
}

export interface AssignmentResult {
  assignmentId: string;
  date: string;
  score: number;
  totalMarks: number;
  mcqScore: number;
  structuredScore: number;
  feedback: string;
}
