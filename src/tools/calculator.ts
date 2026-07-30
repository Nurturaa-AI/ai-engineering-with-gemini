export type Operation =
  | "add"
  | "subtract"
  | "multiply"
  | "divide"
  | "power"
  | "modulus";

export function calculate(operation: Operation, a: number, b: number): number {
  switch (operation) {
    case "add":
      return a + b;

    case "subtract":
      return a - b;

    case "multiply":
      return a * b;

    case "divide":
      if (b === 0) {
        throw new Error("Cannot divide by zero");
      }
      return a / b;

    case "power":
      return Math.pow(a, b);

    case "modulus":
      if (b === 0) {
        throw new Error("Cannot calculate modulus with zero");
      }
      return a % b;
  }
}
