Objective

Learn how Large Language Models (LLMs) interact with external code and APIs through tools, enabling AI applications to perform real-world actions instead of only generating text.

1. What is Tool Calling?

A Large Language Model cannot directly execute code, access databases, or call APIs.

Instead, it decides when a tool should be used and returns structured information describing:

- which tool to call
- what arguments to pass

The application is responsible for executing the tool and returning the result to the LLM.

2. LLM vs Application Responsibilities

- LLM Responsibilities
- Understand the user's request.
- Decide whether a tool is needed.
- Choose the appropriate tool.
- Generate the required arguments.
- Produce a natural language response using the tool result.

Application Responsibilities

- Receive the tool request.
- Validate the tool name and arguments.
- Execute the correct TypeScript function.
- Return the result to the LLM.

3. Tool Calling Flow
   User
   │
   ▼
   Gemini
   │
   ▼
   Chooses Tool
   │
   ▼
   TypeScript Application
   │
   ▼
   Runs Function
   │
   ▼
   Returns Result
   │
   ▼
   Gemini
   │
   ▼
   Natural Language Response

4. Separating Business Logic from AI

The application should separate the actual implementation from the AI description.

Example:

calculator.ts

Contains:

- calculation logic
- business rules
- validation

Example:

calculator-tool.ts

Contains:

- tool schema
- description
- parameters
- JSON schema

This follows the Single Responsibility Principle.

5. Tool Schema

A tool schema tells the LLM:

- tool name
- purpose
- parameters
- parameter types
- required fields

Example information:

Tool Name:
calculate

Parameters:
operation
a
b

The schema is documentation for the AI, not the implementation.

6. Why Separate Schema and Logic?

Benefits:

- Cleaner architecture
- Easier maintenance
- Easier testing
- Reusable business logic
- AI provider can change without changing business logic

7. Tool Registry

Instead of hardcoding many switch statements, register tools in one place.

Example:

Tool Registry

Contains all available tools:

- calculate
- weather
- email
- searchProducts

Advantages:

- Easy to add tools
- Centralized management
- Scalable architecture

8. Dispatcher

The dispatcher receives the tool name from Gemini.

Responsibilities:

- Find the correct tool.
- Execute it.
- Reject unknown tools.

Example flow:

Gemini
│
▼
calculate
│
▼
Dispatcher
│
▼
calculate()

9. Unknown Tool Handling

Never execute unknown tool names.

Incorrect:

Guess which tool Gemini meant.

Correct:

Reject the request.
Return an error.

This improves:

- security
- predictability
- reliability

10. Tool Selection Examples

User:

Multiply 20 by 3

Tool:

calculate

Arguments:

operation = multiply
a = 20
b = 3

User:

Weather in Abuja

Tool:

getWeather

Arguments:

city = Abuja

User:

Wireless headphones under $150

Tool:

searchProducts

Arguments:

query = wireless headphones under 150 dollars

11. Multi-Step Tool Calling

Some requests require multiple tools.

Example:

Email John today's weather in Abuja.

Possible workflow:

Weather Tool
│
▼
Current Weather
│
▼
Email Tool
│
▼
Email Sent

One user request may require multiple tool calls.

12. Software Engineering Principles Learned

- Single Responsibility Principle (SRP)
- Separation of Concerns
- Encapsulation
- Explicit Tool Registration
- Fail Securely
- Least Privilege
- Modular Architecture

13. Mental Model

LLMs think.

Tools perform actions.

Your application connects the two.

LLM
│
▼
Chooses Tool
│
▼
Dispatcher
│
▼
Business Logic
│
▼
Result
│
▼
LLM
│
▼
User

14. Key Takeaways

- LLMs do not execute code directly.
- Tool schemas describe available functions to the AI.
- Business logic should remain independent of the AI provider.
- A dispatcher safely routes tool calls.
- Unknown tools must never be executed.
- Tool registries make applications scalable.
- Complex AI agents combine reasoning with multiple specialized tools.

Skills Gained

By completing Lesson 5, I can now:

- Explain how tool calling works in modern LLMs.
- Design JSON tool schemas.
- Separate AI schemas from business logic.
- Build modular and maintainable tool architectures.
- Create a tool registry and dispatcher.
- Securely validate and execute tool calls.
- Understand multi-step AI workflows.
- Apply software engineering best practices to AI applications.
