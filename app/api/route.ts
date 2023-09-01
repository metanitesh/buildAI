// app/api/completion/route.ts

import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

function buildPrompt(prompt: string) {
  const userPrompt = `
  context : ${prompt}
  Instructions : Find all the links in the context provided by user, anything that starts with http or https is a link
  Example : http://google.com 
  Output in html format 
  Example: <ol><li class="list-disc"><a class="nderline text-blue-600 hover:text-blue-800 visited:text-purple-600" target="_blank" href="http://google.com">http://google.com - Nitesh</li></ol>
  Make sure to capture all the links`;
  return [
    {
      role: "user",
      content: userPrompt,
    },
  ];
}

function chunkText(inputText: string, chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < inputText.length; i += chunkSize) {
    chunks.push(inputText.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  console.log("prompt", prompt);

  const values = chunkText(prompt, prompt.length / 10);

  console.log("values", values);

  // for (const chunk of values) {

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: buildPrompt(prompt),
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  } as any);

  // }
  const stream = OpenAIStream(response as any);

  return new StreamingTextResponse(stream);

  // Request the OpenAI API for the response based on the prompt

  // Convert the response into a friendly text-stream

  // Respond with the stream
}
