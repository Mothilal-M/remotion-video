import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {STAGES, FLOW_FRAMES, WORLD_HEIGHT, TRANSITION_FRAMES} from './data';

const buildPath = () => {
  const [a, b, c, d] = STAGES;
  const midX = (a.pos.x + b.pos.x) / 2;
  return [
    `M ${a.pos.x} ${a.pos.y}`,
    `Q ${midX} ${(a.pos.y + b.pos.y) / 2}, ${b.pos.x} ${b.pos.y}`,
    `Q ${(b.pos.x + c.pos.x) / 2} ${(b.pos.y + c.pos.y) / 2}, ${c.pos.x} ${c.pos.y}`,
    `Q ${(c.pos.x + d.pos.x) / 2} ${(c.pos.y + d.pos.y) / 2}, ${d.pos.x} ${d.pos.y}`,
  ].join(' ');
};

export const FlowConnector: React.FC = () => {
  const frame = useCurrentFrame();
  const path = buildPath();

  const pathProgress = interpolate(
    frame,
    [
      FLOW_FRAMES.s1End - TRANSITION_FRAMES,
      FLOW_FRAMES.s1End,
      FLOW_FRAMES.s2End - TRANSITION_FRAMES,
      FLOW_FRAMES.s2End,
      FLOW_FRAMES.s3End - TRANSITION_FRAMES,
      FLOW_FRAMES.s3End,
    ],
    [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <svg
      width={1080}
      height={WORLD_HEIGHT}
      viewBox={`0 0 1080 ${WORLD_HEIGHT}`}
      style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}
    >
      <defs>
        <linearGradient id="flowBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(148, 163, 184, 0.18)" />
          <stop offset="100%" stopColor="rgba(148, 163, 184, 0.18)" />
        </linearGradient>
        <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="33%" stopColor="#A855F7" />
          <stop offset="66%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <filter id="flowGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={path}
        stroke="url(#flowBase)"
        strokeWidth={6}
        fill="none"
        strokeDasharray="6 12"
      />
      <path
        d={path}
        stroke="url(#flowFill)"
        strokeWidth={10}
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - pathProgress}
        filter="url(#flowGlow)"
      />
    </svg>
  );
};
