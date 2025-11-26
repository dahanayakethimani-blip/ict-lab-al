
import { ModuleType, QuizData } from '../types';

export const QUIZ_DATABASE: Partial<Record<ModuleType, QuizData>> = {
  [ModuleType.LOGIC_GATES]: {
    practice: [
      {
        id: 1,
        question: "Which gate returns TRUE only if both inputs are TRUE?",
        options: ["OR", "AND", "XOR", "NAND"],
        correctAnswer: 1,
        explanation: "The AND gate requires all inputs to be High (1) to output High (1)."
      },
      {
        id: 2,
        question: "What is the output of a NOT gate if the input is 1?",
        options: ["1", "0", "Unknown", "High Impedance"],
        correctAnswer: 1,
        explanation: "The NOT gate inverts the input. NOT 1 is 0."
      }
    ],
    model: [
      {
        id: 3,
        question: "Which logic gate represents the expression F = A + B?",
        options: ["AND", "NAND", "OR", "NOR"],
        correctAnswer: 2,
        explanation: "The Boolean expression for OR is A + B."
      },
      {
        id: 4,
        question: "Which gate is known as a 'Universal Gate'?",
        options: ["XOR", "AND", "NAND", "NOT"],
        correctAnswer: 2,
        explanation: "NAND and NOR are universal gates because any other gate can be constructed using only them."
      }
    ],
    pastPaper: [
      {
        id: 5,
        question: "(2018 AL) Which of the following circuits is equivalent to a NAND gate?",
        options: ["AND followed by NOT", "OR followed by NOT", "NOT followed by AND", "XOR followed by NOT"],
        correctAnswer: 0,
        explanation: "NAND stands for NOT-AND. It is mathematically equivalent to performing an AND operation and then inverting the result."
      },
      {
        id: 6,
        question: "(2020 AL) If A=1, B=0, C=1, what is the output of (A AND B) OR C?",
        options: ["0", "1", "Null", "Error"],
        correctAnswer: 1,
        explanation: "(1 AND 0) is 0. (0 OR 1) is 1."
      }
    ]
  },
  [ModuleType.OS_SCHEDULING]: {
    practice: [
      {
        id: 1,
        question: "Which component of the OS selects the next process to run?",
        options: ["Memory Manager", "Scheduler", "Dispatcher", "Compiler"],
        correctAnswer: 1,
        explanation: "The Scheduler determines which process in the ready queue gets the CPU next."
      }
    ],
    model: [
      {
        id: 2,
        question: "In Round Robin scheduling, what determines the maximum time a process can run?",
        options: ["Burst Time", "Arrival Time", "Time Quantum", "Latency"],
        correctAnswer: 2,
        explanation: "The Time Quantum is the fixed slice of time allocated to each process in Round Robin."
      }
    ],
    pastPaper: [
      {
        id: 3,
        question: "(2019 AL) Which of the following state transitions is NOT possible in a process lifecycle?",
        options: ["Running -> Ready", "Waiting -> Ready", "Ready -> Running", "Waiting -> Running"],
        correctAnswer: 3,
        explanation: "A process cannot go directly from Waiting to Running. It must go to the Ready queue first."
      }
    ]
  },
  [ModuleType.IOT_SIM]: {
    practice: [
      {
        id: 1,
        question: "Which sensor is commonly used to measure Light Intensity?",
        options: ["LM35", "LDR", "Ultrasonic", "DHT11"],
        correctAnswer: 1,
        explanation: "LDR (Light Dependent Resistor) changes resistance based on light intensity."
      }
    ],
    model: [
      {
        id: 2,
        question: "What is the role of an Actuator in an IoT system?",
        options: ["To process data", "To sense the environment", "To perform a physical action", "To store data"],
        correctAnswer: 2,
        explanation: "Actuators (motors, lights, fans) perform physical actions based on control signals."
      }
    ],
    pastPaper: [
      {
        id: 3,
        question: "(Grade 13 Model) Which Arduino pin type can read values between 0 and 1023?",
        options: ["Digital Pins", "Analog Pins", "PWM Pins", "Power Pins"],
        correctAnswer: 1,
        explanation: "Analog pins (A0-A5) use an ADC to convert voltage (0-5V) into an integer (0-1023)."
      }
    ]
  },
  [ModuleType.NUMBER_SYSTEMS]: {
    practice: [
      { id: 1, question: "What is the binary equivalent of Decimal 10?", options: ["1010", "1001", "1100", "1000"], correctAnswer: 0, explanation: "8 + 2 = 10 -> 1010" },
      { id: 2, question: "Which system uses Base 16?", options: ["Binary", "Octal", "Decimal", "Hexadecimal"], correctAnswer: 3, explanation: "Hexa (6) + Deci (10) = 16." }
    ],
    model: [
      { id: 3, question: "Convert Hexadecimal 'A' to Binary.", options: ["1000", "1001", "1010", "1011"], correctAnswer: 2, explanation: "A in Hex is 10 in Decimal, which is 1010 in Binary." }
    ],
    pastPaper: [
      { id: 4, question: "(2016 AL) What is the Two's Complement of binary 0101 (using 4 bits)?", options: ["1010", "1011", "0110", "1101"], correctAnswer: 1, explanation: "Invert 0101 -> 1010. Add 1 -> 1011." }
    ]
  },
  [ModuleType.FETCH_EXECUTE]: {
    practice: [
      { id: 1, question: "What does PC stand for in CPU architecture?", options: ["Process Control", "Program Counter", "Personal Computer", "Primary Cache"], correctAnswer: 1, explanation: "PC holds the address of the next instruction." }
    ],
    model: [
      { id: 2, question: "Which register holds the current instruction being decoded?", options: ["MAR", "MDR", "CIR", "ACC"], correctAnswer: 2, explanation: "CIR (Current Instruction Register) holds the instruction while it is being split into Opcode and Operand." }
    ],
    pastPaper: [
      { id: 3, question: "(2017 AL) During the Fetch stage, the content of PC is copied to:", options: ["MDR", "MAR", "CIR", "ALU"], correctAnswer: 1, explanation: "PC contains the address, which must be moved to the Memory Address Register (MAR) to access RAM." }
    ]
  },
  [ModuleType.NETWORK_LAB]: {
    practice: [
      { id: 1, question: "Which topology uses a central Hub/Switch?", options: ["Bus", "Ring", "Star", "Mesh"], correctAnswer: 2, explanation: "Star topology connects all nodes to a central device." }
    ],
    model: [
      { id: 2, question: "Which device operates at the Data Link Layer?", options: ["Hub", "Switch", "Router", "Repeater"], correctAnswer: 1, explanation: "Switches use MAC addresses (Data Link Layer) to forward frames." }
    ],
    pastPaper: [
      { id: 3, question: "(2021 AL) Which protocol provides reliable, connection-oriented delivery?", options: ["UDP", "IP", "TCP", "Ethernet"], correctAnswer: 2, explanation: "TCP guarantees delivery via acknowledgments, unlike UDP." }
    ]
  },
  [ModuleType.SQL_LAB]: {
    practice: [
      { id: 1, question: "Which command is used to retrieve data?", options: ["GET", "SELECT", "FETCH", "RETRIEVE"], correctAnswer: 1, explanation: "SELECT is the standard SQL command for reading data." }
    ],
    model: [
      { id: 2, question: "How do you filter records in SQL?", options: ["FILTER BY", "HAVING", "WHERE", "IF"], correctAnswer: 2, explanation: "The WHERE clause is used to filter records based on a specified condition." }
    ],
    pastPaper: [
      { id: 3, question: "(2018 AL) Which key uniquely identifies a record in a table?", options: ["Foreign Key", "Primary Key", "Unique Key", "Index Key"], correctAnswer: 1, explanation: "A Primary Key must be unique and not null for every record." }
    ]
  },
  [ModuleType.NORMALIZATION]: {
    practice: [
      { id: 1, question: "What does 1NF require?", options: ["No repeating groups", "No partial dependency", "No transitive dependency", "No keys"], correctAnswer: 0, explanation: "1NF requires atomic values and no repeating groups." }
    ],
    model: [
      { id: 2, question: "Removing Partial Dependencies leads to:", options: ["1NF", "2NF", "3NF", "BCNF"], correctAnswer: 1, explanation: "2NF is achieved when the table is in 1NF and has no partial dependencies." }
    ],
    pastPaper: [
      { id: 3, question: "(2022 AL) If a non-key attribute depends on another non-key attribute, this violates:", options: ["1NF", "2NF", "3NF", "Zero NF"], correctAnswer: 2, explanation: "This is a Transitive Dependency, which must be removed to achieve 3NF." }
    ]
  },
  [ModuleType.SUBNETTING]: {
    practice: [
      { id: 1, question: "How many bits are in an IPv4 address?", options: ["32", "64", "128", "16"], correctAnswer: 0, explanation: "IPv4 uses 32-bit addresses." }
    ],
    model: [
      { id: 2, question: "What is the default subnet mask for Class C?", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], correctAnswer: 2, explanation: "Class C supports 254 hosts, using the first 3 octets for the network." }
    ],
    pastPaper: [
      { id: 3, question: "(2019 AL) Which is a private IP address?", options: ["172.16.0.1", "8.8.8.8", "192.169.1.1", "11.0.0.1"], correctAnswer: 0, explanation: "172.16.0.0 to 172.31.255.255 is a private range (Class B)." }
    ]
  },
  [ModuleType.WEB_STUDIO]: {
    practice: [
      { id: 1, question: "Which tag is used for the largest heading?", options: ["<head>", "<h6>", "<h1>", "<header>"], correctAnswer: 2, explanation: "<h1> defines the most important heading." }
    ],
    model: [
      { id: 2, question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "background-color"], correctAnswer: 2, explanation: "The 'color' property controls the foreground (text) color." }
    ],
    pastPaper: [
      { id: 3, question: "(2015 AL) HTML is considered a:", options: ["Programming Language", "Markup Language", "Scripting Language", "Machine Language"], correctAnswer: 1, explanation: "HTML (HyperText Markup Language) structures content, it doesn't have logic." }
    ]
  },
  [ModuleType.PHP_LAB]: {
    practice: [
      { id: 1, question: "All PHP variables start with which symbol?", options: ["@", "#", "$", "%"], correctAnswer: 2, explanation: "PHP variables are prefixed with a dollar sign (e.g., $count)." }
    ],
    model: [
      { id: 2, question: "Which function outputs text in PHP?", options: ["print_line()", "echo", "write", "send"], correctAnswer: 1, explanation: "'echo' or 'print' are used to send output to the browser." }
    ],
    pastPaper: [
      { id: 3, question: "(Grade 13) PHP code is executed on the:", options: ["Client Browser", "Web Server", "Database", "Operating System"], correctAnswer: 1, explanation: "PHP is a server-side scripting language." }
    ]
  },
  [ModuleType.PYTHON_LAB]: {
    practice: [
      { id: 1, question: "Which keyword defines a function?", options: ["func", "define", "def", "function"], correctAnswer: 2, explanation: "'def' is used to define functions in Python." }
    ],
    model: [
      { id: 2, question: "How do you start a for loop for numbers 0 to 4?", options: ["for i in range(5):", "for i to 5", "loop 5 times", "foreach i in 5"], correctAnswer: 0, explanation: "range(5) generates numbers 0, 1, 2, 3, 4." }
    ],
    pastPaper: [
      { id: 3, question: "(2020 AL) Which is a valid list definition?", options: ["L = (1, 2)", "L = {1, 2}", "L = [1, 2]", "L = <1, 2>"], correctAnswer: 2, explanation: "Square brackets [] denote a List. () is Tuple, {} is Set/Dict." }
    ]
  },
  [ModuleType.FLOWCHART]: {
    practice: [
      { id: 1, question: "Which symbol represents a Decision?", options: ["Rectangle", "Oval", "Diamond", "Parallelogram"], correctAnswer: 2, explanation: "A Diamond shape represents a decision (Yes/No)." }
    ],
    model: [
      { id: 2, question: "A Rectangle represents:", options: ["Input/Output", "Process", "Start/End", "Connector"], correctAnswer: 1, explanation: "Rectangles represent processes or calculations." }
    ],
    pastPaper: [
      { id: 3, question: "(2015 AL) Which control structure repeats a set of instructions?", options: ["Sequence", "Selection", "Iteration", "Branching"], correctAnswer: 2, explanation: "Iteration (or Looping) repeats instructions." }
    ]
  },
  [ModuleType.ECOMMERCE]: {
    practice: [
      { id: 1, question: "B2C stands for:", options: ["Business to Computer", "Business to Consumer", "Buyer to Carrier", "Business to Company"], correctAnswer: 1, explanation: "Business to Consumer (e.g., Amazon selling to you)." }
    ],
    model: [
      { id: 2, question: "Which protocol secures online payments?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correctAnswer: 2, explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts data." }
    ],
    pastPaper: [
      { id: 3, question: "(2018 AL) An online auction site like eBay is an example of:", options: ["B2B", "C2C", "G2C", "B2E"], correctAnswer: 1, explanation: "Consumer to Consumer (C2C) allows individuals to sell to each other." }
    ]
  },
  [ModuleType.AGENT_SYSTEMS]: {
    practice: [
      { id: 1, question: "What is a key characteristic of a Software Agent?", options: ["Autonomous", "Manual", "Hardware-based", "Offline"], correctAnswer: 0, explanation: "Agents can operate without direct human intervention (Autonomy)." }
    ],
    model: [
      { id: 2, question: "What is a Multi-Agent System?", options: ["One agent doing many tasks", "Many agents interacting to solve problems", "A virus", "A database"], correctAnswer: 1, explanation: "MAS involves multiple agents collaborating or competing." }
    ],
    pastPaper: [
      { id: 3, question: "(Grade 13) Which is NOT a property of an intelligent agent?", options: ["Reactivity", "Pro-activeness", "Social Ability", "Passiveness"], correctAnswer: 3, explanation: "Agents must be active, not passive. They react to environment and take initiative." }
    ]
  },
  [ModuleType.NEURAL_NET]: {
    practice: [
      { id: 1, question: "What is the basic unit of a Neural Network?", options: ["Electron", "Neuron", "Proton", "Bit"], correctAnswer: 1, explanation: "Artificial Neurons (nodes) mimic biological neurons." }
    ],
    model: [
      { id: 2, question: "What happens during 'Training'?", options: ["Data is deleted", "Weights are adjusted", "Hardware is upgraded", "Internet speed increases"], correctAnswer: 1, explanation: "The network adjusts connection weights to minimize error." }
    ],
    pastPaper: [
      { id: 3, question: "(Grade 13) Which logic problem requires a hidden layer to solve?", options: ["AND", "OR", "XOR", "NOT"], correctAnswer: 2, explanation: "XOR is not linearly separable, so it requires a Multi-Layer Perceptron (hidden layer)." }
    ]
  },
};
