import { z } from "zod";

export const CalculatorArgsSchema = z.object({
  operations: z.enum([
    "add",
    "subtract",
    "multiply",
    "divide",
    "power",
    "modulus",
  ]),
  a: z.number(),
  b: z.number(),
});
