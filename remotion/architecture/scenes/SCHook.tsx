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
import {MessageIcon, RobotIcon} from '../Icons';

const CHAOS_WORDS = [
  'LLM',
  'RAG',
  'AGENTS',
  'TOOLS',
  'MEMORY',
  'MCP',
  'VECTOR DB',
  'EVALS',
  'ORCHESTRATION',
  'EMBEDDINGS',
  'PROMPTS',
];

export const SCHook: React.FC<{section: Section}> = ({section}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const COLLAPSE_START = 14 * 30;
  const COLLAPSE_END = 18 * 30;
  const TITLE_START = COLLAPSE_END - 6;

  const collapseProgress = interpolate(
    frame,
    [COLLAPSE_START, COLLAPSE_END],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const titleSpring = spring({
    frame: frame - TITLE_START,
    fps,
    config: {damping: 14, stiffness: 95, mass: 0.85},
  });

  const subSpring = spring({
    frame: frame - TITLE_START - 24,
    fps,
    config: {damping: 18, stiffness: 110},
  });

  const compareEnter = interpolate(frame, [22 * 30, 24 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const compareExit = interpolate(
    frame,
    [50 * 30, 53 * 30],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <SectionFrame section={section} scrim="bottom">
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        {CHAOS_WORDS.map((w, i) => {
          const seed = `chaos-${i}`;
          const baseX = (random(seed + 'x') - 0.5) * 1500;
          const baseY = (random(seed + 'y') - 0.5) * 700;
          const driftX = Math.sin(frame * 0.03 + i) * 30;
          const driftY = Math.cos(frame * 0.025 + i * 1.3) * 20;
          const x = baseX * (1 - collapseProgress);
          const y = baseY * (1 - collapseProgress);
          const scale = interpolate(collapseProgress, [0, 1], [1, 0.1]);
          const opacity = interpolate(
            collapseProgress,
            [0, 0.7, 1],
            [0.7 + random(seed + 'o') * 0.3, 0.5, 0],
          );
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                transform: `translate(${x + driftX}px, ${y + driftY}px) scale(${scale})`,
                padding: '14px 26px',
                borderRadius: 14,
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(148, 163, 184, 0.28)',
                color: theme.textDim,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 3,
                opacity,
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {w}
            </div>
          );
        })}

        <div
          style={{
            opacity: titleSpring * (1 - compareEnter),
            transform: `scale(${interpolate(titleSpring, [0, 1], [0.6, 1])})`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              fontWeight: 700,
              color: theme.primary,
              marginBottom: 24,
              textTransform: 'uppercase',
            }}
          >
            Modern AI architecture
          </div>
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: -4,
              color: theme.text,
              textShadow: `0 0 80px ${theme.glow}, 0 0 40px rgba(168, 85, 247, 0.5)`,
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
          <div
            style={{
              marginTop: 30,
              fontSize: 32,
              color: theme.textDim,
              fontWeight: 500,
              letterSpacing: 1,
              opacity: subSpring,
              transform: `translateY(${interpolate(subSpring, [0, 1], [16, 0])}px)`,
            }}
          >
            the only two ideas you need.
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: compareEnter * compareExit,
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 0 130px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 60,
            alignItems: 'stretch',
          }}
        >
          {[
            {
              label: 'CHATBOT',
              Icon: MessageIcon,
              line: 'Responds.',
              color: '#94A3B8',
              glow: 'rgba(148, 163, 184, 0.35)',
            },
            {
              label: 'AI AGENT',
              Icon: RobotIcon,
              line: 'Reasons. Acts. Observes. Repeats.',
              color: theme.secondary,
              glow: theme.glowGreen,
            },
          ].map((c, i) => {
            const enter = spring({
              frame: frame - 23 * 30 - i * 10,
              fps,
              config: {damping: 18, stiffness: 110},
            });
            return (
              <div
                key={c.label}
                style={{
                  width: 540,
                  padding: '36px 40px',
                  borderRadius: 28,
                  background:
                    'linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.55) 100%)',
                  border: `1px solid ${c.color}55`,
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow: `0 24px 70px rgba(2, 6, 23, 0.5), 0 0 60px ${c.glow}`,
                  opacity: enter,
                  transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`,
                }}
              >
                <div style={{marginBottom: 16, color: c.color}}>
                  <c.Icon size={56} strokeWidth={1.6} />
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: 5,
                    color: c.color,
                    marginBottom: 10,
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: theme.text,
                    lineHeight: 1.2,
                  }}
                >
                  {c.line}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SectionFrame>
  );
};
