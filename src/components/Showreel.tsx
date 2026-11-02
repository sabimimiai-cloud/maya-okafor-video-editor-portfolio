import React from 'react';
import { SHOWREEL_POSTER_IMAGE } from '../data/portfolioData';
import { VIDEO_ASSETS } from '../data/videoAssets';
import { VideoPlayer } from './VideoPlayer';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ShowreelProps {
  onOpenContact?: () => void;
}

export const Showreel: React.FC<ShowreelProps> = ({ onOpenContact }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="showreel" className="pb-20 md:pb-32 bg-[#111111] text-[#F6F1E8]">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-5 sm:px-8 reveal-base ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Simple Label */}
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#A7A29A]">
          <span className="text-[#FF5A4F] font-bold tracking-widest uppercase">
            SHOWREEL
          </span>
          <span className="tracking-wider">9:16 VERTICAL CUT</span>
        </div>

        {/* Large 9:16 Dominant Showreel Video Player with End Card */}
        <div className="max-w-md sm:max-w-lg mx-auto">
          <VideoPlayer
            src={VIDEO_ASSETS.showreel}
            poster={SHOWREEL_POSTER_IMAGE}
            title="MAYA OKAFOR · SHOWREEL"
            aspectRatio="9/16"
            loop={false}
            showEndCard={true}
            onEndCardCta={onOpenContact}
            endCardTitle="MAYA OKAFOR"
            endCardSubtitle="Short-Form Video Editor · Lagos, Nigeria"
          />
        </div>
      </div>
    </section>
  );
};
