import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../../theme';

export const Badge: React.FC<{text: string; color?: string}> = ({
  text,
  color = theme.primary,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 130}});
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [-20, 0])}px)`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 28px',
        borderRadius: 999,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${color}55`,
        color: theme.text,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 5,
        textTransform: 'uppercase',
        boxShadow: `0 0 30px ${color}55`,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 14px ${color}`,
          animationName: 'none',
        }}
      />
      {text}
    </div>
  );
};

export const BottomGlassPanel: React.FC<{
  children: React.ReactNode;
  glow?: string;
}> = ({children, glow = theme.glow}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 20, stiffness: 110, mass: 0.9}});
  const slide = interpolate(enter, [0, 1], [120, 0]);
  const exit = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 1],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 90,
        left: 60,
        right: 60,
        transform: `translateY(${slide + exit * 80}px)`,
        opacity: enter * (1 - exit),
        background:
          'linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.55) 100%)',
        backdropFilter: 'blur(28px) saturate(140%)',
        WebkitBackdropFilter: 'blur(28px) saturate(140%)',
        border: `1px solid rgba(148, 163, 184, 0.22)`,
        borderRadius: 40,
        padding: '52px 56px',
        boxShadow: `0 30px 90px rgba(2, 6, 23, 0.6), 0 0 90px ${glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {children}
    </div>
  );
};

export const LiveIndicator: React.FC<{label?: string}> = ({label = 'LIVE'}) => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + Math.sin(frame * 0.18) * 0.5;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 18px',
        borderRadius: 999,
        background: 'rgba(34, 197, 94, 0.18)',
        border: '1px solid rgba(34, 197, 94, 0.5)',
        color: theme.secondary,
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: 3,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: theme.secondary,
          boxShadow: `0 0 ${10 + pulse * 14}px ${theme.secondary}`,
          opacity: 0.5 + pulse * 0.5,
        }}
      />
      {label}
    </div>
  );
};
