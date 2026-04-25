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
import {DTLiveIndicator} from './DTShared';

export const DTHook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 14, stiffness: 90, mass: 0.8}});
  const titleScale = interpolate(enter, [0, 1], [0.85, 1]);
  const titleOpacity = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shake = frame > 25 && frame < 55;
  const sx = shake ? (random(`sx-${frame}`) - 0.5) * 8 : 0;
  const sy = shake ? (random(`sy-${frame}`) - 0.5) * 8 : 0;

  const subOpacity = interpolate(frame, [60, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subY = interpolate(frame, [60, 95], [24, 0], {
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
        src="images/landscape/hook.png"
        zoomFrom={1.05}
        zoomTo={1.15}
        panX={20}
        panY={-10}
        scrim="none"
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(7, 11, 23, 0.85) 0%, rgba(7, 11, 23, 0.55) 35%, rgba(7, 11, 23, 0.0) 60%)',
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill style={{padding: 64, opacity: exit}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <DTLiveIndicator label="LIVE INTERVIEW" />
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              color: theme.textDim,
              fontSize: 16,
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
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 0 0 90px',
          opacity: exit,
        }}
      >
        <div
          style={{
            transform: `translate(${sx}px, ${sy}px) scale(${titleScale})`,
            opacity: titleOpacity,
            maxWidth: 880,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              fontWeight: 700,
              color: theme.primary,
              textTransform: 'uppercase',
              marginBottom: 24,
              textShadow: `0 0 20px ${theme.glow}`,
            }}
          >
            The future is here
          </div>
          <div
            style={{
              fontSize: 110,
              lineHeight: 1.0,
              fontWeight: 900,
              color: theme.text,
              letterSpacing: -2.5,
              textShadow: `0 4px 30px rgba(0,0,0,0.85), 0 0 60px ${theme.glow}`,
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
            </span>
            <br />
            could take your interview?
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 36,
              fontWeight: 500,
              color: '#E2E8F0',
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
              textShadow: '0 2px 12px rgba(0,0,0,0.85)',
            }}
          >
            No humans. Just pure skill.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
