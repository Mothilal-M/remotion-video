import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';
import {theme, SCENE_FRAMES} from './theme';
import {Particles} from './components/Particles';
import {RTHook} from './scenes/realtime/RTHook';
import {RTIntro} from './scenes/realtime/RTIntro';
import {RTPoint1, RTPoint2, RTPoint3} from './scenes/realtime/RTPoint';
import {RTHighlight} from './scenes/realtime/RTHighlight';
import {RTOutro} from './scenes/realtime/RTOutro';

loadFont('normal', {
  weights: ['500', '700', '800', '900'],
  subsets: ['latin'],
});

export const REAL_REEL_FPS = 60;
export const REAL_REEL_DURATION_IN_FRAMES =
  SCENE_FRAMES.hook +
  SCENE_FRAMES.intro +
  SCENE_FRAMES.point1 +
  SCENE_FRAMES.point2 +
  SCENE_FRAMES.point3 +
  SCENE_FRAMES.highlight +
  SCENE_FRAMES.outro;

export const RealReel: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: 'Inter, sans-serif'}}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_FRAMES.hook}>
          <RTHook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.intro}>
          <RTIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point1}>
          <RTPoint1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point2}>
          <RTPoint2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point3}>
          <RTPoint3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.highlight}>
          <RTHighlight />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.outro}>
          <RTOutro />
        </Series.Sequence>
      </Series>
      <AbsoluteFill style={{pointerEvents: 'none', opacity: 0.55}}>
        <Particles count={35} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
