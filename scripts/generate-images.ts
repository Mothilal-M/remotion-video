import fs from 'node:fs/promises';
import path from 'node:path';

const MODEL = 'gemini-3.1-flash-image-preview';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const VARIANT = process.env.VARIANT === 'landscape' ? 'landscape' : 'portrait';
const ASPECT = VARIANT === 'landscape' ? '16:9' : '9:16';
const OUT_SUBDIR = VARIANT === 'landscape' ? 'images/landscape' : 'images';

const STYLE_BASE =
  'cinematic, ultra detailed, dramatic studio lighting, dark navy and indigo color palette with neon purple and electric green accents, glassmorphism, depth of field, 8k, premium commercial advertisement aesthetic';

const STYLE =
  VARIANT === 'landscape'
    ? `${STYLE_BASE}, wide horizontal 16:9 cinematic composition framed for desktop and YouTube, subject and visual focal point offset toward one side of the frame leaving large negative space on the opposite side for text overlay`
    : `${STYLE_BASE}, vertical 9:16 portrait composition framed for mobile reels`;

const PROMPTS_PORTRAIT: Record<string, string> = {
  hook:
    `A cinematic over-the-shoulder shot of a futuristic holographic AI interview interface floating in a dark room. A glowing translucent question bubble hovers in mid-air with soft particle light. Dark indigo background, deep moody lighting, subtle volumetric fog, neon purple rim light. ${STYLE}`,
  intro:
    `A friendly humanoid AI character portrait, sleek glossy white robot head with glowing indigo eyes, soft purple ambient glow, minimalist studio backdrop with dark navy gradient, professional product render, slightly looking forward. ${STYLE}`,
  point1:
    `A floating holographic conversation panel with multiple glowing chat bubbles arranged in a vertical stack, each containing abstract dynamic question text, indigo to purple gradient bubbles with neon glow, dark cosmic background with soft particles. ${STYLE}`,
  point2:
    `A futuristic data analytics dashboard floating in space, showing animated waveforms, confidence meters, percentage gauges, and tone analysis charts. Indigo and electric green neon accents on translucent dark glass panels, holographic UI. ${STYLE}`,
  point3:
    `A glowing digital report card hovering in mid-air with a large bright score, green checkmarks and improvement tips list, glassmorphism panels, neon green and indigo glow, celebratory clean futuristic UI. ${STYLE}`,
  highlight:
    `A diverse group of professional silhouettes standing in a perfect circle around a glowing central AI core, soft equal lighting on every figure, no preference, abstract symbolic composition, deep navy background, neon green and indigo radial glow representing fairness. ${STYLE}`,
  outro:
    `A sleek glowing rocket launching upward through a dark cosmic sky filled with neon particles and indigo nebula clouds, motion lines, success and momentum theme, electric purple and green trail. ${STYLE}`,
};

const PROMPTS_LANDSCAPE: Record<string, string> = {
  hook:
    `A wide cinematic side-profile shot of a young professional sitting on the right side of the frame, looking at a large glowing translucent holographic AI question bubble floating in front of them. The left half of the frame is empty deep dark space with subtle volumetric fog and neon purple rim light, leaving room for title text overlay. Dark indigo backdrop. ${STYLE}`,
  intro:
    `A friendly humanoid AI character with glossy white head and glowing indigo eyes, positioned on the right third of a wide cinematic frame, looking forward. The left two-thirds of the frame is a clean dark navy gradient with soft purple ambient glow and floating UI panels, leaving space for text overlay. ${STYLE}`,
  point1:
    `A wide horizontal arrangement of four glowing holographic chat bubble UI cards floating across a dark cosmic background, each card containing dynamic question text with indigo to purple gradient and neon glow. Cards arranged in an arc that takes the right two-thirds of the frame. ${STYLE}`,
  point2:
    `A wide futuristic data analytics dashboard occupying the right side of a wide cinematic frame, showing animated waveforms, confidence meters, gauges, tone analysis charts, indigo and electric green neon accents on dark translucent glass panels, with deep dark cosmic empty space on the left for text overlay. ${STYLE}`,
  point3:
    `A glowing digital report card floating on the right side of a wide cinematic frame with a large bright score display, green checkmarks, improvement tips list, glassmorphism, neon green and indigo glow. The left side of the frame is dark empty space for text overlay. ${STYLE}`,
  highlight:
    `A wide cinematic horizontal lineup of diverse professional silhouettes standing across the frame around a glowing central holographic AI core in the middle, equal soft lighting on every figure, deep navy background, electric green and indigo radial glow representing fairness and equal opportunity. ${STYLE}`,
  outro:
    `A sleek glowing rocket launching upward through a wide cinematic dark cosmic sky, the rocket is centered, the sky is filled with horizontal sweeping neon particles and indigo nebula clouds, motion blur trails of electric purple and green, success and momentum. ${STYLE}`,
};

const PROMPTS = VARIANT === 'landscape' ? PROMPTS_LANDSCAPE : PROMPTS_PORTRAIT;

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
        imageConfig: {aspectRatio: ASPECT},
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
    if (p.inlineData?.data) {
      return Buffer.from(p.inlineData.data, 'base64');
    }
  }
  console.error('  ! no inlineData in response', JSON.stringify(data).slice(0, 400));
  return null;
}

async function main() {
  const outDir = path.resolve('public', OUT_SUBDIR);
  await fs.mkdir(outDir, {recursive: true});
  console.log(`Variant: ${VARIANT} (${ASPECT}) → ${outDir}\n`);

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
    const file = path.join(outDir, `${name}.png`);
    await fs.writeFile(file, buf);
    console.log(`${(buf.length / 1024).toFixed(1)} KB`);
  }
  console.log(`\n✓ ${Object.keys(PROMPTS).length} images written to ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
