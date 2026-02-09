
import { GoogleGenAI } from "@google/genai";
import { Employee, AnalysisType } from "../types";

export const runAIAnalysis = async (type: AnalysisType | string, orgData: Employee[]): Promise<string> => {
  // Fix: Initializing GoogleGenAI using process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const orgContext = orgData.map(e => `${e.role} (${e.area}): ${e.detail}`).join('\n');
  
  const prompt = `Actúa como un Consultor Estratégico Senior de Nivel Mundial. 
  Analiza la siguiente estructura organizacional y genera un informe de tipo: "${type}".
  
  ESTRUCTURA ACTUAL:
  ${orgContext}
  
  REQUISITOS DEL INFORME:
  - Usa formato Markdown profesional (títulos, negritas, listas).
  - Sé crítico pero constructivo.
  - Si es Diagnóstico, identifica cuellos de botella.
  - Si es Crisis, propón un plan de choque.
  - Si es Futuro, habla de IA y automatización.
  - Responde siempre en ESPAÑOL.
  - Mantén el tono "Executive Gold Standard".`;

  try {
    // Fix: Using 'gemini-3-pro-preview' for complex strategic reasoning and organizational analysis
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    // Fix: Accessing .text as a property, not a method, as per SDK documentation
    return response.text || "No se pudo generar el análisis en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al conectar con la IA Estratégica. Verifique su conexión.";
  }
};
