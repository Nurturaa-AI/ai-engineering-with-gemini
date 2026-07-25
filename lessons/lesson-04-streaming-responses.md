# Lesson 4 - Streaming Responses

## Why Stream?

Instead of waiting for the whole response...

```
████████████
```

...the user sees words appear immediately.

```
Hello...
How...
Are...
You...
```

## Stream vs Event

Stream

```
Stream
├── Event 1
├── Event 2
├── Event 3
└── Event 4
```

Event

One piece of data from the stream.

## Reading a Stream

```ts
for await (const event of stream) {
    ...
}
```

Why not `for...of`?

Because the data arrives asynchronously.

## Common Events

- interaction.created
- step.delta
- interaction.completed
- error

## Architecture

```
index.ts

↓

ai-service.ts

↓

Gemini SDK

↓

Gemini
```

## Problems Encountered

### 503 High Demand

Cause

Gemini server overloaded.

Solution

Retry later.

### Switching on event before loop

Incorrect.

Need to read events first.

## Key Takeaways

- Streams produce events.
- Use `for await...of`.
- Handle errors.
- Separate UI from API logic.
