import "dotenv/config";
import { generateTravelPlan } from "./ai-service.js";

async function test() {
  try {
    const result = await generateTravelPlan(
      "Give me a 3 day travel plan for Abuja with a budget of 150000 naira",
    );

    console.log("\nTravel Plan:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
