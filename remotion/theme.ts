export const theme = {
  primary: '#4F46E5',
  secondary: '#22C55E',
  bg: '#0F172A',
  bgDeep: '#070B17',
  text: '#F8FAFC',
  textDim: '#94A3B8',
  glow: 'rgba(129, 140, 248, 0.55)',
  glowPurple: 'rgba(168, 85, 247, 0.45)',
  glowGreen: 'rgba(34, 197, 94, 0.45)',
  card: 'rgba(148, 163, 184, 0.08)',
  cardBorder: 'rgba(148, 163, 184, 0.18)',
} as const;

import durations from '../public/voice/durations.json';

const FPS = 60;
const TAIL = 0.25;
const fr = (s: number) => Math.round((s + TAIL) * FPS);

export const SCENE_FRAMES = {
  hook: fr(durations.hook),
  intro: fr(durations.intro),
  point1: fr(durations.point1),
  point2: fr(durations.point2),
  point3: fr(durations.point3),
  highlight: fr(durations.highlight),
  outro: fr(durations.outro) + 30,
} as const;
