import { GoogleGenAI, Type } from "@google/genai";
import { ThinkingSystem, Mindset, SimulationResponse } from "../types";

const getSystemPrompt = (system: ThinkingSystem) => {
  if (system === ThinkingSystem.SYSTEM_1) return "Thinking fast, intuitively, reacting immediately based on gut feeling and habit. Using very little mental energy. Avoiding complexity.";
  return "Thinking slowly, methodically, analyzing logic and details. Exerting significant mental effort. Questioning assumptions. Handling the unknown.";
};

const getMindsetPrompt = (mindset: Mindset) => {
  if (mindset === Mindset.FIXED) return "Believing ability is static. Protecting the 'smart' image. Fearful of failure. Interpreting effort as a lack of talent. Avoiding challenges.";
  return "Believing ability can grow like a muscle. Embracing the challenge. Persisting despite setbacks. Viewing effort as the path to mastery.";
};

export const generateCognitiveResponse = async (
  scenario: string,
  system: ThinkingSystem,
  mindset: Mindset
): Promise<SimulationResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a cognitive psychology simulator based on Daniel Kahneman's 'Thinking, Fast and Slow' and Carol Dweck's 'Mindset'.
    
    The user is a person facing this scenario: "${scenario}"
    
    Current Installed "Software":
    1. OPERATING SYSTEM: ${system} (${getSystemPrompt(system)})
       - System 1 (Default Program): Low energy, fast, habitual. The brain's preference.
       - System 2 (Deep Thinking): High energy, slow, logical. Used for complex, novel problems.
       
    2. MINDSET FILTER: ${mindset} (${getMindsetPrompt(mindset)})
       - Fixed Mindset: Avoids System 2 to look smart without effort. Gives up if System 1 fails.
       - Growth Mindset: Willing to engage System 2 to learn. Sees effort as positive.
    
    Task:
    Based ONLY on this specific combination, simulate the person's reaction.
    
    Output JSON with the following fields in **Simplified Chinese**:
    - internalMonologue: The actual thoughts (inner voice) in Chinese.
    - action: The observable behavior in Chinese.
    - energyLevel: Mental energy consumption (0-100). System 1 is low (10-30), System 2 is high (70-100).
    - stressLevel: Emotional stress/anxiety (0-100).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            internalMonologue: { type: Type.STRING, description: "The inner voice thoughts in Chinese." },
            action: { type: Type.STRING, description: "The observable behavior in Chinese." },
            energyLevel: { type: Type.NUMBER, description: "Mental energy consumed (0-100)." },
            stressLevel: { type: Type.NUMBER, description: "Emotional stress/anxiety (0-100)." },
          },
          required: ["internalMonologue", "action", "energyLevel", "stressLevel"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as SimulationResponse;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for demo purposes if API fails
    return {
      internalMonologue: "我现在脑子有点乱，暂时无法处理...",
      action: "呆住了，没有任何反应。",
      energyLevel: 10,
      stressLevel: 20
    };
  }
};