Lesson 8 — Tool Registry, Tool Validation & Multi-Step Tool Calling

1. What is tool calling?

Tool calling allows Gemini to decide that it needs a function from our application to complete a task.

Gemini does not execute the function itself.

Instead, Gemini sends a function call to our TypeScript application.

User
↓
Gemini
↓
Function Call
↓
TypeScript Application
↓
Execute Tool
↓
Tool Result
↓
Gemini
↓
Final Response 2. Gemini chooses the tool

For example, if the user asks:

Calculate 20 × 5.

Gemini can decide to call:

{
"name": "calculate",
"arguments": {
"operation": "multiply",
"a": 20,
"b": 5
}
}

Gemini is responsible for deciding what tool it needs and what arguments to provide.

The application is responsible for actually executing the tool.

3. Tool Registry

Instead of using a large switch statement as the number of tools grows, we can maintain a registry.

const tools = {
calculate: calculateTool,
getWeather: getWeatherTool,
sendEmail: sendEmailTool,
};

The dispatcher can then look up a tool by its name:

const selectedTool = tools[name];

If the tool exists, the application can continue.

If it doesn't:

if (!selectedTool) {
throw new Error(`Unknown tool: ${name}`);
}
Important rule

The application should never guess or execute an unknown tool.

4. Validating Tool Arguments with Zod

Gemini's arguments should be treated as untrusted input.

For the calculator:

const CalculatorArgsSchema = z.object({
operation: z.enum([
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

Before executing the calculator:

const result = CalculatorArgsSchema.safeParse(args);

If validation fails:

if (!result.success) {
throw new Error("Invalid calculator arguments");
}

The calculator should not execute.

5. Why TypeScript assertions aren't enough

This is not sufficient protection:

a as number

That only tells TypeScript:

"Trust me, this is a number."

It doesn't actually check the runtime value.

Gemini could send:

{
"a": "20"
}

Zod actually checks the value:

z.number()

So:

Gemini
↓
Arguments
↓
Zod
↓
Valid? ── No ──→ Reject
↓
Yes
↓
Execute tool 6. Tool Registry + Zod + Execute

A tool registry entry can contain both the schema and the execution function:

const calculateTool = {
schema: CalculatorArgsSchema,

execute: (args: CalculatorArgs) => {
return calculate(
args.operation,
args.a,
args.b
);
},
};

This gives each tool three important responsibilities:

Tool
├── Schema
└── Execute function

The dispatcher handles the overall process.

7. The Dispatcher

The dispatcher receives Gemini's function call.

Its job is to:

Read the function name.
Find the tool in the registry.
Reject unknown tools.
Validate the arguments.
Execute the tool.
Return the result.

The general flow is:

Gemini Function Call
↓
Read tool name
↓
Tool Registry
↓
Tool exists?
↓ ↓
No Yes
↓ ↓
Reject Validate
↓
Valid arguments?
↓ ↓
No Yes
↓ ↓
Reject Execute
↓
Tool Result 8. Multi-Step Tool Calling

Gemini can use more than one tool call when a task requires multiple steps.

For example:

I have ₦300,000. Hotel costs ₦80,000, food costs ₦45,000 and transport costs ₦25,000. Calculate my total expenses and remaining budget.

Gemini could perform:

Call 1
80,000 + 45,000
= 125,000
Call 2
125,000 + 25,000
= 150,000
Call 3
300,000 - 150,000
= 150,000

Final response:

{
"totalExpenses": 150000,
"remainingBudget": 150000
}

This demonstrates that tool calling isn't necessarily a single request → single tool → answer process.

Gemini can use the result of one tool call to determine what to do next.

9. Structured Output After Tool Calling

The calculator performs the actual computation:

calculate("multiply", 20, 5)
↓
100

The structured output schema controls the shape of Gemini's final response:

{
"operation": "multiply",
"a": 20,
"b": 5,
"result": 100
}

The key distinction is:

The tool calculates. The schema shapes the response.

10. Final Zod Validation

Even after Gemini produces structured output, we still validate it.

For example:

const result = ResultSchema.safeParse(parsed);

Why?

Because structured output is a generation constraint, not a replacement for runtime validation.

The application should only use the response after it passes validation.

11. The Complete Architecture
    USER
    │
    ▼
    GEMINI
    │
    ▼
    Function Call
    │
    ▼
    Tool Registry
    │
    Find Tool
    │
    ▼
    Zod Validation
    │
    ┌─────────┴─────────┐
    │ │
    Valid Invalid
    │ │
    ▼ ▼
    Execute Tool Reject
    │ │
    ▼ ▼
    Tool Result ────────► Gemini
    │
    ▼
    Structured Output
    │
    ▼
    Zod Validation
    │
    ▼
    Application
    Main Lesson 8 Takeaway

The most important principle from this lesson is:

AI-generated data should be treated as untrusted input. Validate it before allowing it to affect your application.
