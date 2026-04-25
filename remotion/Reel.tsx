import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';
import {theme, SCENE_FRAMES} from './theme';
import {Background} from './components/Background';
import {Hook} from './scenes/Hook';
import {Intro} from './scenes/Intro';
import {Point1, Point2, Point3} from './scenes/Points';
import {Highlight} from './scenes/Highlight';
import {Outro} from './scenes/Outro';

loadFont('normal', {
  weights: ['500', '700', '800', '900'],
  subsets: ['latin'],
});

export const REEL_FPS = 60;
export const REEL_DURATION_IN_FRAMES =
  SCENE_FRAMES.hook +
  SCENE_FRAMES.intro +
  SCENE_FRAMES.point1 +
  SCENE_FRAMES.point2 +
  SCENE_FRAMES.point3 +
  SCENE_FRAMES.highlight +
  SCENE_FRAMES.outro;

export const Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: 'Inter, sans-serif'}}>
      <Background />
      <Series>
        <Series.Sequence durationInFrames={SCENE_FRAMES.hook}>
          <Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.intro}>
          <Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point1}>
          <Point1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point2}>
          <Point2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.point3}>
          <Point3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.highlight}>
          <Highlight />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.outro}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
