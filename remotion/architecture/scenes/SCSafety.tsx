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

const RUNGS = [
  {label: 'Read a document', risk: 'LOW', color: '#22C55E', fill: 0.18, dot: 1},
  {label: 'Write to a database', risk: 'MEDIUM', color: '#84CC16', fill: 0.36, dot: 2},
  {label: 'Send an email', risk: 'HIGHER', color: '#F59E0B', fill: 0.6, dot: 3},
  {label: 'Delete data', risk: 'HIGH', color: '#F97316', fill: 0.8, dot: 4},
  {label: 'Deploy code · Make payment', risk: 'CRITICAL', color: '#EF4444', fill: 1.0, dot: 5},
];

const Rung: React.FC<{rung: (typeof RUNGS)[number]; delay: number}> = ({
  rung,
  delay,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({
    frame: frame - delay,
    fps,
    config: {damping: 18, stiffness: 130},
  });
  return (
    <div
      style={{
        opacity: sp,
        transform: `translateX(${interpolate(sp, [0, 1], [-30, 0])}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '20px 26px',
        borderRadius: 18,
        background:
          'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.45) 100%)',
        border: `1px solid ${rung.color}55`,
        marginBottom: 14,
      }}
    >
      <div style={{display: 'flex', gap: 4}}>
        {[1, 2, 3, 4, 5].map((d) => (
          <div
            key={d}
            style={{
              width: 14,
              height: 26,
              borderRadius: 4,
              background: d <= rung.dot ? rung.color : 'rgba(148, 163, 184, 0.18)',
              boxShadow: d <= rung.dot ? `0 0 10px ${rung.color}AA` : 'none',
            }}
          />
        ))}
      </div>
      <div
        style={{
          width: 130,
          padding: '6px 14px',
          borderRadius: 999,
          background: `${rung.color}28`,
          border: `1px solid ${rung.color}66`,
          color: rung.color,
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 3,
          textAlign: 'center',
        }}
      >
        {rung.risk}
      </div>
      <div
        style={{
          fontSize: 28,
          color: theme.text,
          fontWeight: 700,
          letterSpacing: -0.3,
        }}
      >
        {rung.label}
      </div>
    </div>
  );
};

export const SCSafety: React.FC<{section: Section}> = ({section}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const approvalSpring = spring({
    frame: frame - 32 * 30,
    fps,
    config: {damping: 14, stiffness: 100, mass: 0.85},
  });
  const approvalExit = interpolate(frame, [52 * 30, 55 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const buttonPulse = 1 + Math.sin(frame * 0.14) * 0.03;

  return (
    <SectionFrame section={section} scrim="left">
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          padding: '0 100px',
          opacity: 1 - approvalSpring * 0.65,
        }}
      >
        <div style={{display: 'flex', gap: 80, alignItems: 'center'}}>
          <div style={{flex: '0 0 520px'}}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 7,
                fontWeight: 800,
                color: '#F59E0B',
                marginBottom: 18,
                textTransform: 'uppercase',
              }}
            >
              Risk-tier every action
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: -2,
                color: theme.text,
                textShadow: '0 0 40px rgba(245, 158, 11, 0.45)',
              }}
            >
              Reasoning without safety creates{' '}
              <span
                style={{
                  background: `linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                confident mistakes.
              </span>
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 22,
                color: theme.textDim,
                lineHeight: 1.5,
              }}
            >
              Permissions, logging, approval flows, and clear tool boundaries —
              non-negotiable in production.
            </div>
          </div>
          <div style={{flex: 1, maxWidth: 880}}>
            {RUNGS.map((r, i) => (
              <Rung key={r.label} rung={r} delay={2 * 30 + i * 90} />
            ))}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: approvalSpring * approvalExit,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
        }}
      >
        <div
          style={{
            transform: `scale(${interpolate(approvalSpring, [0, 1], [0.8, 1])})`,
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.75) 100%)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(245, 158, 11, 0.55)',
            borderRadius: 32,
            padding: '54px 60px',
            width: 980,
            boxShadow: `0 30px 90px rgba(2, 6, 23, 0.65), 0 0 80px rgba(245, 158, 11, 0.35)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div style={{fontSize: 32}}>⚠️</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 5,
                color: '#F59E0B',
              }}
            >
              HUMAN APPROVAL REQUIRED
            </div>
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: theme.text,
              lineHeight: 1.2,
              marginBottom: 18,
            }}
          >
            "I drafted the email to your customer.
            <br />
            <span style={{color: '#FBBF24'}}>Do you want me to send it?</span>"
          </div>
          <div
            style={{
              padding: 22,
              borderRadius: 14,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              fontSize: 18,
              color: theme.textDim,
              fontFamily:
                'ui-monospace, SF Mono, Menlo, Consolas, monospace',
              marginBottom: 28,
              lineHeight: 1.4,
            }}
          >
            <div style={{color: '#94A3B8'}}>To: alex@acme.com</div>
            <div style={{color: '#94A3B8'}}>Subject: Q4 renewal proposal</div>
            <div style={{color: '#E2E8F0', marginTop: 10}}>
              Hi Alex — quick follow-up on our renewal conversation last week...
            </div>
          </div>
          <div style={{display: 'flex', gap: 16}}>
            <div
              style={{
                flex: 1,
                padding: '20px 28px',
                borderRadius: 14,
                background: 'rgba(148, 163, 184, 0.1)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                color: theme.textDim,
                fontSize: 22,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              ✕  Reject
            </div>
            <div
              style={{
                flex: 1,
                padding: '20px 28px',
                borderRadius: 14,
                background: `linear-gradient(135deg, ${theme.secondary} 0%, #16A34A 100%)`,
                color: theme.text,
                fontSize: 22,
                fontWeight: 800,
                textAlign: 'center',
                transform: `scale(${buttonPulse})`,
                boxShadow: `0 0 40px ${theme.glowGreen}, inset 0 1px 0 rgba(255,255,255,0.3)`,
              }}
            >
              ✓  Approve & Send
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SectionFrame>
  );
};
