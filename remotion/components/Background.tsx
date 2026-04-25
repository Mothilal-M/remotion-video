import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';
import {Particles} from './Particles';

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;

  const angle = 135 + Math.sin(frame / 90) * 25;
  const stop1 = 18 + Math.sin(frame / 60) * 6;
  const stop2 = 70 + Math.cos(frame / 75) * 8;

  const blob1X = 50 + Math.sin(frame / 80) * 18;
  const blob1Y = 30 + Math.cos(frame / 95) * 12;
  const blob2X = 30 + Math.cos(frame / 70) * 20;
  const blob2Y = 75 + Math.sin(frame / 110) * 14;

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(${angle}deg, ${theme.bgDeep} 0%, ${theme.bg} ${stop1}%, #1E1B4B ${stop2}%, ${theme.bgDeep} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${blob1X}% ${blob1Y}%, rgba(79, 70, 229, 0.35) 0%, transparent 45%)`,
          filter: 'blur(40px)',
          opacity: 0.9,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${blob2X}% ${blob2Y}%, rgba(168, 85, 247, 0.28) 0%, transparent 45%)`,
          filter: 'blur(40px)',
          opacity: 0.8,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${100 - blob1X}% ${100 - blob2Y}%, rgba(34, 197, 94, 0.18) 0%, transparent 40%)`,
          filter: 'blur(60px)',
          opacity: 0.6 + Math.sin(t * Math.PI * 2) * 0.2,
        }}
      />
      <Particles count={60} />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(7, 11, 23, 0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
