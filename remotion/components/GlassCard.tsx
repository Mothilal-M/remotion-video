import React from 'react';
import {theme} from '../theme';

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glow?: string;
  glowStrength?: number;
};

export const GlassCard: React.FC<Props> = ({
  children,
  style,
  glow = theme.glow,
  glowStrength = 1,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        background:
          'linear-gradient(140deg, rgba(148, 163, 184, 0.14) 0%, rgba(148, 163, 184, 0.05) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 36,
        boxShadow: `0 30px 80px rgba(2, 6, 23, 0.55), 0 0 ${80 * glowStrength}px ${glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
};
