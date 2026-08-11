import { ai } from "./gemini.js";
import { config } from "./config.js";
import { calculatorTool } from "./tools/calculator-tool.js";
import { travelSchema } from "./schemas/travel-schema.js";

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

export async function generateTravelPlan(userInput: string) {
  const stream = await askQuestion(userInput);

  // Wait until the full answer arrives from the stream.
  let fullResponse = "";

  for await (const event of stream) {
    if (event.event_type === "step.delta" && event.delta?.type === "text") {
      fullResponse += event.delta.text;
    }
  }

  const parsed = JSON.parse(fullResponse);
  const result = travelSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error("The AI returned invalid data");
  }
  return result.data;
}
