import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../../theme';

export const DTLiveIndicator: React.FC<{label?: string}> = ({label = 'LIVE'}) => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + Math.sin(frame * 0.18) * 0.5;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 22px',
        borderRadius: 999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(34, 197, 94, 0.5)',
        color: theme.secondary,
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: 4,
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

export const DTSidePanel: React.FC<{
  side: 'left' | 'right';
  width?: string | number;
  children: React.ReactNode;
  glow?: string;
}> = ({side, width = 760, children, glow = theme.glow}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 22, stiffness: 110, mass: 0.9}});
  const offset = interpolate(enter, [0, 1], [side === 'left' ? -180 : 180, 0]);
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
        top: '50%',
        [side]: 90,
        width,
        transform: `translateY(-50%) translateX(${offset + (side === 'left' ? -exit * 100 : exit * 100)}px)`,
        opacity: enter * (1 - exit),
        background:
          'linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.55) 100%)',
        backdropFilter: 'blur(28px) saturate(140%)',
        WebkitBackdropFilter: 'blur(28px) saturate(140%)',
        border: '1px solid rgba(148, 163, 184, 0.22)',
        borderRadius: 36,
        padding: '52px 56px',
        boxShadow: `0 30px 90px rgba(2, 6, 23, 0.6), 0 0 80px ${glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {children}
    </div>
  );
};
