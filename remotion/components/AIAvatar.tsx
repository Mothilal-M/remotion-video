import React from 'react';
import {useCurrentFrame} from 'remotion';
import {theme} from '../theme';

export const AIAvatar: React.FC<{size?: number}> = ({size = 240}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.08) * 0.04;
  const ringRot = (frame * 0.6) % 360;
  const ring2Rot = -(frame * 0.4) % 360;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `2px dashed ${theme.primary}`,
          borderRadius: '50%',
          opacity: 0.55,
          transform: `rotate(${ringRot}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: size * 0.08,
          border: `1px solid rgba(168, 85, 247, 0.55)`,
          borderRadius: '50%',
          transform: `rotate(${ring2Rot}deg)`,
        }}
      />
      <div
        style={{
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, #818CF8 0%, ${theme.primary} 55%, #312E81 100%)`,
          boxShadow: `0 0 80px ${theme.glow}, inset 0 0 40px rgba(255,255,255,0.18)`,
          transform: `scale(${pulse})`,
          display: 'grid',
          placeItems: 'center',
          fontSize: size * 0.36,
        }}
      >
        <span role="img" aria-label="ai">🤖</span>
      </div>
    </div>
  );
};
