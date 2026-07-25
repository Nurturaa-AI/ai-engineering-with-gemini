# Lesson 2 - Gemini API

## Learning Objectives

- Understand APIs.
- Make the first request to Gemini.
- Read AI responses.

---

## Important Packages

```bash
npm install @google/genai dotenv
```

Project Structure
src/
├── config.ts
├── gemini.ts
├── ai-service.ts
└── index.ts
Making a Request
const interaction = await ai.interactions.create({
model: "gemini-3.6-flash",
input: "Explain React Hooks",
});
What Happens
Application
↓
Gemini SDK
↓
Gemini API
↓
AI Model
↓
Response
Errors I Encountered
Invalid API Key
400 API_KEY_INVALID

Solution

Generated a new API key.
Updated .env.
Consumer Suspended
403 CONSUMER_SUSPENDED

Solution

Created another project.
Generated a fresh API key.
Key Takeaways
Never hardcode API keys.
Store them in .env.
Keep API logic separate.
