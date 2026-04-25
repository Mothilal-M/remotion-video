import durations from '../../public/voice/flow/durations.json';
import {theme} from '../theme';

const FPS = 60;
const fr = (s: number) => Math.round(s * FPS);

export const FLOW_FPS = FPS;

const introF = fr(durations.intro);
const s1F = fr(durations.stage1);
const s2F = fr(durations.stage2);
const s3F = fr(durations.stage3);
const s4F = fr(durations.stage4);
const outroF = fr(durations.outro);

export const FLOW_FRAMES = {
  introStart: 0,
  introEnd: introF,
  s1Start: introF,
  s1End: introF + s1F,
  s2Start: introF + s1F,
  s2End: introF + s1F + s2F,
  s3Start: introF + s1F + s2F,
  s3End: introF + s1F + s2F + s3F,
  s4Start: introF + s1F + s2F + s3F,
  s4End: introF + s1F + s2F + s3F + s4F,
  outroStart: introF + s1F + s2F + s3F + s4F,
  outroEnd: introF + s1F + s2F + s3F + s4F + outroF,
};

export const FLOW_DURATION_IN_FRAMES = FLOW_FRAMES.outroEnd;

export const WORLD_HEIGHT = 2900;

export type Stage = {
  index: number;
  label: string;
  short: string;
  bullets: string[];
  icon: string;
  color: string;
  glow: string;
  pos: {x: number; y: number};
  cardSide: 'left' | 'right';
  startFrame: number;
  endFrame: number;
  audio: string;
};

export const STAGES: Stage[] = [
  {
    index: 0,
    label: 'Apply',
    short: 'STAGE 01',
    bullets: ['Upload resume', 'Pick a role', 'Set availability'],
    icon: '📝',
    color: '#4F46E5',
    glow: theme.glow,
    pos: {x: 700, y: 520},
    cardSide: 'left',
    startFrame: FLOW_FRAMES.s1Start,
    endFrame: FLOW_FRAMES.s1End,
    audio: 'voice/flow/stage1.mp3',
  },
  {
    index: 1,
    label: 'Interview',
    short: 'STAGE 02',
    bullets: ['Dynamic questions', 'Role-based prompts', 'Live conversation'],
    icon: '🤖',
    color: '#A855F7',
    glow: theme.glowPurple,
    pos: {x: 380, y: 1180},
    cardSide: 'right',
    startFrame: FLOW_FRAMES.s2Start,
    endFrame: FLOW_FRAMES.s2End,
    audio: 'voice/flow/stage2.mp3',
  },
  {
    index: 2,
    label: 'Analyze',
    short: 'STAGE 03',
    bullets: ['Confidence', 'Tone & clarity', 'Accuracy scoring'],
    icon: '📊',
    color: '#6366F1',
    glow: theme.glow,
    pos: {x: 700, y: 1840},
    cardSide: 'left',
    startFrame: FLOW_FRAMES.s3Start,
    endFrame: FLOW_FRAMES.s3End,
    audio: 'voice/flow/stage3.mp3',
  },
  {
    index: 3,
    label: 'Feedback',
    short: 'STAGE 04',
    bullets: ['Instant score', 'Strengths', 'Improvement tips'],
    icon: '🏆',
    color: '#22C55E',
    glow: theme.glowGreen,
    pos: {x: 380, y: 2500},
    cardSide: 'right',
    startFrame: FLOW_FRAMES.s4Start,
    endFrame: FLOW_FRAMES.s4End,
    audio: 'voice/flow/stage4.mp3',
  },
];

export const TRANSITION_FRAMES = 36;
