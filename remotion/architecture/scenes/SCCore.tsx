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
import {BrainIcon, HandIcon, EyeIcon, MessageIcon, RobotIcon} from '../Icons';

const Pillar: React.FC<{
  Icon: React.FC<{size?: number; color?: string; strokeWidth?: number}>;
  label: string;
  desc: string;
  color: string;
  glow: string;
  delay: number;
}> = ({Icon, label, desc, color, glow, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({
    frame: frame - delay,
    fps,
    config: {damping: 14, stiffness: 100, mass: 0.85},
  });
  const pulse = 0.6 + Math.sin(frame * 0.08) * 0.4;
  return (
    <div
      style={{
        opacity: sp,
        transform: `translateY(${interpolate(sp, [0, 1], [40, 0])}px) scale(${interpolate(sp, [0, 1], [0.85, 1])})`,
        textAlign: 'center',
        width: 360,
      }}
    >
      <div
        style={{
          width: 220,
          height: 220,
          margin: '0 auto 28px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${color}DD 0%, ${color}77 60%, ${color}33 100%)`,
          display: 'grid',
          placeItems: 'center',
          color: '#FFFFFF',
          boxShadow: `0 0 ${50 + pulse * 60}px ${glow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
          border: `2px solid ${color}88`,
        }}
      >
        <Icon size={94} strokeWidth={1.6} />
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: theme.text,
          letterSpacing: -0.8,
          marginBottom: 8,
          textShadow: `0 0 28px ${glow}`,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          color: theme.textDim,
          fontWeight: 500,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {desc}
      </div>
    </div>
  );
};

const Arrow: React.FC<{progress: number}> = ({progress}) => (
  <svg width={120} height={40} style={{opacity: progress}}>
    <defs>
      <linearGradient id="arrGrad" x1="0" x2="1">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>
    </defs>
    <line
      x1={10}
      y1={20}
      x2={10 + 90 * progress}
      y2={20}
      stroke="url(#arrGrad)"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <polygon
      points={`${100 * progress + 5},14 ${100 * progress + 5},26 ${100 * progress + 18},20`}
      fill="#22C55E"
      opacity={progress}
    />
  </svg>
);

export const SCCore: React.FC<{section: Section}> = ({section}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const arrow1 = interpolate(frame, [3 * 30, 5 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrow2 = interpolate(frame, [4 * 30, 6 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exampleEnter = spring({
    frame: frame - 14 * 30,
    fps,
    config: {damping: 18, stiffness: 110},
  });
  const exampleExit = interpolate(frame, [46 * 30, 49 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const showAgent = interpolate(frame, [25 * 30, 28 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SectionFrame section={section} scrim="center">
      <AbsoluteFill
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '160px 0 0',
          opacity: 1 - exampleEnter * 0.5,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 30,
          }}
        >
          <Pillar
            Icon={BrainIcon}
            label="Reason"
            desc="The brain"
            color="#818CF8"
            glow={theme.glow}
            delay={0}
          />
          <Arrow progress={arrow1} />
          <Pillar
            Icon={HandIcon}
            label="Act"
            desc="The hands"
            color="#A855F7"
            glow={theme.glowPurple}
            delay={30}
          />
          <Arrow progress={arrow2} />
          <Pillar
            Icon={EyeIcon}
            label="Observe"
            desc="The feedback"
            color="#22C55E"
            glow={theme.glowGreen}
            delay={60}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: exampleEnter * exampleExit,
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 0 100px',
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(148, 163, 184, 0.25)',
            borderRadius: 28,
            padding: '32px 40px',
            width: 1640,
            boxShadow: '0 24px 70px rgba(2, 6, 23, 0.6)',
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 5,
              color: '#94A3B8',
              marginBottom: 14,
            }}
          >
            👤 USER ASKS
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 26,
              fontStyle: 'italic',
            }}
          >
            "Analyze last week's sales data and give me three improvement
            suggestions."
          </div>
          <div style={{display: 'flex', gap: 28}}>
            <div
              style={{
                flex: 1,
                padding: '22px 26px',
                borderRadius: 18,
                background: 'rgba(148, 163, 184, 0.08)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: 4,
                  color: '#94A3B8',
                  marginBottom: 8,
                }}
              >
                💬 CHATBOT
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: theme.textDim,
                  lineHeight: 1.4,
                }}
              >
                "Improve marketing, optimize pricing, talk to customers."
              </div>
            </div>
            <div
              style={{
                flex: 1,
                padding: '22px 26px',
                borderRadius: 18,
                background: `linear-gradient(135deg, rgba(34, 197, 94, 0.18) 0%, rgba(34, 197, 94, 0.08) 100%)`,
                border: '1px solid rgba(34, 197, 94, 0.4)',
                opacity: showAgent,
                transform: `translateY(${interpolate(showAgent, [0, 1], [10, 0])}px)`,
                boxShadow: `0 0 40px ${theme.glowGreen}`,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: 4,
                  color: theme.secondary,
                  marginBottom: 8,
                }}
              >
                🤖 AI AGENT
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: theme.text,
                  lineHeight: 1.4,
                }}
              >
                Queries DB → fetches Q4 trends → compares to last week → finds
                top 3 underperformers → grounded recommendations.
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SectionFrame>
  );
};
