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
import {DTLiveIndicator, DTSidePanel} from './DTShared';

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
  textSide: 'left' | 'right';
};

const DTPoint: React.FC<Props> = ({
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
  textSide,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 12,
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

  const scrimGradient =
    textSide === 'left'
      ? 'linear-gradient(90deg, rgba(7, 11, 23, 0.88) 0%, rgba(7, 11, 23, 0.5) 38%, rgba(7, 11, 23, 0.0) 62%)'
      : 'linear-gradient(270deg, rgba(7, 11, 23, 0.88) 0%, rgba(7, 11, 23, 0.5) 38%, rgba(7, 11, 23, 0.0) 62%)';

  return (
    <AbsoluteFill>
      <Audio src={staticFile(audio)} volume={1} />
      <HeroBackdrop
        src={image}
        zoomFrom={1.05}
        zoomTo={1.15}
        panX={panX}
        panY={panY}
        scrim="none"
      />
      <AbsoluteFill style={{background: scrimGradient, pointerEvents: 'none'}} />

      <AbsoluteFill style={{padding: 64, opacity: exit}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <DTLiveIndicator label={badge.toUpperCase()} />
          <div
            style={{
              display: 'flex',
              gap: 10,
              padding: '10px 20px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              alignItems: 'center',
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

      <DTSidePanel side={textSide} width={820} glow={glow}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: theme.secondary,
            marginBottom: 20,
          }}
        >
          {String(index + 1).padStart(2, '0')} · {badge}
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: theme.text,
            letterSpacing: -1.6,
            lineHeight: 1.04,
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
            textShadow: `0 0 32px ${glow}`,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 32,
            fontWeight: 500,
            color: theme.textDim,
            lineHeight: 1.35,
            opacity: textOpacity,
          }}
        >
          {text}
        </div>
      </DTSidePanel>
    </AbsoluteFill>
  );
};

export const DTPoint1: React.FC = () => (
  <DTPoint
    index={0}
    total={3}
    badge="REAL-TIME Q&A"
    title="Real-time Questions"
    text="AI asks dynamic, role-based questions tailored to you."
    image="images/landscape/point1.png"
    audio="voice/point1.mp3"
    glow={theme.glow}
    panX={-20}
    panY={-10}
    textSide="left"
  />
);

export const DTPoint2: React.FC = () => (
  <DTPoint
    index={1}
    total={3}
    badge="LIVE ANALYTICS"
    title="Tracks Your Answers"
    text="Analyzes confidence, tone & accuracy in real time."
    image="images/landscape/point2.png"
    audio="voice/point2.mp3"
    glow={theme.glowPurple}
    panX={20}
    panY={-10}
    textSide="left"
  />
);

export const DTPoint3: React.FC = () => (
  <DTPoint
    index={2}
    total={3}
    badge="INSTANT SCORE"
    title="Instant Feedback"
    text="Get scores & improvement tips the moment you're done."
    image="images/landscape/point3.png"
    audio="voice/point3.mp3"
    glow={theme.glowGreen}
    panX={-15}
    panY={-10}
    textSide="left"
  />
);
