import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.05);

  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 bg-[#111111] text-[#F6F1E8]">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-5 sm:px-8 text-center sm:text-left reveal-base ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Small Label */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#FF5A4F] uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-[#FF5A4F]" />
          <span>VIDEO EDITOR / CONTENT STORYTELLER</span>
        </div>

        {/* Main Headline - Large, powerful, multi-line */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black tracking-tight text-[#F6F1E8] leading-[1.05] mb-6 uppercase text-balance">
          I EDIT VIDEOS PEOPLE STOP SCROLLING FOR.
        </h1>

        {/* Short Supporting Sentence */}
        <p className="text-lg sm:text-2xl text-[#A7A29A] leading-relaxed max-w-3xl mb-10 font-normal">
          Short-form edits for creators, founders and brands who want people to stop, watch and keep watching.
        </p>

        {/* Two Clear CTAs */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <a
            href="#showreel"
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 bg-[#FF5A4F] hover:bg-[#E0483E] active:scale-[0.98] text-white font-bold text-sm sm:text-base tracking-wider uppercase rounded-md transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Watch My Work</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 border-2 border-[#333333] hover:border-[#F6F1E8] active:scale-[0.98] text-[#F6F1E8] font-bold text-sm sm:text-base tracking-wider uppercase rounded-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
