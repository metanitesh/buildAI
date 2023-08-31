// app/api/completion/route.ts

import { OpenAI } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY,})

function buildPrompt(prompt: string) {
  return prompt.split('\n').map((message) => (
    {
    role: 'user',
    content: `return all the links in the json format from the following message in the format of {link: author}: ${message} `,
  }));
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
  console.log("prompt", prompt)

  const values = chunkText(prompt, prompt.length / 10)

  console.log("values", values)

  
  // for (const chunk of values) {
  
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: buildPrompt(prompt),
      max_tokens: 500,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    } as any)
    
    console.log(response)
    
  // }
  const stream = OpenAIStream(response as any)
    
  return new StreamingTextResponse(stream)

  // Request the OpenAI API for the response based on the prompt
  

  // Convert the response into a friendly text-stream
  

  // Respond with the stream
  
}