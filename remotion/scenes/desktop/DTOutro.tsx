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

export const DTOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: {damping: 16, stiffness: 110, mass: 0.9},
  });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const titleOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaSpring = spring({
    frame: frame - 36,
    fps,
    config: {damping: 12, stiffness: 130, mass: 0.7},
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.7, 1]);

  const subOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 50, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const ctaPulse = 1 + Math.sin(frame * 0.14) * 0.025;

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <Audio src={staticFile('voice/outro.mp3')} volume={1} />
      <HeroBackdrop
        src="images/landscape/outro.png"
        zoomFrom={1.0}
        zoomTo={1.1}
        panX={-20}
        panY={10}
        scrim="none"
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(7, 11, 23, 0.82) 0%, rgba(7, 11, 23, 0.45) 38%, rgba(7, 11, 23, 0.0) 62%)',
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 0 0 90px',
          textAlign: 'left',
        }}
      >
        <div style={{maxWidth: 880}}>
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              fontSize: 92,
              fontWeight: 800,
              color: theme.text,
              letterSpacing: -1.8,
              lineHeight: 1.04,
              textShadow: `0 4px 30px rgba(0,0,0,0.85), 0 0 50px ${theme.glow}`,
            }}
          >
            Ready to crack
            <br />
            your next{' '}
            <span
              style={{
                background: `linear-gradient(135deg, #818CF8 0%, #22C55E 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              interview?
            </span>
          </div>

          <div
            style={{
              marginTop: 50,
              display: 'inline-block',
              transform: `scale(${ctaScale * ctaPulse})`,
              transformOrigin: 'left center',
              padding: '30px 70px',
              borderRadius: 999,
              background: `linear-gradient(135deg, ${theme.primary} 0%, #A855F7 100%)`,
              color: theme.text,
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: 1,
              boxShadow: `0 30px 70px ${theme.glow}, 0 0 70px rgba(168, 85, 247, 0.55), inset 0 1px 0 rgba(255,255,255,0.3)`,
            }}
          >
            Start now 🚀
          </div>

          <div
            style={{
              marginTop: 44,
              opacity: subOpacity,
              fontSize: 28,
              fontWeight: 500,
              color: '#E2E8F0',
              letterSpacing: 0.5,
              textShadow: '0 2px 10px rgba(0,0,0,0.85)',
            }}
          >
            Follow for more AI tools & tech insights
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
