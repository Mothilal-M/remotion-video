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
import {theme} from '../../theme';
import {HeroBackdrop} from '../../components/HeroBackdrop';
import {LiveIndicator} from './RTShared';

export const RTHook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 14, stiffness: 90, mass: 0.8}});
  const titleScale = interpolate(enter, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shake = frame > 25 && frame < 55;
  const sx = shake ? (random(`sx-${frame}`) - 0.5) * 10 : 0;
  const sy = shake ? (random(`sy-${frame}`) - 0.5) * 10 : 0;

  const subOpacity = interpolate(frame, [60, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subY = interpolate(frame, [60, 95], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill>
      <Audio src={staticFile('voice/hook.mp3')} volume={1} />
      <HeroBackdrop
        src="images/hook.png"
        zoomFrom={1.05}
        zoomTo={1.18}
        panX={-30}
        panY={-15}
        scrim="bottom"
        scrimStrength={1.1}
      />

      <AbsoluteFill style={{padding: 70, opacity: exit}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <LiveIndicator label="LIVE INTERVIEW" />
          <div
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              color: theme.textDim,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            AI · 2026
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: '0 70px 220px',
          opacity: exit,
        }}
      >
        <div
          style={{
            transform: `translate(${sx}px, ${sy}px) scale(${titleScale})`,
            opacity: titleOpacity,
            maxWidth: 940,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 7,
              fontWeight: 700,
              color: theme.primary,
              textTransform: 'uppercase',
              marginBottom: 22,
              textShadow: `0 0 20px ${theme.glow}`,
            }}
          >
            The future is here
          </div>
          <div
            style={{
              fontSize: 108,
              lineHeight: 1.02,
              fontWeight: 900,
              color: theme.text,
              letterSpacing: -2.5,
              textShadow: `0 4px 24px rgba(0,0,0,0.7), 0 0 60px ${theme.glow}`,
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
              marginTop: 30,
              fontSize: 36,
              fontWeight: 500,
              color: '#E2E8F0',
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
              textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            No humans. Just pure skill.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
