import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ABOUT_MAYA_IMAGE } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutAndCTAProps {
  onOpenContact: () => void;
}

export const AboutAndCTA: React.FC<AboutAndCTAProps> = ({ onOpenContact }) => {
  const { ref: revealRef, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="about" className="py-24 md:py-36 bg-[#111111] text-[#F6F1E8] border-t border-[#222222]">
      <div
        ref={revealRef}
        className={`max-w-7xl mx-auto px-5 sm:px-8 reveal-base ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Part 1: HUMAN ABOUT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28 md:mb-36">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-[#262626] shadow-2xl group">
              <img
                src={ABOUT_MAYA_IMAGE}
                alt="Maya Okafor - Video Editor in Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <div className="text-xs font-bold text-[#FF5A4F] uppercase tracking-wider mb-0.5">
                  Maya Okafor
                </div>
                <div className="text-[#F6F1E8] text-base font-bold tracking-tight">
                  Short-Form Video Editor
                </div>
                <div className="text-xs text-[#A7A29A]">
                  Lagos, Nigeria · Available Worldwide
                </div>
              </div>
            </div>
          </div>

          {/* About Copy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#FF5A4F] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF5A4F]" />
              <span>ABOUT MAYA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F6F1E8] mb-6 uppercase">
              “GOOD EDITING SHOULD FEEL INVISIBLE.”
            </h2>

            <div className="space-y-4 text-lg sm:text-xl text-[#A7A29A] leading-relaxed mb-8 font-normal">
              <p>
                I’m a video editor who believes good editing should make people stop scrolling, stay curious and keep watching.
              </p>
              <p>
                I work with creators, founders and brands to turn their videos into content that feels intentional, clear and worth watching.
              </p>
              <p className="text-base text-[#F6F1E8] font-medium pt-2">
                Based in Lagos, working with ambitious clients worldwide.
              </p>
            </div>

            <div>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF5A4F] hover:bg-[#E0483E] active:scale-[0.98] text-white font-bold text-sm uppercase tracking-wider rounded-md transition-all duration-200 shadow-lg cursor-pointer"
              >
                <span>Hire Maya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Part 2: CONVERSION-FOCUSED FINAL CTA */}
        <div className="pt-16 border-t border-[#242424] text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#FF5A4F] uppercase mb-4">
            <span>READY WHEN YOU ARE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F6F1E8] mb-6 uppercase text-balance">
            GOT VIDEOS THAT NEED EDITING?
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl text-[#A7A29A] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Let’s turn them into content people actually want to watch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto min-h-[54px] px-10 py-4 bg-[#FF5A4F] hover:bg-[#E0483E] active:scale-[0.98] text-white font-black text-base uppercase tracking-wider rounded-md transition-all duration-200 flex items-center justify-center gap-2 group shadow-2xl cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#showreel"
              className="w-full sm:w-auto min-h-[54px] px-8 py-4 border-2 border-[#333333] hover:border-[#F6F1E8] active:scale-[0.98] text-[#F6F1E8] font-bold text-base uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Watch My Work</span>
            </a>
          </div>

          <div className="mt-12 text-sm text-[#737373]">
            Direct email: <a href="mailto:maya@mayaokafor.video" className="text-[#F6F1E8] hover:text-[#FF5A4F] underline">maya@mayaokafor.video</a>
          </div>
        </div>
      </div>
    </section>
  );
};
