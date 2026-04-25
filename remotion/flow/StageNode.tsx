import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage} from './data';
import {theme} from '../theme';

type Props = {
  stage: Stage;
  active: boolean;
  visited: boolean;
};

export const StageNode: React.FC<Props> = ({stage, active, visited}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const activateSpring = spring({
    frame: frame - stage.startFrame,
    fps,
    config: {damping: 12, stiffness: 110, mass: 0.8},
  });

  const baseScale = visited ? 1.05 : 0.95;
  const scale = active ? interpolate(activateSpring, [0, 1], [1.0, 1.25]) : baseScale;
  const ringRot = (frame * 0.6) % 360;
  const pulse = active ? 0.5 + Math.sin(frame * 0.16) * 0.5 : 0.3;

  const size = 200;

  return (
    <div
      style={{
        position: 'absolute',
        left: stage.pos.x - size / 2,
        top: stage.pos.y - size / 2,
        width: size,
        height: size,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -20,
          borderRadius: '50%',
          border: `2px dashed ${stage.color}`,
          opacity: active ? 0.7 : 0.25,
          transform: `rotate(${ringRot}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${stage.color}DD 0%, ${stage.color}77 60%, ${stage.color}33 100%)`,
          boxShadow: active
            ? `0 0 ${60 + pulse * 60}px ${stage.glow}, 0 0 ${30 + pulse * 30}px ${stage.color}, inset 0 1px 0 rgba(255,255,255,0.25)`
            : `0 0 30px ${stage.color}66, inset 0 1px 0 rgba(255,255,255,0.15)`,
          display: 'grid',
          placeItems: 'center',
          fontSize: 78,
        }}
      >
        <span>{stage.icon}</span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: size + 20,
          transform: 'translateX(-50%)',
          color: theme.text,
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: -0.5,
          textShadow: `0 0 20px ${stage.glow}, 0 2px 10px rgba(0,0,0,0.7)`,
          whiteSpace: 'nowrap',
          opacity: visited ? 1 : 0.6,
        }}
      >
        {stage.label}
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: -42,
          transform: 'translateX(-50%)',
          padding: '6px 14px',
          borderRadius: 999,
          background: 'rgba(15, 23, 42, 0.7)',
          border: `1px solid ${stage.color}66`,
          color: stage.color,
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: 4,
          whiteSpace: 'nowrap',
          opacity: active ? 1 : 0.5,
        }}
      >
        {stage.short}
      </div>
    </div>
  );
};
