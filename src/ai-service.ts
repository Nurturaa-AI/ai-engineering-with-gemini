import { z } from "zod";
import { ai } from "./gemini.js";
import { config } from "./config.js";
import { calculatorTool } from "./tools/calculator-tool.js";
import { TravelSchema } from "./schemas/travel-schema.js";

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
  const response = await ai.interactions.create({
    model: config.model,
    input: userInput,
    // responseMimeType: "application/json",
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(TravelSchema),
    },
  });

  const responseText = response.output_text;

  if (typeof responseText !== "string") {
    throw new Error("The AI return invalid response");
  }
  const parsed = JSON.parse(responseText);
  const result = TravelSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error("The AI returned invalid data");
  }
  return result.data;
}
