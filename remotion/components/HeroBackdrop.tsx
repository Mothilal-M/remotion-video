import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Props = {
  src: string;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  panY?: number;
  scrim?: 'bottom' | 'top' | 'center' | 'none';
  scrimStrength?: number;
  tint?: string;
  blurExit?: boolean;
};

export const HeroBackdrop: React.FC<Props> = ({
  src,
  zoomFrom = 1.08,
  zoomTo = 1.22,
  panX = 0,
  panY = 0,
  scrim = 'bottom',
  scrimStrength = 1,
  tint,
  blurExit = true,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;

  const scale = interpolate(t, [0, 1], [zoomFrom, zoomTo]);
  const tx = interpolate(t, [0, 1], [0, panX]);
  const ty = interpolate(t, [0, 1], [0, panY]);

  const enterOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const exitBlur = blurExit
    ? interpolate(
        frame,
        [durationInFrames - 18, durationInFrames - 1],
        [0, 8],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
      )
    : 0;

  const scrimGradient =
    scrim === 'bottom'
      ? `linear-gradient(180deg, rgba(7, 11, 23, ${0.35 * scrimStrength}) 0%, rgba(7, 11, 23, 0.05) 25%, rgba(7, 11, 23, ${0.55 * scrimStrength}) 60%, rgba(7, 11, 23, ${0.92 * scrimStrength}) 100%)`
      : scrim === 'top'
        ? `linear-gradient(0deg, rgba(7, 11, 23, ${0.35 * scrimStrength}) 0%, rgba(7, 11, 23, 0.05) 25%, rgba(7, 11, 23, ${0.92 * scrimStrength}) 100%)`
        : scrim === 'center'
          ? `radial-gradient(ellipse at center, rgba(7, 11, 23, 0.0) 30%, rgba(7, 11, 23, ${0.85 * scrimStrength}) 100%)`
          : 'transparent';

  return (
    <AbsoluteFill
      style={{
        opacity: enterOpacity * exitOpacity,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
          filter: `blur(${exitBlur}px)`,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </AbsoluteFill>
      {tint ? (
        <AbsoluteFill style={{background: tint, mixBlendMode: 'color', opacity: 0.35}} />
      ) : null}
      <AbsoluteFill
        style={{
          background: scrimGradient,
          pointerEvents: 'none',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(7, 11, 23, 0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
