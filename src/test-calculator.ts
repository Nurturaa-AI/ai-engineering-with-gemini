import { calculate } from "./tools/calculator.js";

console.log("Testing calculator...\n");

console.log(calculate("add", 8, 2));
console.log(calculate("subtract", 8, 2));
console.log(calculate("multiply", 8, 2));
console.log(calculate("divide", 8, 2));
try {
  console.log(calculate("divide", 10, 0));
} catch (error) {
  console.error("Expected error:", (error as Error).message);
}
