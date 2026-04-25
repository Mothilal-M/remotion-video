import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage} from './data';
import {theme} from '../theme';

type Props = {
  stage: Stage;
};

export const StageDetail: React.FC<Props> = ({stage}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const local = frame - stage.startFrame;
  const enter = spring({
    frame: local,
    fps,
    config: {damping: 22, stiffness: 110, mass: 0.85},
  });

  const exitStart = stage.endFrame - stage.startFrame - 28;
  const exitProgress = interpolate(local, [exitStart, exitStart + 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slideX =
    stage.cardSide === 'left'
      ? interpolate(enter, [0, 1], [-180, 0]) + exitProgress * -120
      : interpolate(enter, [0, 1], [180, 0]) + exitProgress * 120;
  const opacity = enter * (1 - exitProgress);

  const cardWidth = 540;
  const cardLeft = stage.cardSide === 'left' ? 60 : 1080 - cardWidth - 60;

  return (
    <div
      style={{
        position: 'absolute',
        left: cardLeft,
        top: stage.pos.y - 140,
        width: cardWidth,
        transform: `translateX(${slideX}px)`,
        opacity,
        background:
          'linear-gradient(135deg, rgba(15, 23, 42, 0.82) 0%, rgba(15, 23, 42, 0.6) 100%)',
        backdropFilter: 'blur(28px) saturate(140%)',
        WebkitBackdropFilter: 'blur(28px) saturate(140%)',
        border: `1px solid ${stage.color}55`,
        borderRadius: 28,
        padding: 36,
        boxShadow: `0 24px 70px rgba(2, 6, 23, 0.6), 0 0 60px ${stage.glow}`,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: 5,
          color: stage.color,
          marginBottom: 14,
        }}
      >
        {stage.short}
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: theme.text,
          letterSpacing: -1,
          lineHeight: 1.04,
          marginBottom: 22,
          textShadow: `0 0 28px ${stage.glow}`,
        }}
      >
        {stage.label}
      </div>
      <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
        {stage.bullets.map((b, i) => {
          const bulletSpring = spring({
            frame: local - 16 - i * 8,
            fps,
            config: {damping: 18, stiffness: 130},
          });
          return (
            <li
              key={i}
              style={{
                opacity: bulletSpring,
                transform: `translateX(${interpolate(bulletSpring, [0, 1], [20, 0])}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: 26,
                color: theme.text,
                fontWeight: 500,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: stage.color,
                  boxShadow: `0 0 10px ${stage.color}`,
                  flexShrink: 0,
                }}
              />
              {b}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
