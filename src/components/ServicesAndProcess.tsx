import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, PROCESS_STEPS } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServicesAndProcessProps {
  onOpenContact: (serviceTitle?: string) => void;
}

export const ServicesAndProcess: React.FC<ServicesAndProcessProps> = ({ onOpenContact }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="services" className="py-24 md:py-36 bg-[#F6F1E8] text-[#111111]">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-5 sm:px-8 reveal-base ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Part 1: SERVICES ("WHAT I EDIT") */}
        <div className="mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#FF5A4F] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5A4F]" />
            <span>SERVICES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] mb-4 uppercase">
            WHAT I EDIT
          </h2>
          <p className="text-lg sm:text-xl text-[#737373] max-w-2xl leading-relaxed mb-12">
            Social-first editing designed to hold attention and make your content work harder.
          </p>

          {/* 4 Clean Minimal Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="bg-[#FFFDF9] rounded-2xl border border-[#E0D9CD] p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                onClick={() => onOpenContact(service.title)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#FF5A4F] uppercase tracking-wider mb-2 block">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-[#111111] tracking-tight uppercase mb-3">
                    {service.title}
                  </h3>
                  <p className="text-base text-[#555555] leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDE7DC] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#737373] uppercase tracking-wider">
                    Inquire
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5A4F] uppercase tracking-wider group-hover:text-[#E0483E]">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: PROCESS (COMPRESSED 4 SIMPLE STEPS) */}
        <div id="process" className="pt-12 border-t border-[#E0D9CD]">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#FF5A4F] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5A4F]" />
            <span>SIMPLE WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-4 uppercase">
            HOW I WORK
          </h2>
          <p className="text-lg text-[#737373] max-w-xl leading-relaxed mb-10">
            Simple process. Clear communication. No need to become a video-editing expert.
          </p>

          {/* 4 Simple Process Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E0D9CD] shadow-sm hover:border-[#FF5A4F]/40 transition-colors"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="text-xs font-mono font-extrabold text-[#FF5A4F] tracking-widest mb-2">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-[#111111] tracking-tight uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-[#555555] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
