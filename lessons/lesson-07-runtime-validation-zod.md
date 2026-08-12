Lesson 7 — Zod as the Source of Truth

1. The problem with duplicate schemas

Previously, i defined the travel structure twice.

Zod schema
const TravelSchema = z.object({
destination: z.string(),
country: z.string(),
durationDays: z.number(),
estimatedBudget: z.number(),
activities: z.array(z.string()),
});
Gemini JSON Schema
{
type: "object",
properties: {
destination: { type: "string" },
country: { type: "string" },
durationDays: { type: "integer" },
estimatedBudget: { type: "number" },
activities: {
type: "array",
items: { type: "string" }
}
}
}

The problem is that these are two independent definitions of the same structure.

If one changes and the other doesn't, they can drift apart.

2. Zod becomes the source of truth

i decided that TravelSchema should be our single source of truth.

const TravelSchema = z.object({
destination: z.string(),
country: z.string(),
durationDays: z.number(),
estimatedBudget: z.number(),
activities: z.array(z.string()),
});

From this one schema, i can perform several jobs.

3. Generate Gemini's JSON Schema

Instead of manually writing the Gemini schema:

schema: {
type: "object",
properties: {
...
}
}

i use:

schema: z.toJSONSchema(TravelSchema)

This converts the Zod schema into JSON Schema that can be supplied to Gemini.

So:

TravelSchema
↓
z.toJSONSchema()
↓
Gemini JSON Schema 4. Generate the TypeScript type

i do not need to manually create:

interface TravelPlan {
destination: string;
country: string;
durationDays: number;
estimatedBudget: number;
activities: string[];
}

Instead:

export type TravelPlan = z.infer<typeof TravelSchema>;

Now the type is automatically derived from the schema.

If the schema changes, the TypeScript type changes with it.

5. Validate Gemini's response

Even though Gemini was given the schema, i still validate the actual response:

const result = TravelSchema.safeParse(parsed);

if (!result.success) {
throw new Error("The AI returned invalid travel data");
}

return result.data;

This is important because telling Gemini what format to return is not the same as validating the data the application receives.

6. The complete flow

The application now works like this:

                    TravelSchema
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓

z.toJSONSchema() z.infer() safeParse()
↓ ↓ ↓
Gemini TypeScript Runtime
Schema Type Validation
│
↓
Gemini
│
↓
Structured JSON
│
↓
JSON.parse()
│
↓
safeParse()
│
↓
Valid TravelPlan 7. Important functions learned
Function Purpose
z.object() Creates a Zod object schema
z.string() Requires a string
z.number() Requires a number
z.array() Requires an array
z.infer() Creates a TypeScript type from a Zod schema
z.toJSONSchema() Converts Zod schema to JSON Schema
safeParse() Validates runtime data without throwing
JSON.parse() Converts JSON text into JavaScript data 8. What we actually built

i tested:

npx tsx src/test-travel.ts

and received:

{
"destination": "Abuja",
"country": "Nigeria",
"durationDays": 3,
"estimatedBudget": 150000,
"activities": [
"Picnic and relaxation at Millennium Park",
"Boat riding and window shopping at Jabi Lake and Mall",
"Art appreciation at the Nike Art Gallery",
"Hiking and sightseeing at Usuma Dam",
"Local shopping and tasting Abuja Suya/Kilishi at Wuse Market",
"A scenic drive to view the iconic Zuma Rock"
]
}

That confirms the complete structured-output and validation pipeline is working.

Lesson 7 — Key takeaway

Use Zod as the single source of truth, derive the Gemini JSON Schema and TypeScript type from it, and still validate the actual AI response at runtime.
