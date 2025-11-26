
import { Assignment } from '../types';

export const WEEKLY_ASSIGNMENTS: Assignment[] = [
  {
    id: "wk1_logic",
    week: 1,
    title: "Digital Logic & Data Representation",
    description: "Assessment on Logic Gates (Unit 4) and Number Systems (Unit 3). Focus on combinational circuits and conversions.",
    durationMinutes: 10,
    moduleTag: "Logic & Data",
    questions: [
      {
        id: 1,
        question: "Which logic gate outputs 0 only when both inputs are 1?",
        options: ["NOR", "NAND", "XOR", "OR"],
        correctAnswer: 1,
        explanation: "NAND is the inverse of AND. 1 AND 1 is 1, so 1 NAND 1 is 0."
      },
      {
        id: 2,
        question: "What is the 2's complement of binary 1010 (using 4 bits)?",
        options: ["0110", "0101", "0100", "0111"],
        correctAnswer: 0,
        explanation: "Flip bits (0101) add 1 (0110)."
      },
      {
        id: 3,
        question: "In Boolean algebra, A + A equals:",
        options: ["2A", "0", "1", "A"],
        correctAnswer: 3,
        explanation: "Idempotent Law: A OR A is always A."
      }
    ],
    structuredQuestion: {
      id: "sq_wk1",
      question: "Draw the truth table for a Half Adder circuit and explain why it cannot handle a carry-in bit. (Type your explanation below)",
      maxMarks: 10
    }
  },
  {
    id: "wk2_os",
    week: 2,
    title: "Operating Systems Architecture",
    description: "Assessment on OS functions, Process Management, and Memory Management (Unit 5).",
    durationMinutes: 15,
    moduleTag: "Systems",
    questions: [
      {
        id: 1,
        question: "Which scheduler controls the degree of multiprogramming?",
        options: ["Short-term", "Medium-term", "Long-term", "Dispatcher"],
        correctAnswer: 2,
        explanation: "The Long-term scheduler decides which processes are admitted to the ready queue."
      },
      {
        id: 2,
        question: "Virtual Memory is implemented using:",
        options: ["Paging / Segmentation", "ROM", "Cache", "Registers"],
        correctAnswer: 0,
        explanation: "Paging allows the OS to map virtual addresses to physical memory frames."
      }
    ],
    structuredQuestion: {
      id: "sq_wk2",
      question: "Compare and contrast 'Process' and 'Thread'. Why is context switching faster between threads than processes?",
      maxMarks: 10
    }
  },
  {
    id: "wk3_python",
    week: 3,
    title: "Python Programming Fundamentals",
    description: "Assessment on Control Structures, Functions, and Lists (Unit 9).",
    durationMinutes: 20,
    moduleTag: "Programming",
    questions: [
      {
        id: 1,
        question: "What is the output of print(10 // 3)?",
        options: ["3.33", "3", "3.0", "1"],
        correctAnswer: 1,
        explanation: "// is the floor division operator in Python."
      },
      {
        id: 2,
        question: "Which keyword breaks out of the current loop iteration and continues with the next?",
        options: ["break", "pass", "continue", "return"],
        correctAnswer: 2,
        explanation: "continue skips the rest of the current iteration."
      },
      {
        id: 3,
        question: "What data type is [1, 2, 3]?",
        options: ["Tuple", "List", "Dictionary", "Set"],
        correctAnswer: 1,
        explanation: "Square brackets denote a List in Python."
      }
    ],
    structuredQuestion: {
      id: "sq_wk3",
      question: "Write a Python function `calculate_average(numbers)` that takes a list of integers and returns the average. Handle the case where the list is empty.",
      maxMarks: 10
    }
  },
  {
    id: "wk4_db",
    week: 4,
    title: "Database Management & SQL",
    description: "Assessment on Normalization, ER Diagrams, and SQL queries (Unit 7 & 8).",
    durationMinutes: 15,
    moduleTag: "Databases",
    questions: [
      {
        id: 1,
        question: "Which Normal Form removes Partial Dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: 1,
        explanation: "2NF requires the table to be in 1NF and have no partial dependencies."
      },
      {
        id: 2,
        question: "The SQL command to modify an existing record is:",
        options: ["ALTER", "MODIFY", "UPDATE", "CHANGE"],
        correctAnswer: 2,
        explanation: "UPDATE table_name SET column=value..."
      }
    ],
    structuredQuestion: {
      id: "sq_wk4",
      question: "Explain the difference between a Primary Key and a Foreign Key. How do they maintain Referential Integrity?",
      maxMarks: 10
    }
  }
];
