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

const FloatingIcon: React.FC<{
  emoji: string;
  seed: string;
  startFrame: number;
}> = ({emoji, seed, startFrame}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  if (local < 0) return null;
  const baseX = random(seed + 'x') * 90 + 5;
  const baseY = random(seed + 'y') * 80 + 10;
  const size = 48 + random(seed + 's') * 28;
  const drift = Math.sin(local * 0.04 + random(seed + 'p') * 6) * 18;
  const rise = local * 0.35;
  const op = interpolate(local, [0, 18, 200, 260], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: `${baseX + drift * 0.2}%`,
        top: `${baseY - rise * 0.4}%`,
        fontSize: size,
        opacity: op,
        filter: `drop-shadow(0 0 18px ${theme.glow})`,
        transform: `rotate(${Math.sin(local * 0.05) * 12}deg)`,
      }}
    >
      {emoji}
    </div>
  );
};

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: {damping: 16, stiffness: 110, mass: 0.9},
  });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaSpring = spring({
    frame: frame - 30,
    fps,
    config: {damping: 12, stiffness: 130, mass: 0.7},
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.7, 1]);

  const subOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 50, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const ctaPulse = 1 + Math.sin(frame * 0.14) * 0.03;

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <Audio src={staticFile('voice/outro.mp3')} volume={1} />
      <FloatingIcon emoji="🚀" seed="i1" startFrame={0} />
      <FloatingIcon emoji="✨" seed="i2" startFrame={10} />
      <FloatingIcon emoji="🤖" seed="i3" startFrame={20} />
      <FloatingIcon emoji="💡" seed="i4" startFrame={30} />
      <FloatingIcon emoji="⚡" seed="i5" startFrame={40} />
      <FloatingIcon emoji="🎯" seed="i6" startFrame={50} />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 86,
            fontWeight: 800,
            color: theme.text,
            letterSpacing: -1.5,
            lineHeight: 1.1,
            maxWidth: 920,
            textShadow: `0 0 50px ${theme.glow}`,
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
            marginTop: 56,
            transform: `scale(${ctaScale * ctaPulse})`,
            padding: '30px 70px',
            borderRadius: 999,
            background: `linear-gradient(135deg, ${theme.primary} 0%, #A855F7 100%)`,
            color: theme.text,
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: 1,
            boxShadow: `0 30px 70px ${theme.glow}, 0 0 60px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        >
          Start now 🚀
        </div>

        <div
          style={{
            marginTop: 60,
            opacity: subOpacity,
            fontSize: 32,
            fontWeight: 500,
            color: theme.textDim,
            letterSpacing: 0.5,
          }}
        >
          Follow for more AI tools & tech insights
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
