import fs from 'node:fs/promises';
import path from 'node:path';
import {parseBuffer} from 'music-metadata';

const VOICE_ID = process.env.ELEVEN_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb'; // Brian
const MODEL_ID = 'eleven_turbo_v2_5';

const SCENES: Record<string, string> = {
  intro: 'An AI interview, in four stages.',
  stage1: 'First, apply. Upload your resume, pick a role, and set your availability.',
  stage2:
    'Then, the interview. The AI asks dynamic, role-based questions, in real time.',
  stage3:
    'Next, analyze. Confidence, tone, clarity, and accuracy — all scored live.',
  stage4: 'Finally, feedback. Instant scores, strengths, and tips to improve.',
  outro: 'Four stages. From application to insight. Powered by AI.',
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
          stability: 0.4,
          similarity_boost: 0.78,
          style: 0.45,
          use_speaker_boost: true,
        },
      }),
    },
  );
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const outDir = path.resolve('public/voice/flow');
  await fs.mkdir(outDir, {recursive: true});

  const durations: Record<string, number> = {};
  for (const [name, text] of Object.entries(SCENES)) {
    process.stdout.write(`→ ${name.padEnd(8)} `);
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
  console.log('\n✓ flow voice ready:', durations);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
