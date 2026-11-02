import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const CONTENT_TYPES = [
  'Reels / Shorts',
  'Podcast clips',
  'Personal brand content',
  'Product / brand video',
  'Other',
];

const VOLUME_OPTIONS = [
  'Single video test',
  '2–4 videos',
  '5–10 videos / month',
  'Ongoing retainer',
];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [needEdited, setNeedEdited] = useState('');
  const [contentType, setContentType] = useState('Reels / Shorts');
  const [videoCount, setVideoCount] = useState('2–4 videos');
  const [projectNotes, setProjectNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; needEdited?: string }>({});

  useEffect(() => {
    if (preselectedService) {
      const match = CONTENT_TYPES.find((c) =>
        c.toLowerCase().includes(preselectedService.toLowerCase().split(' ')[0])
      );
      if (match) setContentType(match);
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { name?: string; email?: string; needEdited?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please provide your name';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!needEdited.trim() || needEdited.trim().length < 3) {
      errs.needEdited = 'Please briefly describe what you need edited';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate realistic asynchronous network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 650);
  };

  const handleReset = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setName('');
    setEmail('');
    setNeedEdited('');
    setProjectNotes('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      <div
        className="relative w-full max-w-lg bg-[#141414] border border-[#2b2b2b] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#111111] border-b border-[#242424] flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#FF5A4F] uppercase tracking-wider">
              Project Inquiry
            </div>
            <h3 id="inquiry-title" className="text-xl sm:text-2xl font-bold text-[#F6F1E8] tracking-tight">
              Start a Project with Maya
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A29A] mt-1 font-normal">
              Tell me what you’re working on and what you need help bringing to life.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#A7A29A] hover:text-[#F6F1E8] hover:bg-[#242424] rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-[#FF5A4F]/20 text-[#FF5A4F] border border-[#FF5A4F]/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#F6F1E8] tracking-tight mb-2">
                  Inquiry Received, {name}.
                </h4>
                <p className="text-sm sm:text-base text-[#A7A29A] max-w-md mx-auto leading-relaxed">
                  Thank you. I review all video links and project details personally and will reply directly to <strong className="text-[#F6F1E8]">{email}</strong> within 24 hours.
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="text-left bg-[#1a1a1a] border border-[#2b2b2b] rounded-xl p-4 text-xs font-mono space-y-2">
                <div className="text-[#FF5A4F] font-bold uppercase tracking-wider text-[11px] border-b border-[#292929] pb-1">
                  Inquiry Summary
                </div>
                <div className="flex justify-between text-[#A7A29A]">
                  <span>Project Need:</span>
                  <span className="text-white font-sans font-medium">{needEdited}</span>
                </div>
                <div className="flex justify-between text-[#A7A29A]">
                  <span>Content Type:</span>
                  <span className="text-white font-sans font-medium">{contentType}</span>
                </div>
                <div className="flex justify-between text-[#A7A29A]">
                  <span>Volume:</span>
                  <span className="text-white font-sans font-medium">{videoCount}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-8 py-3 bg-[#FF5A4F] hover:bg-[#E0483E] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-lg"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#F6F1E8] mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 bg-[#1e1e1e] border rounded-md text-base text-[#F6F1E8] placeholder-[#666666] focus:outline-none focus:ring-1 ${
                    errors.name
                      ? 'border-[#FF5A4F] focus:border-[#FF5A4F] focus:ring-[#FF5A4F]'
                      : 'border-[#2e2e2e] focus:border-[#FF5A4F] focus:ring-[#FF5A4F]'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-[#FF5A4F] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#F6F1E8] mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="you@email.com"
                  className={`w-full px-4 py-3 bg-[#1e1e1e] border rounded-md text-base text-[#F6F1E8] placeholder-[#666666] focus:outline-none focus:ring-1 ${
                    errors.email
                      ? 'border-[#FF5A4F] focus:border-[#FF5A4F] focus:ring-[#FF5A4F]'
                      : 'border-[#2e2e2e] focus:border-[#FF5A4F] focus:ring-[#FF5A4F]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[#FF5A4F] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* What do you need edited? */}
              <div>
                <label className="block text-sm font-semibold text-[#F6F1E8] mb-1.5">
                  What do you need edited? *
                </label>
                <input
                  type="text"
                  required
                  value={needEdited}
                  onChange={(e) => {
                    setNeedEdited(e.target.value);
                    if (errors.needEdited) setErrors((prev) => ({ ...prev, needEdited: undefined }));
                  }}
                  placeholder="e.g. Founder LinkedIn videos, podcast clips, brand promo"
                  className={`w-full px-4 py-3 bg-[#1e1e1e] border rounded-md text-base text-[#F6F1E8] placeholder-[#666666] focus:outline-none focus:ring-1 ${
                    errors.needEdited
                      ? 'border-[#FF5A4F] focus:border-[#FF5A4F] focus:ring-[#FF5A4F]'
                      : 'border-[#2e2e2e] focus:border-[#FF5A4F] focus:ring-[#FF5A4F]'
                  }`}
                />
                {errors.needEdited && (
                  <p className="mt-1 text-xs text-[#FF5A4F] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.needEdited}</span>
                  </p>
                )}
              </div>

              {/* What type of content? */}
              <div>
                <label className="block text-sm font-semibold text-[#F6F1E8] mb-2">
                  What type of content? *
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  {CONTENT_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setContentType(type)}
                      className={`p-2.5 text-center rounded-md border font-medium transition-colors cursor-pointer min-h-[44px] ${
                        contentType === type
                          ? 'bg-[#FF5A4F] text-white font-bold border-[#FF5A4F]'
                          : 'bg-[#1e1e1e] text-[#A7A29A] border-[#2e2e2e] hover:border-[#444444]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Approximate number of videos */}
              <div>
                <label className="block text-sm font-semibold text-[#F6F1E8] mb-2">
                  Approximate number of videos
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  {VOLUME_OPTIONS.map((vol) => (
                    <button
                      type="button"
                      key={vol}
                      onClick={() => setVideoCount(vol)}
                      className={`p-2.5 text-center rounded-md border font-medium transition-colors cursor-pointer min-h-[44px] ${
                        videoCount === vol
                          ? 'bg-[#FF5A4F] text-white font-bold border-[#FF5A4F]'
                          : 'bg-[#1e1e1e] text-[#A7A29A] border-[#2e2e2e] hover:border-[#444444]'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-sm font-semibold text-[#F6F1E8] mb-1.5">
                  Tell me about the project
                </label>
                <textarea
                  rows={3}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Where are your videos hosted (Drive/Dropbox)? What are your goals or publishing deadlines?"
                  className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#2e2e2e] rounded-md text-base text-[#F6F1E8] placeholder-[#666666] focus:outline-none focus:border-[#FF5A4F] focus:ring-1 focus:ring-[#FF5A4F]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#737373] text-center sm:text-left">
                  Direct reply within 24 hours.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FF5A4F] hover:bg-[#E0483E] disabled:opacity-75 text-white font-bold text-sm uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
