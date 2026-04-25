import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {theme} from '../theme';
import {GlassCard} from '../components/GlassCard';

type Direction = 'left' | 'right' | 'scale';

type PointProps = {
  index: number;
  total: number;
  title: string;
  text: string;
  direction: Direction;
  glow: string;
  icon: React.ReactNode;
  audio: string;
};

const PointCard: React.FC<PointProps> = ({
  index,
  total,
  title,
  text,
  direction,
  glow,
  icon,
  audio,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: {damping: 20, stiffness: 120, mass: 0.85},
  });

  const offsetX =
    direction === 'left'
      ? interpolate(enterSpring, [0, 1], [-700, 0])
      : direction === 'right'
        ? interpolate(enterSpring, [0, 1], [700, 0])
        : 0;
  const enterScale =
    direction === 'scale' ? interpolate(enterSpring, [0, 1], [0.7, 1]) : 1;

  const enterOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitStart = durationInFrames - 26;
  const exitProgress = interpolate(
    frame,
    [exitStart, durationInFrames - 1],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const exitX = direction === 'left' ? -800 * exitProgress : direction === 'right' ? 800 * exitProgress : 0;
  const exitOpacity = 1 - exitProgress;
  const exitBlur = exitProgress * 12;

  const titleSpring = spring({
    frame: frame - 14,
    fps,
    config: {damping: 18, stiffness: 130},
  });
  const textOpacity = interpolate(frame, [22, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <Audio src={staticFile(audio)} volume={1} />
      <div
        style={{
          position: 'absolute',
          top: 160,
          display: 'flex',
          gap: 14,
          opacity: enterOpacity * exitOpacity,
        }}
      >
        {Array.from({length: total}).map((_, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              style={{
                width: active ? 56 : 18,
                height: 8,
                borderRadius: 999,
                background: active
                  ? `linear-gradient(90deg, ${theme.primary}, #A855F7)`
                  : 'rgba(148, 163, 184, 0.25)',
                boxShadow: active ? `0 0 18px ${theme.glow}` : 'none',
                transition: 'none',
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          transform: `translateX(${offsetX + exitX}px) scale(${enterScale})`,
          opacity: enterOpacity * exitOpacity,
          filter: `blur(${exitBlur}px)`,
          width: '88%',
          maxWidth: 920,
        }}
      >
        <GlassCard glow={glow} glowStrength={1.2} style={{padding: 60}}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 36,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 32,
                background: `linear-gradient(135deg, ${theme.primary} 0%, #A855F7 100%)`,
                display: 'grid',
                placeItems: 'center',
                boxShadow: `0 20px 60px ${glow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                transform: `scale(${spring({
                  frame: frame - 6,
                  fps,
                  config: {damping: 10, stiffness: 110},
                })})`,
              }}
            >
              {icon}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: theme.secondary,
              }}
            >
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 800,
                color: theme.text,
                letterSpacing: -1.5,
                lineHeight: 1.05,
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
                textShadow: `0 0 40px ${glow}`,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: theme.textDim,
                lineHeight: 1.35,
                opacity: textOpacity,
              }}
            >
              {text}
            </div>
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

const ChatIcon = () => (
  <svg width="78" height="78" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 12a8 8 0 1 1-3.2-6.4l3.2-1.1-1.1 3.2A8 8 0 0 1 21 12Z"
      stroke="white"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="12" r="1.2" fill="white" />
    <circle cx="13" cy="12" r="1.2" fill="white" />
    <circle cx="17" cy="12" r="1.2" fill="white" />
  </svg>
);

const ChartIcon = () => (
  <svg width="78" height="78" viewBox="0 0 24 24" fill="none">
    <path d="M4 20V8M10 20V4M16 20v-8M22 20H2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="4" cy="8" r="1.6" fill="white" />
    <circle cx="10" cy="4" r="1.6" fill="white" />
    <circle cx="16" cy="12" r="1.6" fill="white" />
  </svg>
);

const CheckIcon = () => (
  <svg width="78" height="78" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6 9 17l-5-5"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Point1: React.FC = () => (
  <PointCard
    index={0}
    total={3}
    title="Real-time Questions"
    text="AI asks dynamic, role-based questions tailored to you."
    direction="left"
    glow={theme.glow}
    icon={<ChatIcon />}
    audio="voice/point1.mp3"
  />
);

export const Point2: React.FC = () => (
  <PointCard
    index={1}
    total={3}
    title="Tracks Your Answers"
    text="Analyzes confidence, tone & accuracy in real time."
    direction="right"
    glow={theme.glowPurple}
    icon={<ChartIcon />}
    audio="voice/point2.mp3"
  />
);

export const Point3: React.FC = () => (
  <PointCard
    index={2}
    total={3}
    title="Instant Feedback"
    text="Get scores & improvement tips the moment you're done."
    direction="scale"
    glow={theme.glowGreen}
    icon={<CheckIcon />}
    audio="voice/point3.mp3"
  />
);
