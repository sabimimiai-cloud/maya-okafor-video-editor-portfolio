import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { VideoPlayer } from './VideoPlayer';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="work" className="py-20 md:py-32 bg-[#F6F1E8] text-[#111111]">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-5 sm:px-8 reveal-base ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#FF5A4F] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5A4F]" />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] mb-3 text-balance uppercase">
            SELECTED WORK
          </h2>
          <p className="text-base sm:text-xl text-[#737373] max-w-2xl leading-relaxed">
            Short-form edits engineered for Reels, TikTok and Shorts. Built for retention, rhythm and visual impact.
          </p>
        </div>

        {/* 4 Large Vertical 9:16 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project, idx) => (
            <article
              key={project.id}
              className="bg-[#FFFDF9] rounded-2xl border border-[#E0D9CD] p-5 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              {/* VIDEO FIRST: 9:16 Real Video Player */}
              <div className="mb-6">
                <VideoPlayer
                  src={project.videoUrl}
                  poster={project.image}
                  title={`${project.number} · ${project.title}`}
                  aspectRatio="9/16"
                  loop={true}
                />
              </div>

              {/* Text Information (Visuals dominate, text is concise) */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#FF5A4F] uppercase tracking-wider">
                      {project.number} / {project.category}
                    </span>
                    <span className="text-xs font-mono text-[#737373]">
                      {project.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight uppercase mb-2">
                    {project.title}
                  </h3>

                  <p className="text-base text-[#555555] leading-relaxed mb-6 font-normal">
                    {project.tagline}
                  </p>
                </div>

                {/* Case Study Breakdown CTA */}
                <div className="pt-4 border-t border-[#EDE7DC] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#737373] uppercase tracking-wider">
                    Breakdown
                  </span>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5A4F] hover:text-[#E0483E] transition-colors uppercase tracking-wider cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
