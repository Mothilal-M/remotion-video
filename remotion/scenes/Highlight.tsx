import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {theme} from '../theme';
import {GlassCard} from '../components/GlassCard';

export const Highlight: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 100, mass: 0.9},
  });
  const scale = interpolate(enterSpring, [0, 1], [0.6, 1]);
  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subDelay = spring({frame: frame - 24, fps, config: {damping: 20, stiffness: 120}});

  const pulse = 0.5 + Math.sin(frame * 0.12) * 0.5;
  const exit = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill
      style={{justifyContent: 'center', alignItems: 'center', padding: 80, opacity: exit}}
    >
      <Audio src={staticFile('voice/highlight.mp3')} volume={1} />
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          width: '92%',
          maxWidth: 980,
        }}
      >
        <GlassCard
          glow={`rgba(34, 197, 94, ${0.35 + pulse * 0.4})`}
          glowStrength={1.5 + pulse * 0.8}
          style={{padding: '90px 60px', textAlign: 'center'}}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: theme.secondary,
              marginBottom: 30,
              textShadow: `0 0 ${24 + pulse * 30}px ${theme.glowGreen}`,
            }}
          >
            The promise
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: -3,
              color: theme.text,
              textShadow: `0 0 ${40 + pulse * 60}px ${theme.glowGreen}, 0 0 ${20 + pulse * 30}px ${theme.glow}`,
            }}
          >
            No bias.
            <br />
            Just{' '}
            <span
              style={{
                background: `linear-gradient(135deg, #22C55E 0%, #818CF8 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              talent.
            </span>
          </div>
          <div
            style={{
              marginTop: 44,
              fontSize: 36,
              fontWeight: 500,
              color: theme.textDim,
              letterSpacing: 0.5,
              opacity: subDelay,
              transform: `translateY(${interpolate(subDelay, [0, 1], [16, 0])}px)`,
            }}
          >
            AI ensures fair evaluation for everyone.
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};
