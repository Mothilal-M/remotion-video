import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';

type Particle = {
  seed: string;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
  speed: number;
  phase: number;
  hue: number;
  opacity: number;
};

export const Particles: React.FC<{count?: number}> = ({count = 50}) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({length: count}, (_, i) => {
      const seed = `p-${i}`;
      return {
        seed,
        x: random(seed + 'x') * 100,
        y: random(seed + 'y') * 100,
        size: 2 + random(seed + 's') * 8,
        driftX: 4 + random(seed + 'dx') * 10,
        driftY: 6 + random(seed + 'dy') * 12,
        speed: 0.4 + random(seed + 'sp') * 0.8,
        phase: random(seed + 'ph') * Math.PI * 2,
        hue: random(seed + 'h'),
        opacity: 0.25 + random(seed + 'o') * 0.55,
      };
    });
  }, [count]);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {particles.map((p) => {
        const t = (frame * p.speed) / 60;
        const x = p.x + Math.sin(t + p.phase) * p.driftX;
        const y = p.y + Math.cos(t * 0.8 + p.phase) * p.driftY;
        const twinkle = 0.5 + Math.sin(frame * 0.06 + p.phase) * 0.5;
        const color =
          p.hue < 0.5
            ? `rgba(129, 140, 248, ${p.opacity * twinkle})`
            : p.hue < 0.85
              ? `rgba(168, 85, 247, ${p.opacity * twinkle})`
              : `rgba(34, 197, 94, ${p.opacity * twinkle})`;
        return (
          <div
            key={p.seed}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 ${p.size * 3}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
