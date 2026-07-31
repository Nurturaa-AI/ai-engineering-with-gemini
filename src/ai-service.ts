import { ai } from "./gemini.js";
import { config } from "./config.js";
import { calculatorTool } from "./tools/calculator-tool.js";

export async function askQuestion(userInput: string) {
  const stream = await ai.interactions.create({
    // Your request parameters here
    model: config.model,
    input: userInput,
    stream: true,
    tools: [calculatorTool as any],
  });

  return stream;
}
