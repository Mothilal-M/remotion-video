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
import {Section, SECTIONS} from './data';
import {theme} from '../theme';
import {HeroBackdrop} from '../components/HeroBackdrop';

type Props = {
  section: Section;
  showBackdrop?: boolean;
  scrim?: 'left' | 'right' | 'center' | 'bottom' | 'top';
  children: React.ReactNode;
};

const scrimGradient = (mode: Props['scrim']) => {
  switch (mode) {
    case 'left':
      return 'linear-gradient(90deg, rgba(7, 11, 23, 0.92) 0%, rgba(7, 11, 23, 0.6) 30%, rgba(7, 11, 23, 0.25) 60%, rgba(7, 11, 23, 0.05) 100%)';
    case 'right':
      return 'linear-gradient(270deg, rgba(7, 11, 23, 0.92) 0%, rgba(7, 11, 23, 0.6) 30%, rgba(7, 11, 23, 0.25) 60%, rgba(7, 11, 23, 0.05) 100%)';
    case 'top':
      return 'linear-gradient(180deg, rgba(7, 11, 23, 0.92) 0%, rgba(7, 11, 23, 0.55) 35%, rgba(7, 11, 23, 0.15) 100%)';
    case 'bottom':
      return 'linear-gradient(0deg, rgba(7, 11, 23, 0.92) 0%, rgba(7, 11, 23, 0.55) 35%, rgba(7, 11, 23, 0.15) 100%)';
    case 'center':
    default:
      return 'radial-gradient(ellipse at center, rgba(7, 11, 23, 0.78) 0%, rgba(7, 11, 23, 0.55) 45%, rgba(7, 11, 23, 0.3) 100%)';
  }
};

export const SectionFrame: React.FC<Props> = ({
  section,
  showBackdrop = true,
  scrim = 'center',
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enterOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 1],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const headerSpring = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 110},
  });

  const sectionIdx = SECTIONS.findIndex((s) => s.id === section.id);
  const progress = interpolate(
    frame,
    [0, durationInFrames - 1],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill
      style={{
        opacity: enterOpacity * exitOpacity,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Audio src={staticFile(section.audio)} volume={1} />

      {showBackdrop ? (
        <>
          <HeroBackdrop
            src={section.image}
            zoomFrom={1.05}
            zoomTo={1.18}
            panX={section.imagePan.x}
            panY={section.imagePan.y}
            scrim="none"
            blurExit={false}
          />
          <AbsoluteFill
            style={{background: scrimGradient(scrim), pointerEvents: 'none'}}
          />
          <AbsoluteFill
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 55%, rgba(7, 11, 23, 0.55) 100%)',
              pointerEvents: 'none',
            }}
          />
        </>
      ) : null}

      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            padding: '8px 18px',
            borderRadius: 999,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: `1px solid ${section.accent}55`,
            color: section.accent,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 5,
          }}
        >
          {section.number}
        </div>
        <div
          style={{
            color: theme.text,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            opacity: 0.9,
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
          }}
        >
          {section.title}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 56,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          padding: '8px 14px',
          borderRadius: 999,
          background: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(148, 163, 184, 0.18)',
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        {SECTIONS.map((s, i) => (
          <div
            key={s.id}
            style={{
              width: i === sectionIdx ? 28 : 8,
              height: 6,
              borderRadius: 999,
              background:
                i <= sectionIdx
                  ? i === sectionIdx
                    ? section.accent
                    : 'rgba(148, 163, 184, 0.55)'
                  : 'rgba(148, 163, 184, 0.22)',
              boxShadow: i === sectionIdx ? `0 0 12px ${section.glow}` : 'none',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 56,
          right: 56,
          height: 3,
          background: 'rgba(148, 163, 184, 0.15)',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${section.accent}, #A855F7)`,
            boxShadow: `0 0 12px ${section.glow}`,
          }}
        />
      </div>

      {children}
    </AbsoluteFill>
  );
};
