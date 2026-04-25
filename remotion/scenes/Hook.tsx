import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  random,
} from 'remotion';
import {theme} from '../theme';

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const zoom = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 90, mass: 0.8},
  });
  const scale = interpolate(zoom, [0, 1], [0.5, 1]);

  const shakeWindow = frame > 25 && frame < 60;
  const shakeX = shakeWindow ? (random(`sx-${frame}`) - 0.5) * 14 : 0;
  const shakeY = shakeWindow ? (random(`sy-${frame}`) - 0.5) * 14 : 0;

  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtitleY = interpolate(frame, [40, 70], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const exitBlur = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 1],
    [0, 14],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const glowPulse = 0.6 + Math.sin(frame * 0.16) * 0.4;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: exit,
        filter: `blur(${exitBlur}px)`,
        padding: 80,
      }}
    >
      <Audio src={staticFile('voice/hook.mp3')} volume={1} />
      <div
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${scale})`,
          textAlign: 'center',
          maxWidth: 920,
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            fontWeight: 600,
            color: theme.primary,
            textTransform: 'uppercase',
            opacity: zoom,
            marginBottom: 28,
            textShadow: `0 0 ${20 * glowPulse}px ${theme.glow}`,
          }}
        >
          The future is here
        </div>
        <div
          style={{
            fontSize: 110,
            lineHeight: 1.05,
            fontWeight: 800,
            color: theme.text,
            letterSpacing: -2,
            textShadow: `0 0 ${50 * glowPulse}px ${theme.glow}, 0 0 90px rgba(168, 85, 247, 0.35)`,
          }}
        >
          What if{' '}
          <span
            style={{
              background: `linear-gradient(135deg, #818CF8 0%, #C084FC 50%, #22C55E 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI
          </span>{' '}
          could take your interview?
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 38,
            fontWeight: 500,
            color: theme.textDim,
            letterSpacing: 1,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          No humans. Just pure skill.
        </div>
      </div>
    </AbsoluteFill>
  );
};
