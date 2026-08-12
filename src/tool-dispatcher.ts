import { calculate } from "./tools/calculator.js";

import { CalculatorArgsSchema } from "./schemas/calculator-schema.js";
export async function dispatchTool(
  name: string,
  args: Record<string, unknown>,
) {
  switch (name) {
    case "calculate": {
      const result = CalculatorArgsSchema.safeParse(args);
      if (!result.success) {
        throw new Error("Invalid arguments for calculate tool");
      }

      return calculate(result.data.operations, result.data.a, result.data.b);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
