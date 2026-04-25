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
import {AIAvatar} from '../components/AIAvatar';
import {Waveform} from '../components/Waveform';
import {GlassCard} from '../components/GlassCard';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 18, stiffness: 110, mass: 0.9}});
  const slideY = interpolate(enter, [0, 1], [80, 0]);
  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const avatarSpring = spring({
    frame: frame - 6,
    fps,
    config: {damping: 12, stiffness: 95, mass: 0.7},
  });

  const subDelay = spring({
    frame: frame - 28,
    fps,
    config: {damping: 20, stiffness: 120, mass: 0.6},
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        opacity: exit,
      }}
    >
      <Audio src={staticFile('voice/intro.mp3')} volume={1} />
      <div
        style={{
          opacity,
          transform: `translateY(${slideY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 36,
          textAlign: 'center',
        }}
      >
        <div style={{transform: `scale(${avatarSpring})`}}>
          <AIAvatar size={280} />
        </div>

        <GlassCard
          style={{padding: '36px 56px', borderRadius: 999}}
          glow={theme.glowPurple}
        >
          <Waveform bars={36} width={460} height={90} active={avatarSpring} />
        </GlassCard>

        <div
          style={{
            fontSize: 78,
            fontWeight: 800,
            color: theme.text,
            letterSpacing: -1.5,
            lineHeight: 1.1,
            textShadow: `0 0 50px ${theme.glow}`,
          }}
        >
          Meet the{' '}
          <span
            style={{
              background: `linear-gradient(135deg, #818CF8 0%, #A855F7 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI Interview Assistant
          </span>{' '}
          🤖
        </div>
        <div
          style={{
            opacity: subDelay,
            transform: `translateY(${interpolate(subDelay, [0, 1], [20, 0])}px)`,
            fontSize: 36,
            color: theme.textDim,
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          Smarter. Faster. Unbiased hiring.
        </div>
      </div>
    </AbsoluteFill>
  );
};
