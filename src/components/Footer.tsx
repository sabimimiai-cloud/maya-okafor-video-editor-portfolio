import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer id="contact" className="py-14 md:py-18 bg-[#0a0a0a] border-t border-[#1e1e1e] text-[#737373]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#1c1c1c]">
          {/* Brand & Role */}
          <div className="md:col-span-6">
            <a href="#" className="text-2xl font-black tracking-tight text-[#F6F1E8] mb-2 inline-block">
              MAYA OKAFOR
            </a>
            <p className="text-base text-[#F6F1E8] font-bold mb-2">
              Short-Form Video Editor · Content Storyteller
            </p>
            <p className="text-sm text-[#737373] max-w-sm leading-relaxed">
              I turn your videos into content people actually want to watch. Available for select commissions in Lagos and worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase text-[#F6F1E8] tracking-wider mb-3">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-[#737373]">
              <li>
                <a href="#work" className="hover:text-[#FF5A4F] transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-[#FF5A4F] transition-colors">
                  Raw → Final Cut
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FF5A4F] transition-colors">
                  Services &amp; Process
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FF5A4F] transition-colors">
                  About Maya
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#FF5A4F] transition-colors font-bold text-[#F6F1E8]"
                >
                  Hire Me / Start a Project
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase text-[#F6F1E8] tracking-wider mb-3">
              Direct Contact
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:maya@mayaokafor.video"
                  className="text-[#FF5A4F] hover:underline transition-colors inline-flex items-center gap-1 font-bold text-base"
                >
                  <span>maya@mayaokafor.video</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#737373] hover:text-[#F6F1E8] transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#737373] hover:text-[#F6F1E8] transition-colors inline-flex items-center gap-1"
                >
                  <span>TikTok</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#737373] hover:text-[#F6F1E8] transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Discreet Concept Disclosure in Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555555]">
          <div>
            © {new Date().getFullYear()} Maya Okafor. All rights reserved.
          </div>
          <div>
            Portfolio concept / demonstration project created to showcase editing style and creative direction.
          </div>
        </div>
      </div>
    </footer>
  );
};
