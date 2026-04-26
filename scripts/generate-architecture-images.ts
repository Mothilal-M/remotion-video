import fs from 'node:fs/promises';
import path from 'node:path';

const MODEL = 'gemini-3.1-flash-image-preview';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const STYLE =
  'cinematic still frame, ultra detailed, dramatic studio lighting, depth of field, film grain, color graded with deep navy shadows and warm subtle highlights, premium documentary aesthetic, 8k, wide horizontal 16:9 composition framed for desktop YouTube, atmospheric volumetric fog, subject offset to one side leaving large clean negative space on the opposite side for text overlay, no on-screen text, no labels, no captions, no logos';

const PROMPTS: Record<string, string> = {
  hook:
    `An over-the-shoulder cinematic shot of a person silhouetted in front of a vast wall of glowing complex AI architecture diagrams floating in dark space, faint connections between nodes, jargon-dense complexity made visually beautiful, deep navy and indigo background, hints of electric purple and teal, moody volumetric lighting from above. ${STYLE}`,
  core:
    `A minimalist cinematic still of three glowing translucent abstract spheres arranged in a triangular formation in deep dark space, connected by faint flowing energy threads, representing a brain, a hand, and an eye in pure abstract form, no literal anatomy, deep navy with soft indigo and electric green ambient glow, ultra clean negative space. ${STYLE}`,
  reasoning:
    `A cinematic still of a futuristic translucent blueprint hovering in dark space, faintly visible architectural planning lines and node connections forming a thoughtful pattern, deep navy background with electric blue and faint purple accents, scattered orbital data fragments. ${STYLE}`,
  acting:
    `A cinematic still of a darkened control room with glowing holographic tool icons and API endpoints floating in mid-air, interconnected by faint neon green data streams, deep navy and electric green palette, moody atmospheric lighting, sense of mechanical precision. ${STYLE}`,
  loop:
    `A cinematic still of a glowing circular orbital ring of light suspended in deep dark space, faint motion blur trails along its circumference, sense of perpetual motion, deep navy with indigo, purple, and pink gradient highlights, vast clean background. ${STYLE}`,
  safety:
    `A cinematic still of a luminous translucent security gateway with vertical light barriers in a dark moody industrial corridor, faint amber and red warning glows from below, deep navy shadows, sense of caution and control, atmospheric haze. ${STYLE}`,
  closing:
    `A cinematic wide aerial still of a vast dark landscape at twilight with multiple glowing parallel pathways of light extending toward a bright horizon, sense of journey, possibility, and momentum, deep navy sky with subtle aurora of indigo and electric green, calm but powerful. ${STYLE}`,
};

async function generate(prompt: string): Promise<Buffer | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{role: 'user', parts: [{text: prompt}]}],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: {aspectRatio: '16:9'},
      },
    }),
  });
  if (!res.ok) {
    console.error('  ! HTTP', res.status, await res.text().catch(() => ''));
    return null;
  }
  const data: any = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) {
    if (p.inlineData?.data) return Buffer.from(p.inlineData.data, 'base64');
  }
  console.error('  ! no inlineData', JSON.stringify(data).slice(0, 300));
  return null;
}

async function main() {
  const outDir = path.resolve('public/images/architecture');
  await fs.mkdir(outDir, {recursive: true});
  for (const [name, prompt] of Object.entries(PROMPTS)) {
    process.stdout.write(`→ ${name.padEnd(10)} `);
    let buf: Buffer | null = null;
    for (let attempt = 1; attempt <= 3 && !buf; attempt++) {
      buf = await generate(prompt);
      if (!buf) {
        console.log(`  retry ${attempt}/3`);
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
    if (!buf) {
      console.log('  FAILED');
      continue;
    }
    await fs.writeFile(path.join(outDir, `${name}.png`), buf);
    console.log(`${(buf.length / 1024).toFixed(1)} KB`);
  }
  console.log(`\n✓ written to ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
