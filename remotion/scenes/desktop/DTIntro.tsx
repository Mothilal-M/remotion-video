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
import {DTLiveIndicator, DTSidePanel} from './DTShared';

export const DTIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 8,
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
        src="images/landscape/intro.png"
        zoomFrom={1.04}
        zoomTo={1.12}
        panX={-15}
        panY={0}
        scrim="none"
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(7, 11, 23, 0.85) 0%, rgba(7, 11, 23, 0.45) 38%, rgba(7, 11, 23, 0.0) 62%)',
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill style={{padding: 64, opacity: exit}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <DTLiveIndicator label="AI ASSISTANT · ONLINE" />
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              color: theme.textDim,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            v3.1
          </div>
        </div>
      </AbsoluteFill>

      <DTSidePanel side="left" width={840} glow={theme.glowPurple}>
        <div style={{marginBottom: 28, opacity: titleSpring}}>
          <Waveform bars={28} width={420} height={64} active={titleSpring} />
        </div>
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
            fontSize: 78,
            lineHeight: 1.05,
            fontWeight: 800,
            color: theme.text,
            letterSpacing: -1.5,
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
            AI Interview
            <br />
            Assistant
          </span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: theme.textDim,
            fontWeight: 500,
            letterSpacing: 0.5,
            opacity: subOpacity,
          }}
        >
          Smarter. Faster. Unbiased hiring.
        </div>
      </DTSidePanel>
    </AbsoluteFill>
  );
};
