import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

const NoiseSVG: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    style={{position: 'absolute', inset: 0}}
  >
    <filter id="cinematicGrain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.9"
        numOctaves="2"
        stitchTiles="stitch"
      />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 1
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0.6 0"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#cinematicGrain)" />
  </svg>
);

export const CinematicOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const grainShift = (frame % 4) * 8;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill
        style={{
          mixBlendMode: 'overlay',
          opacity: 0.06,
          transform: `translate(${grainShift}px, ${(frame % 7) * 4}px)`,
        }}
      >
        <NoiseSVG />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(15, 23, 42, 0.0) 0%, rgba(0, 0, 0, 0.0) 50%, rgba(2, 6, 23, 0.35) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.45) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(135deg, rgba(251, 191, 36, 0.04) 0%, rgba(0, 0, 0, 0) 30%, rgba(56, 189, 248, 0.06) 100%)',
          mixBlendMode: 'overlay',
        }}
      />
    </AbsoluteFill>
  );
};
