import "dotenv/config";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { askQuestion } from "./ai-service.js";

const rl = readline.createInterface({ input, output });
async function main() {
  console.log("...Gemini Chat Session Started...");
  console.log('Type "exit" or "quit" to quit.\n');
  try {
    while (true) {
      const userInput = await rl.question("Ask me any question:\n> ");
      const cleanInput = userInput.trim().toLowerCase();
      if (!cleanInput) continue;
      if (cleanInput === "exit" || cleanInput === "quit") {
        console.log("\nAI: Goodbye!");
        break;
      }

      console.log("\nAI is typing...");
      const stream = await askQuestion(userInput);
      process.stdout.write("\nAI: ");
      for await (const event of stream) {
        switch (event.event_type) {
          case "step.delta":
            if (event.delta?.type === "text") {
              process.stdout.write(event.delta.text);
            }
            break;

          case "error":
            console.error("\nError:", event.error?.message);
            break;

          case "interaction.completed":
            console.log("\n");
            break;
        }
      }
    }
  } catch (error) {
    console.error("Error during interaction:", error);
  } finally {
    rl.close();
  }
}
main();
