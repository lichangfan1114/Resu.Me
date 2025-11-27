import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const optimizeText = async (text: string, context: 'summary' | 'experience' | 'project'): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    let prompt = "";
    if (context === 'summary') {
      prompt = `You are a professional resume writer. Rewrite the following professional summary to be more impactful, concise, and professional. Keep the same language (if Chinese, keep Chinese). strictly return only the rewritten text without quotes or explanations.\n\nOriginal text: ${text}`;
    } else {
      prompt = `You are a professional resume writer. Rewrite the following project or experience description to highlight achievements and technical skills. Keep the same language. strictly return only the rewritten text.\n\nOriginal text: ${text}`;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return text; // Fallback to original text on error
  }
};
