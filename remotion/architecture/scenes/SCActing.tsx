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
import {
  SearchIcon,
  DatabaseIcon,
  FilesIcon,
  CodeIcon,
  CalendarIcon,
  MailIcon,
  UsersIcon,
  CardIcon,
  GlobeIcon,
} from '../Icons';

type IconCmp = React.FC<{size?: number; color?: string; strokeWidth?: number}>;

const TOOLS: {Icon: IconCmp; label: string}[] = [
  {Icon: SearchIcon, label: 'Search'},
  {Icon: DatabaseIcon, label: 'Database'},
  {Icon: FilesIcon, label: 'Files'},
  {Icon: CodeIcon, label: 'Code'},
  {Icon: CalendarIcon, label: 'Calendar'},
  {Icon: MailIcon, label: 'Email'},
  {Icon: UsersIcon, label: 'CRM'},
  {Icon: CardIcon, label: 'Payment'},
  {Icon: GlobeIcon, label: 'APIs'},
];

const ToolChip: React.FC<{
  Icon: IconCmp;
  label: string;
  delay: number;
}> = ({Icon, label, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({
    frame: frame - delay,
    fps,
    config: {damping: 14, stiffness: 110, mass: 0.85},
  });
  const pulse = 0.7 + Math.sin(frame * 0.06 + delay) * 0.3;
  return (
    <div
      style={{
        opacity: sp,
        transform: `scale(${interpolate(sp, [0, 1], [0.6, 1])}) translateY(${interpolate(sp, [0, 1], [20, 0])}px)`,
        background:
          'linear-gradient(135deg, rgba(34, 197, 94, 0.16) 0%, rgba(34, 197, 94, 0.06) 100%)',
        border: '1px solid rgba(34, 197, 94, 0.4)',
        borderRadius: 22,
        padding: '26px 22px',
        textAlign: 'center',
        boxShadow: `0 0 ${20 + pulse * 16}px rgba(34, 197, 94, 0.25)`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <div style={{marginBottom: 14, color: '#86EFAC', display: 'flex', justifyContent: 'center'}}>
        <Icon size={48} strokeWidth={1.6} />
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: theme.text,
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const SCActing: React.FC<{section: Section}> = ({section}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const codeStart = 36 * 30;
  const codeEnter = spring({
    frame: frame - codeStart,
    fps,
    config: {damping: 18, stiffness: 110},
  });
  const codeExit = interpolate(frame, [56 * 30, 60 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const responseShow = interpolate(
    frame,
    [codeStart + 90, codeStart + 130],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const codeText = `agent.tools.call({
  name: 'getSalesReport',
  args: { range: 'last_7_days' }
})`;

  return (
    <SectionFrame section={section} scrim="center">
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '120px 0 0',
          opacity: 1 - codeEnter,
        }}
      >
        <div style={{textAlign: 'center', marginBottom: 50}}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 7,
              fontWeight: 800,
              color: theme.secondary,
              marginBottom: 14,
              textTransform: 'uppercase',
            }}
          >
            Tools = the AI's hands
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: theme.text,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              textShadow: `0 0 40px ${theme.glowGreen}`,
            }}
          >
            Without tools, just text. With tools,{' '}
            <span
              style={{
                background: `linear-gradient(135deg, #22C55E 0%, #818CF8 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              real action.
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 220px)',
            gap: 24,
          }}
        >
          {TOOLS.map((t, i) => (
            <ToolChip
              key={t.label}
              Icon={t.Icon}
              label={t.label}
              delay={3 * 30 + i * 8}
            />
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: codeEnter * codeExit,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 36,
            alignItems: 'stretch',
            width: '100%',
            maxWidth: 1620,
          }}
        >
          <div
            style={{
              flex: 1,
              background:
                'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.7) 100%)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              borderRadius: 24,
              padding: 36,
              boxShadow: '0 24px 60px rgba(2, 6, 23, 0.6)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 22,
              }}
            >
              <div
                style={{width: 12, height: 12, borderRadius: 999, background: '#EF4444'}}
              />
              <div
                style={{width: 12, height: 12, borderRadius: 999, background: '#F59E0B'}}
              />
              <div
                style={{width: 12, height: 12, borderRadius: 999, background: '#22C55E'}}
              />
              <div
                style={{
                  marginLeft: 16,
                  color: '#94A3B8',
                  fontSize: 15,
                  fontFamily: 'monospace',
                  letterSpacing: 1,
                }}
              >
                agent · tool-call
              </div>
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: 26,
                lineHeight: 1.5,
                fontFamily:
                  'ui-monospace, SF Mono, Menlo, Consolas, monospace',
                color: '#E2E8F0',
                whiteSpace: 'pre-wrap',
              }}
            >
              <span style={{color: '#818CF8'}}>agent</span>
              <span style={{color: '#94A3B8'}}>.</span>
              <span style={{color: '#22C55E'}}>tools</span>
              <span style={{color: '#94A3B8'}}>.</span>
              <span style={{color: '#22C55E'}}>call</span>
              <span style={{color: '#94A3B8'}}>(</span>
              {'{\n'}
              {'  '}
              <span style={{color: '#A855F7'}}>name</span>
              <span style={{color: '#94A3B8'}}>: </span>
              <span style={{color: '#FBBF24'}}>'getSalesReport'</span>
              <span style={{color: '#94A3B8'}}>,</span>
              {'\n'}
              {'  '}
              <span style={{color: '#A855F7'}}>args</span>
              <span style={{color: '#94A3B8'}}>: {'{ '}</span>
              <span style={{color: '#A855F7'}}>range</span>
              <span style={{color: '#94A3B8'}}>: </span>
              <span style={{color: '#FBBF24'}}>'last_7_days'</span>
              <span style={{color: '#94A3B8'}}> {'}'}</span>
              {'\n'}
              <span style={{color: '#94A3B8'}}>{'})'}</span>
            </pre>
          </div>
          <div
            style={{
              flex: 1,
              opacity: responseShow,
              transform: `translateX(${interpolate(responseShow, [0, 1], [40, 0])}px)`,
              background:
                'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.45)',
              borderRadius: 24,
              padding: 36,
              boxShadow: `0 24px 60px rgba(2, 6, 23, 0.5), 0 0 60px ${theme.glowGreen}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 5,
                color: theme.secondary,
                marginBottom: 18,
              }}
            >
              ✓ TOOL RESPONSE
            </div>
            <table
              style={{
                width: '100%',
                fontSize: 22,
                color: theme.text,
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr style={{color: '#94A3B8', textAlign: 'left'}}>
                  <th style={{padding: '8px 0'}}>Day</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Mon', '142', '$28.4k'],
                  ['Tue', '156', '$31.2k'],
                  ['Wed', '189', '$38.6k'],
                  ['Thu', '167', '$33.1k'],
                  ['Fri', '203', '$41.2k'],
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{borderTop: '1px solid rgba(148, 163, 184, 0.15)'}}
                  >
                    {row.map((c, j) => (
                      <td
                        key={j}
                        style={{
                          padding: '10px 0',
                          fontFamily:
                            j === 0
                              ? 'inherit'
                              : 'ui-monospace, SF Mono, monospace',
                          color: j === 2 ? theme.secondary : theme.text,
                        }}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AbsoluteFill>
    </SectionFrame>
  );
};
