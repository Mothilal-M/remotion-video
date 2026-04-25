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
import {theme} from '../../theme';
import {HeroBackdrop} from '../../components/HeroBackdrop';
import {BottomGlassPanel, LiveIndicator} from './RTShared';

type Direction = 'left' | 'right' | 'scale';

type Props = {
  index: number;
  total: number;
  badge: string;
  title: string;
  text: string;
  image: string;
  audio: string;
  glow: string;
  panX: number;
  panY: number;
  direction: Direction;
};

export const RTPoint: React.FC<Props> = ({
  index,
  total,
  badge,
  title,
  text,
  image,
  audio,
  glow,
  panX,
  panY,
  direction,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: {damping: 22, stiffness: 120, mass: 0.85},
  });
  const offsetX =
    direction === 'left'
      ? interpolate(enterSpring, [0, 1], [-300, 0])
      : direction === 'right'
        ? interpolate(enterSpring, [0, 1], [300, 0])
        : 0;
  const enterScale = direction === 'scale' ? interpolate(enterSpring, [0, 1], [0.8, 1]) : 1;

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: {damping: 18, stiffness: 130},
  });
  const textOpacity = interpolate(frame, [22, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill>
      <Audio src={staticFile(audio)} volume={1} />
      <HeroBackdrop
        src={image}
        zoomFrom={1.07}
        zoomTo={1.2}
        panX={panX}
        panY={panY}
        scrim="bottom"
        scrimStrength={1.05}
      />

      <AbsoluteFill style={{padding: 70, opacity: exit}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <LiveIndicator label={badge.toUpperCase()} />
          <div
            style={{
              display: 'flex',
              gap: 10,
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
            }}
          >
            {Array.from({length: total}).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === index ? 32 : 10,
                  height: 6,
                  borderRadius: 999,
                  background:
                    i === index
                      ? `linear-gradient(90deg, ${theme.primary}, #A855F7)`
                      : 'rgba(148, 163, 184, 0.35)',
                  boxShadow: i === index ? `0 0 12px ${theme.glow}` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${offsetX}px) scale(${enterScale})`,
          opacity: enterSpring,
        }}
      >
        <BottomGlassPanel glow={glow}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: theme.secondary,
              marginBottom: 18,
            }}
          >
            {String(index + 1).padStart(2, '0')} · {badge}
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: theme.text,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              opacity: titleSpring,
              transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
              textShadow: `0 0 32px ${glow}`,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 32,
              fontWeight: 500,
              color: theme.textDim,
              lineHeight: 1.35,
              opacity: textOpacity,
            }}
          >
            {text}
          </div>
        </BottomGlassPanel>
      </div>
    </AbsoluteFill>
  );
};

export const RTPoint1: React.FC = () => (
  <RTPoint
    index={0}
    total={3}
    badge="REAL-TIME Q&A"
    title="Real-time Questions"
    text="AI asks dynamic, role-based questions tailored to you."
    image="images/point1.png"
    audio="voice/point1.mp3"
    glow={theme.glow}
    panX={-25}
    panY={-15}
    direction="left"
  />
);

export const RTPoint2: React.FC = () => (
  <RTPoint
    index={1}
    total={3}
    badge="LIVE ANALYTICS"
    title="Tracks Your Answers"
    text="Analyzes confidence, tone & accuracy in real time."
    image="images/point2.png"
    audio="voice/point2.mp3"
    glow={theme.glowPurple}
    panX={20}
    panY={-20}
    direction="right"
  />
);

export const RTPoint3: React.FC = () => (
  <RTPoint
    index={2}
    total={3}
    badge="INSTANT SCORE"
    title="Instant Feedback"
    text="Get scores & improvement tips the moment you're done."
    image="images/point3.png"
    audio="voice/point3.mp3"
    glow={theme.glowGreen}
    panX={0}
    panY={-10}
    direction="scale"
  />
);
