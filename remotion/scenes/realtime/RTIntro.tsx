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
import {Waveform} from '../../components/Waveform';
import {BottomGlassPanel, LiveIndicator} from './RTShared';

export const RTIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 6,
    fps,
    config: {damping: 18, stiffness: 110, mass: 0.9},
  });

  const subOpacity = interpolate(frame, [40, 70], [0, 1], {
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
      <Audio src={staticFile('voice/intro.mp3')} volume={1} />
      <HeroBackdrop
        src="images/intro.png"
        zoomFrom={1.06}
        zoomTo={1.16}
        panX={20}
        panY={-10}
        scrim="bottom"
      />

      <AbsoluteFill style={{padding: 70, opacity: exit}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <LiveIndicator label="AI ASSISTANT · ONLINE" />
          <div
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              color: theme.textDim,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            v3.1
          </div>
        </div>
      </AbsoluteFill>

      <BottomGlassPanel glow={theme.glowPurple}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
            opacity: titleSpring,
          }}
        >
          <Waveform bars={28} width={420} height={70} active={titleSpring} />
        </div>
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
            fontSize: 70,
            lineHeight: 1.05,
            fontWeight: 800,
            color: theme.text,
            letterSpacing: -1.2,
          }}
        >
          Meet the{' '}
          <span
            style={{
              background: `linear-gradient(135deg, #818CF8 0%, #A855F7 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI Interview Assistant
          </span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 30,
            color: theme.textDim,
            fontWeight: 500,
            letterSpacing: 0.5,
            opacity: subOpacity,
          }}
        >
          Smarter. Faster. Unbiased hiring.
        </div>
      </BottomGlassPanel>
    </AbsoluteFill>
  );
};
