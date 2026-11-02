import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavigationProps {
  onOpenContact: (service?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#242424] py-3.5'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-black tracking-tight text-[#F6F1E8] hover:text-[#FF5A4F] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F] rounded-sm"
          >
            <span>MAYA.</span>
          </a>

          {/* Simple 3-Link Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wider text-[#A7A29A] uppercase">
            <a
              href="#work"
              className="hover:text-[#F6F1E8] transition-colors py-1 whitespace-nowrap shrink-0"
            >
              Work
            </a>
            <a
              href="#services"
              className="hover:text-[#F6F1E8] transition-colors py-1 whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#about"
              className="hover:text-[#F6F1E8] transition-colors py-1 whitespace-nowrap shrink-0"
            >
              About
            </a>
          </nav>

          {/* Primary Action Button (Coral #FF5A4F) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenContact()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#FF5A4F] hover:bg-[#E0483E] active:scale-[0.98] transition-all rounded-md whitespace-nowrap shrink-0 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]"
            >
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-[#F6F1E8] hover:text-[#FF5A4F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F] rounded-md"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#111111]/95 backdrop-blur-md md:hidden flex flex-col pt-24 px-6 pb-8"
          onClick={closeMenu}
        >
          <div
            className="flex flex-col h-full justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-5 pt-2">
              <span className="text-[#737373] text-xs font-bold tracking-wider uppercase">
                Menu
              </span>
              <a
                href="#work"
                onClick={closeMenu}
                className="text-3xl font-extrabold tracking-tight text-[#F6F1E8] hover:text-[#FF5A4F] transition-colors py-3 border-b border-[#242424]"
              >
                Selected Work
              </a>
              <a
                href="#before-after"
                onClick={closeMenu}
                className="text-3xl font-extrabold tracking-tight text-[#F6F1E8] hover:text-[#FF5A4F] transition-colors py-3 border-b border-[#242424]"
              >
                Raw → Final
              </a>
              <a
                href="#services"
                onClick={closeMenu}
                className="text-3xl font-extrabold tracking-tight text-[#F6F1E8] hover:text-[#FF5A4F] transition-colors py-3 border-b border-[#242424]"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={closeMenu}
                className="text-3xl font-extrabold tracking-tight text-[#F6F1E8] hover:text-[#FF5A4F] transition-colors py-3 border-b border-[#242424]"
              >
                About Maya
              </a>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  closeMenu();
                  onOpenContact();
                }}
                className="w-full min-h-[50px] flex items-center justify-center gap-2 bg-[#FF5A4F] hover:bg-[#E0483E] text-white font-bold text-base rounded-md py-3.5 transition-colors shadow-lg"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-3 text-center text-xs text-[#737373]">
                Short-form video editor for founders, creators &amp; brands
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
