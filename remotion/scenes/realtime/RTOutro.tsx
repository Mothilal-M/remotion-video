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

export const RTOutro: React.FC = () => {
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
        src="images/outro.png"
        zoomFrom={1.0}
        zoomTo={1.12}
        panX={0}
        panY={20}
        scrim="bottom"
        scrimStrength={1.2}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 70px 180px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 84,
            fontWeight: 800,
            color: theme.text,
            letterSpacing: -1.5,
            lineHeight: 1.08,
            maxWidth: 920,
            textShadow: `0 4px 30px rgba(0,0,0,0.8), 0 0 50px ${theme.glow}`,
          }}
        >
          Ready to crack your next{' '}
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
            transform: `scale(${ctaScale * ctaPulse})`,
            padding: '32px 76px',
            borderRadius: 999,
            background: `linear-gradient(135deg, ${theme.primary} 0%, #A855F7 100%)`,
            color: theme.text,
            fontSize: 50,
            fontWeight: 800,
            letterSpacing: 1,
            boxShadow: `0 30px 70px ${theme.glow}, 0 0 70px rgba(168, 85, 247, 0.55), inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        >
          Start now 🚀
        </div>

        <div
          style={{
            marginTop: 50,
            opacity: subOpacity,
            fontSize: 30,
            fontWeight: 500,
            color: '#E2E8F0',
            letterSpacing: 0.5,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          Follow for more AI tools & tech insights
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
