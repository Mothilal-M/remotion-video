import fs from 'node:fs/promises';
import path from 'node:path';
import {parseBuffer} from 'music-metadata';

const VOICE_ID = process.env.ELEVEN_VOICE_ID ?? 'JBFqnCBsd6RMkjVDRZzb'; // George (warm mature British, documentary)
const MODEL_ID = 'eleven_turbo_v2_5';

const SCENES: Record<string, string> = {
  hook:
    "When people hear AI architecture, they usually imagine a complicated diagram full of words like LLM, RAG, agents, tools, memory, MCP, vector database, evals, and orchestration. But if we simplify everything, modern AI architecture is built around two core ideas. Reasoning, and acting. Reasoning means the AI decides what should happen next. Acting means the AI actually does something in the real world. It searches data, calls an API, reads a file, writes code, sends a request, or uses a tool. And this is the main difference between a simple chatbot and an AI agent. A chatbot mostly responds. An agent reasons, acts, observes the result, and then reasons again. In this video, let's break down AI architecture using only these two ideas.",
  core:
    "Here is the simplest mental model. Reasoning is the brain. Acting is the hands. Observation is the feedback. Imagine you ask an AI to analyze last week's sales data and give you three improvement suggestions. A basic chatbot may give you generic advice. Improve marketing, optimize pricing, talk to customers. That sounds useful, but it is not actually based on your real data. An AI agent should behave differently. First, it reasons. Where is the sales data? What date range does the user mean? Which metrics matter? Do I need to query a database? Then it acts. It calls a database tool, fetches the report, reads the numbers, compares trends, and creates a final answer. That full cycle is the foundation of AI agent architecture.",
  reasoning:
    "The first major layer is the reasoning layer. This is where the AI tries to understand the user's goal. It asks internally. What is the task? What information do I already have? What information is missing? Can I answer directly, or do I need a tool? Is this a safe action? Good AI systems do not jump straight to the final answer. They first build a plan. For example, if the user says, help me prepare for an interview, the AI needs to reason. Is this a coding interview, a system design interview, or behavioral? What role is the user targeting? How much time do they have? This is why reasoning is so important. It turns a vague request into a structured plan. In production, reasoning is guided by system prompts, examples, policies, and explicit planning steps. The better the structure, the more reliable the AI becomes.",
  acting:
    "The second major layer is the acting layer. Acting means the AI can use tools. Without tools, an AI model is limited to text generation. With tools, it can interact with external systems. Tools can be search, database queries, file reading, code execution, calendar access, email, CRM, payment systems, and internal APIs. The model does not magically know your private company data. It does not know today's sales report unless the system gives it access. That is why tools matter. Tools connect the AI to the real world. Think of tools as the hands of the AI system. The model decides, I need the sales report. The system calls a tool, like getSalesReport, last seven days. The tool returns data. Then the model reads the result and reasons again. This is where AI becomes more than a text generator. It becomes a task solving system.",
  loop:
    "Now let's connect reasoning and acting into one loop. A typical AI agent loop looks like this. Think, act, observe, think, answer. Step one. The user gives a goal. For example, review this landing page and suggest improvements. Step two. The AI thinks. It decides, I need the page copy, analytics data, and maybe user feedback. Step three. The AI acts. It reads the page, fetches analytics, and searches feedback notes. Step four. The AI observes. It sees that the bounce rate is high, the headline is unclear, and the call to action is too low on the page. Step five. The AI thinks again. It connects the evidence and identifies the main problem. Step six. The AI answers. It gives suggestions based on actual data. That is the key difference. A chatbot gives an answer. An agent follows a process.",
  safety:
    "But there is one more important part of AI architecture. Safety. If an AI can act, then we need control. Because not every action has the same risk. Reading a document is usually low risk. Writing to a database is higher risk. Sending an email is even higher risk. Deleting data, deploying code, or making a payment can be very risky. So a good AI architecture separates actions into risk levels. For low risk actions, the system can let the AI proceed automatically. For high risk actions, the system should ask for human approval. For example, I found the draft email. Do you want me to send it? That approval step is very important. Reasoning without safety can create confident mistakes. Acting without control can create real damage. Production AI agents need permissions, logging, approval flows, and clear tool boundaries.",
  closing:
    "So if you want to understand AI architecture, remember this simple model. Reasoning is deciding. Acting is doing. Observation is learning from the result. The AI receives a goal. It reasons. It uses tools. It observes what happened. Then it reasons again. Finally, it answers or completes the task. This is why modern AI systems are moving beyond chatbots. They are becoming research assistants, coding agents, sales copilots, hiring assistants, healthcare assistants, and operations agents. Different products, same foundation. Reasoning plus acting. If you understand this loop, you can understand almost any AI agent architecture. What do you think will be the most useful AI agent action in the next few years? Let me know in the comments.",
};

async function tts(text: string): Promise<Buffer> {
  const apiKey = process.env.ELEVEN_API_KEY;
  if (!apiKey) throw new Error('ELEVEN_API_KEY is not set');
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.8,
          style: 0.25,
          use_speaker_boost: true,
        },
      }),
    },
  );
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const outDir = path.resolve('public/voice/architecture');
  await fs.mkdir(outDir, {recursive: true});

  const durations: Record<string, number> = {};
  for (const [name, text] of Object.entries(SCENES)) {
    process.stdout.write(`→ ${name.padEnd(10)} `);
    const audio = await tts(text);
    await fs.writeFile(path.join(outDir, `${name}.mp3`), audio);
    const meta = await parseBuffer(audio, {mimeType: 'audio/mpeg'});
    const seconds = meta.format.duration ?? 0;
    durations[name] = Number(seconds.toFixed(3));
    console.log(`${(audio.length / 1024).toFixed(1)} KB · ${seconds.toFixed(2)}s`);
  }
  await fs.writeFile(
    path.join(outDir, 'durations.json'),
    JSON.stringify(durations, null, 2) + '\n',
  );
  const total = Object.values(durations).reduce((a, b) => a + b, 0);
  console.log(
    `\n✓ ${Object.keys(durations).length} clips · total ${total.toFixed(1)}s (${(total / 60).toFixed(1)} min)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
