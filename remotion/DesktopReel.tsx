import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';
import {theme, SCENE_FRAMES} from './theme';
import {Particles} from './components/Particles';
import {DTHook} from './scenes/desktop/DTHook';
import {DTIntro} from './scenes/desktop/DTIntro';
import {DTPoint1, DTPoint2, DTPoint3} from './scenes/desktop/DTPoint';
import {DTHighlight} from './scenes/desktop/DTHighlight';
import {DTOutro} from './scenes/desktop/DTOutro';

loadFont('normal', {
  weights: ['500', '700', '800', '900'],
  subsets: ['latin'],
});

export const DESKTOP_REEL_FPS = 60;
export const DESKTOP_REEL_DURATION_IN_FRAMES =
  SCENE_FRAMES.hook +
  SCENE_FRAMES.intro +
  SCENE_FRAMES.point1 +
  SCENE_FRAMES.point2 +
  SCENE_FRAMES.point3 +
  SCENE_FRAMES.highlight +
  SCENE_FRAMES.outro;

export const DesktopReel: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: 'Inter, sans-serif'}}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_FRAMES.hook}>
          <DTHook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.intro}>
          <DTIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point1}>
          <DTPoint1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point2}>
          <DTPoint2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point3}>
          <DTPoint3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.highlight}>
          <DTHighlight />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.outro}>
          <DTOutro />
        </Series.Sequence>
      </Series>
      <AbsoluteFill style={{pointerEvents: 'none', opacity: 0.45}}>
        <Particles count={30} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
