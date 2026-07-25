# Lesson 1 - LLM Basics

## Learning Objectives

- Understand what a Large Language Model (LLM) is.
- Learn how LLMs generate text.
- Understand tokens and embeddings.

---

## Key Concepts

### What is an LLM?

A Large Language Model (LLM) is an AI model trained on a large amount of text. It predicts the next token based on the context it receives.

### Tokens

Tokens are small pieces of text that an LLM processes instead of complete words or sentences.

Example:

"ChatGPT is amazing"

may become

["Chat", "G", "PT", " is", " amazing"]

### Embeddings

Embeddings convert tokens into numerical vectors so the AI can understand relationships between words.

Example:

Dog → [0.12, -0.56, ...]

Cat → [0.11, -0.54, ...]

The vectors are close because the meanings are similar.

---

## How an LLM Generates Text

1. Receive the prompt.
2. Break it into tokens.
3. Convert tokens into embeddings.
4. Predict the next token.
5. Repeat until complete.

---

## Real-world Applications

- Chatbots
- AI assistants
- Code generation
- Email writing
- Translation
- Summarization

---

## What I Learned

- LLMs do not know facts.
- They predict the next token.
- Tokens are not always complete words.
- Embeddings help the AI understand meaning.
