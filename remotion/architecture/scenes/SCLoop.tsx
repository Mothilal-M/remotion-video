import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {theme} from '../../theme';
import {SectionFrame} from '../SectionFrame';
import type {Section} from '../data';
import {BrainIcon, HandIcon, EyeIcon, CheckIcon} from '../Icons';

type IconCmp = React.FC<{size?: number; color?: string; strokeWidth?: number}>;

const STEPS: {label: string; Icon: IconCmp; color: string}[] = [
  {label: 'Think', Icon: BrainIcon, color: '#818CF8'},
  {label: 'Act', Icon: HandIcon, color: '#A855F7'},
  {label: 'Observe', Icon: EyeIcon, color: '#F472B6'},
  {label: 'Think', Icon: BrainIcon, color: '#818CF8'},
  {label: 'Answer', Icon: CheckIcon, color: '#22C55E'},
];

const RADIUS = 320;
const CENTER_X = 960;
const CENTER_Y = 580;

const stepPos = (i: number) => {
  const angle = (-Math.PI / 2) + (i * (2 * Math.PI)) / STEPS.length;
  return {
    x: CENTER_X + Math.cos(angle) * RADIUS,
    y: CENTER_Y + Math.sin(angle) * RADIUS,
  };
};

const StepNode: React.FC<{step: (typeof STEPS)[number]; index: number; activeIdx: number}> = ({
  step,
  index,
  activeIdx,
}) => {
  const frame = useCurrentFrame();
  const pos = stepPos(index);
  const active = index === activeIdx;
  const visited = index <= activeIdx;
  const pulse = active ? 0.5 + Math.sin(frame * 0.18) * 0.5 : 0;
  const scale = active ? 1.18 : visited ? 1 : 0.9;

  return (
    <div
      style={{
        position: 'absolute',
        left: pos.x - 90,
        top: pos.y - 90,
        width: 180,
        height: 180,
        textAlign: 'center',
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 160,
          height: 160,
          margin: '0 auto',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${step.color}DD 0%, ${step.color}77 60%, ${step.color}33 100%)`,
          display: 'grid',
          placeItems: 'center',
          color: '#FFFFFF',
          boxShadow: active
            ? `0 0 ${50 + pulse * 60}px ${step.color}AA, inset 0 1px 0 rgba(255,255,255,0.25)`
            : `0 0 24px ${step.color}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
          border: `2px solid ${step.color}88`,
          opacity: visited ? 1 : 0.5,
        }}
      >
        <step.Icon size={62} strokeWidth={1.8} />
      </div>
      <div
        style={{
          marginTop: 14,
          fontSize: 26,
          fontWeight: 800,
          color: theme.text,
          letterSpacing: 0.5,
          textShadow: active ? `0 0 18px ${step.color}` : 'none',
          opacity: visited ? 1 : 0.55,
        }}
      >
        {step.label}
      </div>
    </div>
  );
};

const buildArcPath = () => {
  let d = '';
  for (let i = 0; i < STEPS.length; i++) {
    const next = (i + 1) % STEPS.length;
    if (next === 0) continue;
    const a = stepPos(i);
    const b = stepPos(next);
    if (i === 0) d += `M ${a.x} ${a.y} `;
    d += `A ${RADIUS} ${RADIUS} 0 0 1 ${b.x} ${b.y} `;
  }
  return d;
};

export const SCLoop: React.FC<{section: Section}> = ({section}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const STEP_FRAMES = [4 * 30, 14 * 30, 24 * 30, 34 * 30, 42 * 30];
  let activeIdx = -1;
  for (let i = 0; i < STEP_FRAMES.length; i++) {
    if (frame >= STEP_FRAMES[i]) activeIdx = i;
  }

  const pathProgress = interpolate(
    frame,
    [STEP_FRAMES[0], STEP_FRAMES[STEP_FRAMES.length - 1]],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const exampleSpring = spring({
    frame: frame - 4 * 30,
    fps,
    config: {damping: 20, stiffness: 110},
  });
  const exampleExit = interpolate(frame, [50 * 30, 53 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const STEP_LINES = [
    'I need the page copy, analytics, and feedback.',
    'Read page · fetch analytics · search notes.',
    'High bounce. Unclear headline. CTA below the fold.',
    'Connect evidence: messaging issue, not just design.',
    '3 prioritized fixes, grounded in real data.',
  ];

  return (
    <SectionFrame section={section} scrim="center">
      <svg
        width={1920}
        height={1080}
        style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}
      >
        <defs>
          <linearGradient id="loopFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <filter id="loopGlow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={buildArcPath()}
          stroke="rgba(148, 163, 184, 0.18)"
          strokeWidth={4}
          strokeDasharray="6 12"
          fill="none"
        />
        <path
          d={buildArcPath()}
          stroke="url(#loopFill)"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - pathProgress}
          filter="url(#loopGlow)"
        />
      </svg>

      {STEPS.map((s, i) => (
        <StepNode key={i} step={s} index={i} activeIdx={activeIdx} />
      ))}

      <div
        style={{
          position: 'absolute',
          left: CENTER_X - 220,
          top: CENTER_Y - 80,
          width: 440,
          textAlign: 'center',
          color: theme.text,
        }}
      >
        <div
          style={{
            fontSize: 16,
            letterSpacing: 6,
            fontWeight: 800,
            color: '#A855F7',
            marginBottom: 10,
          }}
        >
          THE AGENT LOOP
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: -1,
            textShadow: `0 0 30px ${theme.glowPurple}`,
          }}
        >
          Think →
          <br />
          Act → Observe →
          <br />
          Think → Answer
        </div>
      </div>

      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 0 90px',
          opacity: exampleSpring * exampleExit,
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(168, 85, 247, 0.45)',
            borderRadius: 24,
            padding: '24px 36px',
            width: 1640,
            boxShadow: `0 24px 60px rgba(2, 6, 23, 0.6), 0 0 60px ${theme.glowPurple}`,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 5,
              color: '#94A3B8',
              marginBottom: 12,
            }}
          >
            👤 GOAL · "Review this landing page and suggest improvements."
          </div>
          <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
            {STEPS.map((s, i) => {
              const visible = i <= activeIdx;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    minWidth: 280,
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: visible
                      ? `${s.color}1F`
                      : 'rgba(148, 163, 184, 0.06)',
                    border: `1px solid ${visible ? s.color + '66' : 'rgba(148, 163, 184, 0.18)'}`,
                    opacity: visible ? 1 : 0.4,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: 3,
                      color: s.color,
                      marginBottom: 6,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} · {s.label.toUpperCase()}
                  </div>
                  <div style={{fontSize: 18, color: theme.text, lineHeight: 1.35}}>
                    {STEP_LINES[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SectionFrame>
  );
};
