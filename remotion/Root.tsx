import React from 'react';
import {Composition} from 'remotion';
import {Reel, REEL_DURATION_IN_FRAMES, REEL_FPS} from './Reel';
import {RealReel, REAL_REEL_DURATION_IN_FRAMES, REAL_REEL_FPS} from './RealReel';
import {
  DesktopReel,
  DESKTOP_REEL_DURATION_IN_FRAMES,
  DESKTOP_REEL_FPS,
} from './DesktopReel';
import {FlowReel, FLOW_DURATION_IN_FRAMES, FLOW_FPS} from './FlowReel';
import {
  ArchitectureVideo,
  ARCH_DURATION_IN_FRAMES,
  ARCH_FPS,
  archSchema,
  archDefaultProps,
  calculateArchMetadata,
} from './ArchitectureVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={REEL_DURATION_IN_FRAMES}
        fps={REEL_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="RealReel"
        component={RealReel}
        durationInFrames={REAL_REEL_DURATION_IN_FRAMES}
        fps={REAL_REEL_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="DesktopReel"
        component={DesktopReel}
        durationInFrames={DESKTOP_REEL_DURATION_IN_FRAMES}
        fps={DESKTOP_REEL_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="FlowReel"
        component={FlowReel}
        durationInFrames={FLOW_DURATION_IN_FRAMES}
        fps={FLOW_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="ArchitectureVideo"
        component={ArchitectureVideo}
        durationInFrames={ARCH_DURATION_IN_FRAMES}
        fps={ARCH_FPS}
        width={1920}
        height={1080}
        schema={archSchema}
        defaultProps={archDefaultProps}
        calculateMetadata={calculateArchMetadata}
      />
    </>
  );
};
