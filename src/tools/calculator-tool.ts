export const calculatorTool = {
  type: "function",
  name: "calculate",
  description:
    "Performs arithemetic operations such as addition, subtraction, multiplication, division, exponentiation, and modulus on two numbers.",
  parameters: {
    type: "object",
    properties: {
      operation: {
        type: "string",
        enum: ["add", "subtract", "multiply", "divide", "power", "modulus"],
        description: "The mathematical operation to perform",
      },
      a: {
        type: "number",
        description: "The first number",
      },
      b: {
        type: "number",
        description: "The second number",
      },
    },
    required: ["operation", "a", "b"],
  },
};
