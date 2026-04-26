import durations from '../../public/voice/architecture/durations.json';
import {theme} from '../theme';

export const ARCH_FPS = 30;
const TAIL = 0.4;
const fr = (s: number) => Math.round((s + TAIL) * ARCH_FPS);

export type Section = {
  id: string;
  number: string;
  title: string;
  durationInFrames: number;
  audio: string;
  accent: string;
  glow: string;
  image: string;
  imagePan: {x: number; y: number};
};

export const SECTIONS: Section[] = [
  {
    id: 'hook',
    number: '00',
    title: 'The Hook',
    durationInFrames: fr(durations.hook),
    audio: 'voice/architecture/hook.mp3',
    accent: theme.primary,
    glow: theme.glow,
    image: 'images/architecture/hook.png',
    imagePan: {x: -20, y: -10},
  },
  {
    id: 'core',
    number: '01',
    title: 'The Core Idea',
    durationInFrames: fr(durations.core),
    audio: 'voice/architecture/core.mp3',
    accent: '#A855F7',
    glow: theme.glowPurple,
    image: 'images/architecture/core.png',
    imagePan: {x: 15, y: -5},
  },
  {
    id: 'reasoning',
    number: '02',
    title: 'Layer 1 · Reasoning',
    durationInFrames: fr(durations.reasoning),
    audio: 'voice/architecture/reasoning.mp3',
    accent: '#818CF8',
    glow: theme.glow,
    image: 'images/architecture/reasoning.png',
    imagePan: {x: -15, y: 0},
  },
  {
    id: 'acting',
    number: '03',
    title: 'Layer 2 · Acting',
    durationInFrames: fr(durations.acting),
    audio: 'voice/architecture/acting.mp3',
    accent: '#22C55E',
    glow: theme.glowGreen,
    image: 'images/architecture/acting.png',
    imagePan: {x: 20, y: -10},
  },
  {
    id: 'loop',
    number: '04',
    title: 'The Agent Loop',
    durationInFrames: fr(durations.loop),
    audio: 'voice/architecture/loop.mp3',
    accent: '#A855F7',
    glow: theme.glowPurple,
    image: 'images/architecture/loop.png',
    imagePan: {x: 0, y: -5},
  },
  {
    id: 'safety',
    number: '05',
    title: 'Safety & Control',
    durationInFrames: fr(durations.safety),
    audio: 'voice/architecture/safety.mp3',
    accent: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.45)',
    image: 'images/architecture/safety.png',
    imagePan: {x: -10, y: 5},
  },
  {
    id: 'closing',
    number: '06',
    title: 'The Recap',
    durationInFrames: fr(durations.closing) + 30,
    audio: 'voice/architecture/closing.mp3',
    accent: '#22C55E',
    glow: theme.glowGreen,
    image: 'images/architecture/closing.png',
    imagePan: {x: 10, y: -10},
  },
];

export const ARCH_DURATION_IN_FRAMES = SECTIONS.reduce(
  (a, s) => a + s.durationInFrames,
  0,
);
