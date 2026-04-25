import React from 'react';
import {useCurrentFrame} from 'remotion';
import {theme} from '../theme';

type Props = {
  bars?: number;
  width?: number;
  height?: number;
  color?: string;
  active?: number;
};

export const Waveform: React.FC<Props> = ({
  bars = 40,
  width = 480,
  height = 110,
  color = theme.primary,
  active = 1,
}) => {
  const frame = useCurrentFrame();
  const barWidth = width / bars - 4;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        width,
        height,
      }}
    >
      {Array.from({length: bars}).map((_, i) => {
        const phase = i * 0.35;
        const wave = Math.abs(Math.sin(frame * 0.12 + phase));
        const wave2 = Math.abs(Math.cos(frame * 0.08 + phase * 0.7));
        const env = Math.sin((i / bars) * Math.PI);
        const h = (10 + (wave * 0.7 + wave2 * 0.3) * height * env) * active;
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: Math.max(6, h),
              borderRadius: barWidth,
              background: `linear-gradient(180deg, ${color} 0%, rgba(168, 85, 247, 0.9) 100%)`,
              boxShadow: `0 0 14px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
