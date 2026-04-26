import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {theme} from '../../theme';
import {SectionFrame} from '../SectionFrame';
import type {Section} from '../data';
import {
  FlaskIcon,
  CodeIcon,
  TrendingUpIcon,
  TargetIcon,
  HeartIcon,
  SettingsIcon,
} from '../Icons';

type IconCmp = React.FC<{size?: number; color?: string; strokeWidth?: number}>;

const APPLICATIONS: {label: string; Icon: IconCmp; color: string}[] = [
  {label: 'Research Assistant', Icon: FlaskIcon, color: '#818CF8'},
  {label: 'Coding Agent', Icon: CodeIcon, color: '#22C55E'},
  {label: 'Sales Copilot', Icon: TrendingUpIcon, color: '#A855F7'},
  {label: 'Hiring Assistant', Icon: TargetIcon, color: '#F472B6'},
  {label: 'Healthcare Assistant', Icon: HeartIcon, color: '#06B6D4'},
  {label: 'Operations Agent', Icon: SettingsIcon, color: '#F59E0B'},
];

const AppChip: React.FC<{
  app: (typeof APPLICATIONS)[number];
  delay: number;
}> = ({app, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({
    frame: frame - delay,
    fps,
    config: {damping: 16, stiffness: 110},
  });
  const float = Math.sin(frame * 0.04 + delay) * 6;
  return (
    <div
      style={{
        opacity: sp,
        transform: `translateY(${interpolate(sp, [0, 1], [30, 0]) + float}px) scale(${interpolate(sp, [0, 1], [0.7, 1])})`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 24px',
        borderRadius: 999,
        background: `linear-gradient(135deg, ${app.color}28 0%, ${app.color}12 100%)`,
        border: `1px solid ${app.color}66`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: `0 0 30px ${app.color}55`,
      }}
    >
      <span style={{color: app.color, display: 'flex'}}>
        <app.Icon size={26} strokeWidth={1.8} />
      </span>
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: theme.text,
          letterSpacing: 0.3,
          whiteSpace: 'nowrap',
        }}
      >
        {app.label}
      </span>
    </div>
  );
};

export const SCClosing: React.FC<{section: Section}> = ({section}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 95, mass: 0.85},
  });

  const formulaPulse = 0.6 + Math.sin(frame * 0.08) * 0.4;

  const ctaSpring = spring({
    frame: frame - 40 * 30,
    fps,
    config: {damping: 18, stiffness: 110},
  });

  return (
    <SectionFrame section={section} scrim="center">
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 80,
        }}
      >
        <div
          style={{
            opacity: titleSpring,
            transform: `scale(${interpolate(titleSpring, [0, 1], [0.85, 1])})`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              fontWeight: 700,
              color: theme.secondary,
              marginBottom: 24,
              textTransform: 'uppercase',
            }}
          >
            Different products. Same foundation.
          </div>
          <div
            style={{
              fontSize: 200,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -5,
              color: theme.text,
              textShadow: `0 0 ${50 + formulaPulse * 60}px ${theme.glow}, 0 0 60px rgba(168, 85, 247, 0.4)`,
            }}
          >
            <span
              style={{
                background: `linear-gradient(135deg, #818CF8 0%, #C084FC 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Reasoning
            </span>
            <span style={{color: '#475569', margin: '0 30px'}}>+</span>
            <span
              style={{
                background: `linear-gradient(135deg, #22C55E 0%, #818CF8 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Acting
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: 70,
            display: 'flex',
            gap: 18,
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 1500,
          }}
        >
          {APPLICATIONS.map((a, i) => (
            <AppChip key={a.label} app={a} delay={14 * 30 + i * 12} />
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            opacity: ctaSpring,
            transform: `translateY(${interpolate(ctaSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: theme.text,
              letterSpacing: -0.5,
              marginBottom: 14,
            }}
          >
            Which AI agent action do{' '}
            <span style={{color: theme.secondary}}>you</span> want next?
          </div>
          <div
            style={{
              fontSize: 24,
              color: theme.textDim,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            💬 Tell me in the comments below.
          </div>
        </div>
      </AbsoluteFill>
    </SectionFrame>
  );
};
