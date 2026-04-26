import React from 'react';
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion';
import {z} from 'zod';
import {loadFont} from '@remotion/google-fonts/Inter';
import {theme} from './theme';
import {ARCH_DURATION_IN_FRAMES, ARCH_FPS, SECTIONS} from './architecture/data';
import {CinematicOverlay} from './components/CinematicOverlay';
import {SCHook} from './architecture/scenes/SCHook';
import {SCCore} from './architecture/scenes/SCCore';
import {SCReasoning} from './architecture/scenes/SCReasoning';
import {SCActing} from './architecture/scenes/SCActing';
import {SCLoop} from './architecture/scenes/SCLoop';
import {SCSafety} from './architecture/scenes/SCSafety';
import {SCClosing} from './architecture/scenes/SCClosing';

loadFont('normal', {weights: ['500', '700', '800', '900'], subsets: ['latin']});

export {ARCH_DURATION_IN_FRAMES, ARCH_FPS};

const SCENE_COMPONENTS = [
  SCHook,
  SCCore,
  SCReasoning,
  SCActing,
  SCLoop,
  SCSafety,
  SCClosing,
];

export const sectionSchema = z.object({
  id: z.string(),
  number: z.string(),
  title: z.string(),
  durationInFrames: z.number().int().positive(),
  audio: z.string(),
  accent: z.string(),
  glow: z.string(),
  image: z.string(),
  imagePan: z.object({x: z.number(), y: z.number()}),
});

export const archSchema = z.object({
  bgColor: z.string(),
  showOverlay: z.boolean(),
  transitionFrames: z.number().int().min(0).max(60),
  sections: z.array(sectionSchema),
});

export type ArchProps = z.infer<typeof archSchema>;
export type SectionProps = z.infer<typeof sectionSchema>;

export const archDefaultProps: ArchProps = {
  bgColor: theme.bgDeep,
  showOverlay: true,
  transitionFrames: 18,
  sections: SECTIONS.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
    durationInFrames: s.durationInFrames,
    audio: s.audio,
    accent: s.accent,
    glow: s.glow,
    image: s.image,
    imagePan: {x: s.imagePan.x, y: s.imagePan.y},
  })),
};

export const calculateArchMetadata: CalculateMetadataFunction<ArchProps> = ({
  props,
}) => {
  const total = props.sections.reduce(
    (a: number, s: SectionProps) => a + s.durationInFrames,
    0,
  );
  return {durationInFrames: Math.max(1, total)};
};

const TransitionWashes: React.FC<{
  sections: SectionProps[];
  transitionFrames: number;
}> = ({sections, transitionFrames}) => {
  const frame = useCurrentFrame();
  if (transitionFrames <= 0) return null;
  let cumulative = 0;
  const boundaries: number[] = [];
  for (let i = 0; i < sections.length - 1; i++) {
    cumulative += sections[i].durationInFrames;
    boundaries.push(cumulative);
  }
  return (
    <>
      {boundaries.map((b, i) => {
        const fadeIn = interpolate(
          frame,
          [b - transitionFrames, b],
          [0, 1],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );
        const fadeOut = interpolate(
          frame,
          [b, b + transitionFrames],
          [1, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );
        const op = fadeIn * fadeOut;
        if (op <= 0) return null;
        return (
          <AbsoluteFill
            key={i}
            style={{
              backgroundColor: '#020617',
              opacity: op,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </>
  );
};

export const ArchitectureVideo: React.FC<ArchProps> = ({
  bgColor,
  showOverlay,
  transitionFrames,
  sections,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {sections.reduce<React.ReactNode[]>((acc, s: SectionProps, i: number) => {
        const Scene = SCENE_COMPONENTS[i];
        if (!Scene) return acc;
        const startFrame = sections
          .slice(0, i)
          .reduce(
            (sum: number, p: SectionProps) => sum + p.durationInFrames,
            0,
          );
        acc.push(
          <Sequence
            key={s.id}
            from={startFrame}
            durationInFrames={s.durationInFrames}
          >
            <Scene section={s} />
          </Sequence>,
        );
        return acc;
      }, [])}

      <TransitionWashes
        sections={sections}
        transitionFrames={transitionFrames}
      />

      {showOverlay ? <CinematicOverlay /> : null}
    </AbsoluteFill>
  );
};
