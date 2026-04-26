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

const QUESTIONS = [
  'What is the task?',
  'What information do I already have?',
  'What information is missing?',
  'Can I answer directly, or do I need a tool?',
  'Is this a safe action?',
];

const ChecklistRow: React.FC<{
  text: string;
  delay: number;
  index: number;
}> = ({text, delay, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: {damping: 20, stiffness: 130},
  });
  const checkAt = delay + 36;
  const checkSpring = spring({
    frame: frame - checkAt,
    fps,
    config: {damping: 12, stiffness: 130},
  });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '20px 28px',
        borderRadius: 18,
        background:
          'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.45) 100%)',
        border: '1px solid rgba(148, 163, 184, 0.22)',
        opacity: enter,
        transform: `translateX(${interpolate(enter, [0, 1], [-30, 0])}px)`,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: `2px solid ${checkSpring > 0.05 ? theme.secondary : 'rgba(148, 163, 184, 0.4)'}`,
          background:
            checkSpring > 0.05
              ? `${theme.secondary}33`
              : 'rgba(148, 163, 184, 0.08)',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          boxShadow:
            checkSpring > 0.05
              ? `0 0 18px ${theme.glowGreen}`
              : 'none',
        }}
      >
        {checkSpring > 0.05 ? (
          <svg width={26} height={26} viewBox="0 0 24 24">
            <path
              d="M20 6 9 17l-5-5"
              stroke={theme.secondary}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={1}
              pathLength={1}
              strokeDashoffset={1 - checkSpring}
            />
          </svg>
        ) : null}
      </div>
      <div
        style={{
          fontSize: 28,
          color: theme.text,
          fontWeight: 600,
          letterSpacing: -0.3,
          opacity: 0.6 + checkSpring * 0.4,
        }}
      >
        <span style={{color: '#475569', marginRight: 14, fontWeight: 800}}>
          {String(index + 1).padStart(2, '0')}
        </span>
        {text}
      </div>
    </div>
  );
};

export const SCReasoning: React.FC<{section: Section}> = ({section}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const exampleEnter = spring({
    frame: frame - 28 * 30,
    fps,
    config: {damping: 18, stiffness: 110},
  });
  const exampleExit = interpolate(frame, [50 * 30, 53 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SectionFrame section={section} scrim="left">
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          padding: '0 100px',
          opacity: 1 - exampleEnter * 0.7,
        }}
      >
        <div style={{display: 'flex', gap: 80, alignItems: 'flex-start'}}>
          <div style={{flex: '0 0 460px', paddingTop: 40}}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 7,
                fontWeight: 800,
                color: '#818CF8',
                marginBottom: 18,
                textTransform: 'uppercase',
              }}
            >
              The internal questions
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: -2,
                color: theme.text,
                textShadow: `0 0 40px ${theme.glow}`,
              }}
            >
              The model{' '}
              <span
                style={{
                  background: `linear-gradient(135deg, #818CF8 0%, #C084FC 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                builds a plan
              </span>{' '}
              before it answers.
            </div>
            <div
              style={{
                marginTop: 30,
                fontSize: 22,
                color: theme.textDim,
                lineHeight: 1.5,
              }}
            >
              Guided by system prompts, examples, policies, and explicit
              planning steps.
            </div>
          </div>
          <div style={{flex: 1, maxWidth: 880}}>
            {QUESTIONS.map((q, i) => (
              <ChecklistRow
                key={q}
                text={q}
                delay={2 * 30 + i * 80}
                index={i}
              />
            ))}
          </div>
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
            border: `1px solid ${'#818CF8'}55`,
            borderRadius: 28,
            padding: '36px 44px',
            width: 1640,
            boxShadow: `0 24px 70px rgba(2, 6, 23, 0.6), 0 0 50px ${theme.glow}`,
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
            👤 VAGUE REQUEST
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 24,
              fontStyle: 'italic',
            }}
          >
            "Help me prepare for an interview."
          </div>
          <div style={{display: 'flex', gap: 18, flexWrap: 'wrap'}}>
            {['Coding?', 'System design?', 'Behavioral?', 'Which role?', 'How much time?'].map(
              (q, i) => {
                const sp = spring({
                  frame: frame - 30 * 30 - i * 6,
                  fps,
                  config: {damping: 18, stiffness: 130},
                });
                return (
                  <div
                    key={q}
                    style={{
                      padding: '14px 22px',
                      borderRadius: 999,
                      background: 'rgba(129, 140, 248, 0.18)',
                      border: '1px solid rgba(129, 140, 248, 0.5)',
                      color: '#C7D2FE',
                      fontSize: 22,
                      fontWeight: 600,
                      opacity: sp,
                      transform: `translateY(${interpolate(sp, [0, 1], [16, 0])}px)`,
                    }}
                  >
                    ↳ {q}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </AbsoluteFill>
    </SectionFrame>
  );
};
