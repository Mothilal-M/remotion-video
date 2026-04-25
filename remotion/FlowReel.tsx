import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';
import {theme} from './theme';
import {Particles} from './components/Particles';
import {
  FLOW_DURATION_IN_FRAMES,
  FLOW_FPS,
  FLOW_FRAMES,
  STAGES,
  WORLD_HEIGHT,
} from './flow/data';
import {StageNode} from './flow/StageNode';
import {StageDetail} from './flow/StageDetail';
import {FlowConnector} from './flow/FlowConnector';

loadFont('normal', {weights: ['500', '700', '800', '900'], subsets: ['latin']});

export {FLOW_DURATION_IN_FRAMES, FLOW_FPS};

const VIEWPORT_W = 1080;
const VIEWPORT_H = 1920;

const Header: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 110}});
  const exit = interpolate(
    frame,
    [FLOW_FRAMES.introEnd - 20, FLOW_FRAMES.introEnd + 10],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <div
      style={{
        position: 'absolute',
        top: 90,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: enter * exit,
        transform: `translateY(${interpolate(enter, [0, 1], [-30, 0])}px)`,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '12px 26px',
          borderRadius: 999,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(79, 70, 229, 0.45)',
          color: theme.primary,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 6,
          marginBottom: 22,
        }}
      >
        THE LIFECYCLE
      </div>
      <div
        style={{
          fontSize: 78,
          fontWeight: 900,
          color: theme.text,
          letterSpacing: -1.5,
          lineHeight: 1.05,
          textShadow: `0 0 40px ${theme.glow}`,
        }}
      >
        How an{' '}
        <span
          style={{
            background: `linear-gradient(135deg, #818CF8 0%, #22C55E 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AI Interview
        </span>
        <br />
        actually works
      </div>
    </div>
  );
};

const StageBadge: React.FC<{frame: number}> = ({frame}) => {
  const stageIdx =
    frame < FLOW_FRAMES.s1End
      ? 0
      : frame < FLOW_FRAMES.s2End
        ? 1
        : frame < FLOW_FRAMES.s3End
          ? 2
          : frame < FLOW_FRAMES.s4End
            ? 3
            : -1;
  if (stageIdx < 0 || frame < FLOW_FRAMES.s1Start) return null;
  const stage = STAGES[stageIdx];
  const pulse = 0.5 + Math.sin(frame * 0.18) * 0.5;
  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: 60,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 22px',
        borderRadius: 999,
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${stage.color}66`,
        color: stage.color,
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: 5,
        boxShadow: `0 0 30px ${stage.glow}`,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: stage.color,
          opacity: 0.5 + pulse * 0.5,
          boxShadow: `0 0 ${10 + pulse * 14}px ${stage.color}`,
        }}
      />
      {stage.short} · {stage.label.toUpperCase()}
    </div>
  );
};

const ProgressDots: React.FC<{frame: number}> = ({frame}) => {
  const activeIdx = STAGES.findIndex(
    (s) => frame >= s.startFrame && frame < s.endFrame,
  );
  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        right: 60,
        display: 'flex',
        gap: 12,
        padding: '12px 22px',
        borderRadius: 999,
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(148, 163, 184, 0.25)',
        alignItems: 'center',
      }}
    >
      {STAGES.map((s, i) => (
        <div
          key={i}
          style={{
            width: i === activeIdx ? 32 : 10,
            height: 6,
            borderRadius: 999,
            background:
              i <= activeIdx && activeIdx >= 0
                ? s.color
                : 'rgba(148, 163, 184, 0.35)',
            boxShadow: i === activeIdx ? `0 0 12px ${s.glow}` : 'none',
          }}
        />
      ))}
    </div>
  );
};

const OutroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - FLOW_FRAMES.outroStart;
  if (local < 0) return null;
  const {fps} = useVideoConfig();
  const enter = spring({frame: local, fps, config: {damping: 18, stiffness: 110}});
  const fadeOut = interpolate(
    frame,
    [FLOW_FRAMES.outroEnd - 36, FLOW_FRAMES.outroEnd - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{opacity: enter * fadeOut}}>
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(7, 11, 23, 0.0) 0%, rgba(7, 11, 23, 0.55) 45%, rgba(7, 11, 23, 0.92) 100%)',
          pointerEvents: 'none',
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 80px 180px',
          transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`,
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.55) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(148, 163, 184, 0.22)',
            borderRadius: 36,
            padding: '50px 60px',
            textAlign: 'center',
            boxShadow: `0 30px 90px rgba(2, 6, 23, 0.6), 0 0 80px ${theme.glow}`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: theme.text,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              textShadow: `0 0 50px ${theme.glow}`,
            }}
          >
            Four stages.
            <br />
            From{' '}
            <span
              style={{
                background: `linear-gradient(135deg, #818CF8 0%, #22C55E 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              application
            </span>{' '}
            to{' '}
            <span
              style={{
                background: `linear-gradient(135deg, #22C55E 0%, #C084FC 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              insight.
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const FlowReel: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraY = interpolate(
    frame,
    [
      FLOW_FRAMES.introStart,
      FLOW_FRAMES.s1End - 30,
      FLOW_FRAMES.s2Start + 10,
      FLOW_FRAMES.s2End - 30,
      FLOW_FRAMES.s3Start + 10,
      FLOW_FRAMES.s3End - 30,
      FLOW_FRAMES.s4Start + 10,
      FLOW_FRAMES.outroStart - 30,
      FLOW_FRAMES.outroStart + 30,
      FLOW_FRAMES.outroEnd,
    ],
    [
      STAGES[0].pos.y,
      STAGES[0].pos.y,
      STAGES[1].pos.y,
      STAGES[1].pos.y,
      STAGES[2].pos.y,
      STAGES[2].pos.y,
      STAGES[3].pos.y,
      STAGES[3].pos.y,
      (STAGES[0].pos.y + STAGES[3].pos.y) / 2,
      (STAGES[0].pos.y + STAGES[3].pos.y) / 2,
    ],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const cameraScale = interpolate(
    frame,
    [FLOW_FRAMES.outroStart, FLOW_FRAMES.outroStart + 30],
    [1, 0.55],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const translateY = VIEWPORT_H / 2 - cameraY;

  const activeStage = STAGES.find(
    (s) => frame >= s.startFrame && frame < s.endFrame,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, #1E1B4B 0%, ${theme.bg} 60%, ${theme.bgDeep} 100%)`,
        }}
      />
      <AbsoluteFill style={{opacity: 0.4}}>
        <Particles count={50} />
      </AbsoluteFill>

      <Sequence from={FLOW_FRAMES.introStart} durationInFrames={FLOW_FRAMES.introEnd}>
        <Audio src={staticFile('voice/flow/intro.mp3')} />
      </Sequence>
      {STAGES.map((s) => (
        <Sequence
          key={s.index}
          from={s.startFrame}
          durationInFrames={s.endFrame - s.startFrame}
        >
          <Audio src={staticFile(s.audio)} />
        </Sequence>
      ))}
      <Sequence
        from={FLOW_FRAMES.outroStart}
        durationInFrames={FLOW_FRAMES.outroEnd - FLOW_FRAMES.outroStart}
      >
        <Audio src={staticFile('voice/flow/outro.mp3')} />
      </Sequence>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: VIEWPORT_W,
          height: WORLD_HEIGHT,
          transform: `translateY(${translateY}px) scale(${cameraScale})`,
          transformOrigin: `${VIEWPORT_W / 2}px ${cameraY}px`,
        }}
      >
        <FlowConnector />
        {STAGES.map((s) => (
          <StageNode
            key={s.index}
            stage={s}
            active={frame >= s.startFrame && frame < s.endFrame}
            visited={frame >= s.startFrame}
          />
        ))}
        {STAGES.map((s) =>
          frame >= s.startFrame - 6 && frame < s.endFrame ? (
            <StageDetail key={s.index} stage={s} />
          ) : null,
        )}
      </div>

      {frame < FLOW_FRAMES.introEnd + 40 ? <Header /> : null}
      <StageBadge frame={frame} />
      <ProgressDots frame={frame} />
      <OutroOverlay />

      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(7, 11, 23, 0.6) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
