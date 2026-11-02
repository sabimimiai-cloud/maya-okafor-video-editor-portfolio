import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Project } from '../types/portfolio';
import { VideoPlayer } from './VideoPlayer';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#141414] border border-[#2b2b2b] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#111111] border-b border-[#242424] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#FF5A4F] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-[#333333]">/</span>
            <span className="text-xs font-mono text-[#A7A29A]">
              PROJECT {project.number}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectProject(prevProject)}
              className="p-2 text-[#A7A29A] hover:text-[#F6F1E8] hover:bg-[#242424] rounded-md transition-colors"
              aria-label="Previous Project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectProject(nextProject)}
              className="p-2 text-[#A7A29A] hover:text-[#F6F1E8] hover:bg-[#242424] rounded-md transition-colors"
              aria-label="Next Project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-[#292929] mx-1" />
            <button
              onClick={onClose}
              className="p-2 text-[#A7A29A] hover:text-[#F6F1E8] hover:bg-[#242424] rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[84vh] overflow-y-auto">
          {/* Title & Tagline */}
          <div className="mb-6">
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-black text-[#F6F1E8] tracking-tight mb-2 uppercase">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#A7A29A] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Large Vertical Video Preview (Dominant visual) */}
          <div className="mb-8 flex justify-center">
            <VideoPlayer
              src={project.videoUrl}
              poster={project.image}
              title={`${project.number} · ${project.title}`}
              aspectRatio="9/16"
              className="max-w-xs sm:max-w-sm"
            />
          </div>

          {/* 3 Concise Case Study Points */}
          <div className="space-y-4">
            {/* The Challenge */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#1c1c1c] border border-[#262626]">
              <div className="text-xs font-bold text-[#FF5A4F] uppercase tracking-wider mb-1.5">
                THE CHALLENGE
              </div>
              <p className="text-sm sm:text-base text-[#F6F1E8] leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            {/* The Edit */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#1c1c1c] border border-[#262626]">
              <div className="text-xs font-bold text-[#FF5A4F] uppercase tracking-wider mb-1.5">
                THE EDIT
              </div>
              <p className="text-sm sm:text-base text-[#F6F1E8] leading-relaxed">
                {project.caseStudy.theEdit}
              </p>
            </div>

            {/* Why It Works */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#212121] border border-[#333333]">
              <div className="text-xs font-bold text-[#FF5A4F] uppercase tracking-wider mb-1.5">
                WHY IT WORKS
              </div>
              <p className="text-sm sm:text-base text-[#F6F1E8] font-medium leading-relaxed">
                {project.caseStudy.whyItWorks}
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-8 pt-5 border-t border-[#242424] flex items-center justify-between">
            <span className="text-xs text-[#737373]">
              Maya Okafor · Short-form retention edit
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#262626] hover:bg-[#333333] text-[#F6F1E8] text-sm font-semibold rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
