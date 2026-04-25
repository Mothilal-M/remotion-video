import fs from 'node:fs/promises';
import path from 'node:path';
import {parseBuffer} from 'music-metadata';

const VOICE_ID = process.env.ELEVEN_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb'; // Brian
const MODEL_ID = 'eleven_turbo_v2_5';

const SCENES: Record<string, string> = {
  hook: 'What if... AI could take your interview? No humans. Just pure skill.',
  intro: 'Meet the AI Interview Assistant. Smarter, faster, unbiased hiring.',
  point1:
    'Real-time questions. AI asks dynamic, role-based questions, tailored just for you.',
  point2:
    'Tracks your answers. It analyzes confidence, tone, and accuracy in real time.',
  point3:
    'Instant feedback. Get scores and improvement tips, the moment you finish.',
  highlight: 'No bias. Just talent. AI ensures fair evaluation, for everyone.',
  outro:
    "Ready to crack your next interview? Start now. Follow for more AI tools and tech insights.",
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
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${err}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const outDir = path.resolve('public/voice');
  await fs.mkdir(outDir, {recursive: true});

  const durations: Record<string, number> = {};

  for (const [name, text] of Object.entries(SCENES)) {
    process.stdout.write(`→ ${name.padEnd(10)} `);
    const audio = await tts(text);
    const file = path.join(outDir, `${name}.mp3`);
    await fs.writeFile(file, audio);
    const meta = await parseBuffer(audio, {mimeType: 'audio/mpeg'});
    const seconds = meta.format.duration ?? 0;
    durations[name] = Number(seconds.toFixed(3));
    console.log(`${(audio.length / 1024).toFixed(1)} KB · ${seconds.toFixed(2)}s`);
  }

  await fs.writeFile(
    path.join(outDir, 'durations.json'),
    JSON.stringify(durations, null, 2) + '\n',
  );
  console.log('\n✓ wrote', Object.keys(durations).length, 'clips →', outDir);
  console.log('  durations:', durations);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
