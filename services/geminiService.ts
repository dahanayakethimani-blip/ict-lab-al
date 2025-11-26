
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = 'gemini-2.5-flash';

export const askSyllabusTutor = async (question: string): Promise<string> => {
  try {
    const systemInstruction = `
      You are an expert ICT Tutor for Grade 12 and 13 students in Sri Lanka.
      
      **Your Persona:**
      - You are friendly, encouraging, and explain concepts simply.
      - You CAN explain in **Sinhala** or **Tamil** if the user asks, or if the user asks in those languages.
      - You are aware of the local A/L syllabus structure.
      
      **Syllabus Scope:**
      1. Data vs Information, Quality of Information.
      2. Computer Architecture (Von Neumann, Evolution, Input/Output/Storage).
      3. Data Representation (Number systems, Logic Gates, Boolean Algebra).
      4. Operating Systems (Process Management, Memory Management).
      5. Data Communication & Networking (OSI, TCP/IP, Signals).
      6. Systems Analysis and Design (SDLC, SSADM).
      7. Database Management.
      8. Programming (Python).
      10. Web Development (HTML, PHP, E-Commerce).
      11. Internet of Things (IoT).
      12. ICT in Business.
      13. New Trends (AI, Agents, Quantum).

      **Rules:**
      - Keep answers concise and educational.
      - Use analogies relevant to Sri Lankan students where possible.
      - Format output with Markdown (bold key terms, lists).
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the knowledge base right now. Please check your API key.";
  }
};

export const explainMcq = async (question: string, options: string[], correctOption: string): Promise<string> => {
  try {
    const prompt = `
      Explain why option "${correctOption}" is the correct answer for this ICT multiple choice question:
      "${question}"
      
      The options were:
      ${options.map((o, i) => `${i + 1}. ${o}`).join('\n')}
      
      Briefly explain why the correct option is right and why the others might be incorrect or misleading. Keep it short (under 100 words).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Unable to generate explanation.";
  } catch (error) {
    return "Error connecting to AI tutor.";
  }
};

export const gradeStructuredAnswer = async (questionContext: string, studentAnswer: string): Promise<string> => {
  try {
    const prompt = `
      You are grading a Grade 12/13 ICT exam paper.
      
      Question Context:
      ${questionContext}
      
      Student's Answer:
      "${studentAnswer}"
      
      Please evaluate this answer. 
      1. Is it correct?
      2. Give it a score out of 10 based on accuracy and completeness relevant to the AL ICT syllabus.
      3. Provide the ideal model answer.
      
      Format nicely with Markdown.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Unable to grade answer.";
  } catch (error) {
    return "Error connecting to AI grader.";
  }
};

export const runPythonCode = async (code: string): Promise<string> => {
  try {
    const prompt = `
      Act as a Python Interpreter. 
      Execute the following Python code and return ONLY the output.
      If there is an error, explain the error simply for a Grade 12 student.
      Do not provide any conversational filler, just the output or the error explanation.

      Code:
      ${code}
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "No output generated.";
  } catch (error) {
    return "Error executing code via AI service.";
  }
};

export const runPhpCode = async (code: string): Promise<string> => {
  try {
    const prompt = `
      Act as a PHP Server.
      Interpret the following PHP code mixed with HTML.
      Return the final rendered HTML output that the browser would see.
      If the user uses 'echo' or 'print', show that output.
      If there are syntax errors, describe them briefly.
      
      Code:
      ${code}
    `;
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "No output.";
  } catch (error) {
    return "Error interpreting PHP.";
  }
};

export const simulateAgentSystem = async (goal: string): Promise<string> => {
  try {
    const prompt = `
      Simulate a Multi-Agent System (Unit 13.2 of ICT Syllabus) attempting to solve this goal: "${goal}".
      
      There are 3 agents:
      1. Coordinator Agent (Manages tasks)
      2. Research Agent (Finds information)
      3. Report Agent (Formats output)

      Generate a JSON response representing the conversation log between them.
      Format:
      [
        {"agent": "Coordinator", "message": "..."},
        {"agent": "Research", "message": "..."},
        ...
      ]
      
      Keep it short (max 5 turns). Return ONLY valid JSON.
    `;
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return response.text || "[]";
  } catch (error) {
    return "[]";
  }
};

export const generateProgressReport = async (stats: any): Promise<string> => {
  try {
    const prompt = `
      You are an Academic Advisor for an ICT student. 
      Here are their recent performance stats by module:
      ${JSON.stringify(stats)}
      
      Generate a short, personalized "Progress Report" card.
      1. Identify one major Strength (High score).
      2. Identify one major Weakness (Low score).
      3. Provide 2 specific actionable tips to improve the weakness based on the Sri Lankan A/L ICT Syllabus.
      
      Format with Markdown. Be encouraging but direct.
    `;
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Unable to generate report.";
  } catch (error) {
    return "Error generating progress report.";
  }
};
