import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BEFORE_RAW_IMAGE, AFTER_FINAL_IMAGE } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: revealRef, isVisible } = useScrollReveal<HTMLDivElement>(0.15);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    setHasInteracted(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    setHasInteracted(true);
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setHasInteracted(true);
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setHasInteracted(true);
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  const setPreset = (pos: number) => {
    setHasInteracted(true);
    setSliderPosition(pos);
  };

  return (
    <section id="before-after" className="py-24 md:py-36 bg-[#111111] text-[#F6F1E8]">
      <div
        ref={revealRef}
        className={`max-w-7xl mx-auto px-5 sm:px-8 reveal-base ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#FF5A4F] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5A4F]" />
            <span>THE TRANSFORMATION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F6F1E8] mb-4 text-balance uppercase">
            RAW → FINAL
          </h2>
          <p className="text-lg sm:text-2xl text-[#A7A29A] max-w-2xl leading-relaxed font-normal">
            “I don’t just cut videos. I transform them.”
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm">
            <span className="text-[#A7A29A] text-xs sm:text-sm">
              Drag divider horizontally to inspect color grade, framing and kinetic subtitles:
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreset(15)}
                className={`px-3.5 py-1.5 rounded-md font-bold text-xs uppercase transition-colors cursor-pointer min-h-[36px] ${
                  sliderPosition <= 25
                    ? 'bg-[#FF5A4F] text-white'
                    : 'bg-[#1e1e1e] text-[#A7A29A] hover:text-[#F6F1E8] border border-[#2e2e2e]'
                }`}
              >
                Raw (15%)
              </button>
              <button
                onClick={() => setPreset(50)}
                className={`px-3.5 py-1.5 rounded-md font-bold text-xs uppercase transition-colors cursor-pointer min-h-[36px] ${
                  sliderPosition > 25 && sliderPosition < 75
                    ? 'bg-[#FF5A4F] text-white'
                    : 'bg-[#1e1e1e] text-[#A7A29A] hover:text-[#F6F1E8] border border-[#2e2e2e]'
                }`}
              >
                Split (50%)
              </button>
              <button
                onClick={() => setPreset(85)}
                className={`px-3.5 py-1.5 rounded-md font-bold text-xs uppercase transition-colors cursor-pointer min-h-[36px] ${
                  sliderPosition >= 75
                    ? 'bg-[#FF5A4F] text-white'
                    : 'bg-[#1e1e1e] text-[#A7A29A] hover:text-[#F6F1E8] border border-[#2e2e2e]'
                }`}
              >
                Final (85%)
              </button>
            </div>
          </div>

          {/* Main Visual Drag Frame */}
          <div
            ref={containerRef}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#292929] bg-black select-none touch-none shadow-2xl cursor-ew-resize group"
            onMouseDown={() => {
              setIsDragging(true);
              setHasInteracted(true);
            }}
            onTouchStart={() => {
              setIsDragging(true);
              setHasInteracted(true);
            }}
            onClick={(e) => handleMove(e.clientX)}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            aria-label="Before and after comparison slider"
          >
            {/* Background Image: RIGHT (FINAL) */}
            <img
              src={AFTER_FINAL_IMAGE}
              alt="Final Edit with rich grade, framing, and clean kinetic subtitles"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Final Tag */}
            <div className="absolute top-4 right-4 z-10 px-4 py-1.5 rounded-md bg-black/85 backdrop-blur-md border border-[#333333] text-xs font-bold text-[#FF5A4F] uppercase tracking-wider">
              FINAL
            </div>

            {/* Clipped Container: LEFT (RAW) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={BEFORE_RAW_IMAGE}
                alt="Raw Recording before edit"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{
                  width: containerWidth ? `${containerWidth}px` : '100%',
                  height: '100%'
                }}
              />
              {/* Raw Tag */}
              <div className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-md bg-black/85 backdrop-blur-md border border-[#333333] text-xs font-bold text-[#F6F1E8] uppercase tracking-wider">
                RAW
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_14px_rgba(255,255,255,0.85)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Center Drag Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-2xl border border-zinc-300">
                <div className="flex items-center -space-x-1">
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Initial Interaction Hint (Fades when user interacts) */}
              {!hasInteracted && (
                <div className="absolute top-1/2 -translate-y-16 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-black/90 backdrop-blur-md border border-white/30 text-[11px] font-mono font-bold text-white uppercase tracking-wider rounded-full shadow-2xl animate-pulse pointer-events-none">
                  ← DRAG TO COMPARE →
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
