import OpenAI from "openai";

const apiKey = "";
const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the world series in 2020?" },
      {
        role: "assistant",
        content: "The Los Angeles Dodgers won the World Series in 2020.",
      },
      { role: "user", content: "Where was it played?" },
    ],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}

export const getAIResponse = async ({ prompt }: { prompt: string }) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        // content: "Write a haiku about recursion in programming.",
        content: prompt,
      },
    ],
  });
  return completion.choices[0].message?.content;
};
