const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is not set in the environment variables or missing.",
  );
}
export const config = {
  apiKey: process.env.GEMINI_API_KEY!,
  model: "gemini-3.5-flash",
};
