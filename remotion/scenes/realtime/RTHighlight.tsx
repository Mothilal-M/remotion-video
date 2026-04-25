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
import {theme} from '../../theme';
import {HeroBackdrop} from '../../components/HeroBackdrop';

export const RTHighlight: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 14, stiffness: 95, mass: 0.85}});
  const scale = interpolate(enter, [0, 1], [0.6, 1]);
  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subSpring = spring({
    frame: frame - 28,
    fps,
    config: {damping: 20, stiffness: 120},
  });

  const pulse = 0.5 + Math.sin(frame * 0.12) * 0.5;
  const exit = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill>
      <Audio src={staticFile('voice/highlight.mp3')} volume={1} />
      <HeroBackdrop
        src="images/highlight.png"
        zoomFrom={1.04}
        zoomTo={1.14}
        panX={0}
        panY={-10}
        scrim="center"
        scrimStrength={1.4}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at center, rgba(7, 11, 23, 0.78) 0%, rgba(7, 11, 23, 0.55) 55%, rgba(7, 11, 23, 0.2) 100%)',
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          opacity: exit,
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            textAlign: 'center',
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: 999,
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.45)',
              color: theme.secondary,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 7,
              textTransform: 'uppercase',
              marginBottom: 38,
              boxShadow: `0 0 ${30 + pulse * 30}px ${theme.glowGreen}`,
            }}
          >
            The promise
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: -3,
              color: theme.text,
              textShadow: `0 4px 30px rgba(0,0,0,0.8), 0 0 ${50 + pulse * 60}px ${theme.glowGreen}, 0 0 30px ${theme.glow}`,
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
              marginTop: 40,
              fontSize: 34,
              fontWeight: 500,
              color: '#E2E8F0',
              letterSpacing: 0.5,
              opacity: subSpring,
              transform: `translateY(${interpolate(subSpring, [0, 1], [16, 0])}px)`,
              textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            AI ensures fair evaluation for everyone.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
