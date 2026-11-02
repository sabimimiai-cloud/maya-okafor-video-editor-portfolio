import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Upload, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';

interface VideoPlayerProps {
  src?: string;
  poster: string;
  aspectRatio?: '9/16' | '16/9' | '4/5';
  title?: string;
  className?: string;
  autoPlayMuted?: boolean;
  loop?: boolean;
  showEndCard?: boolean;
  onEndCardCta?: () => void;
  endCardTitle?: string;
  endCardSubtitle?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  aspectRatio = '9/16',
  title,
  className = '',
  autoPlayMuted = false,
  loop = true,
  showEndCard = false,
  onEndCardCta,
  endCardTitle = 'MAYA OKAFOR',
  endCardSubtitle = 'Short-Form Video Editor · Lagos, Nigeria',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeSrc, setActiveSrc] = useState<string | undefined>(src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [userUploaded, setUserUploaded] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(false);

  useEffect(() => {
    setActiveSrc(src);
    setVideoError(false);
    setProgress(0);
    setCurrentTime('0:00');
    setIsPlaying(false);
    setHasStarted(false);
    setHasEnded(false);
  }, [src]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSrc) return;

    const handleTimeUpdate = () => {
      if (video.duration && !isNaN(video.duration)) {
        const prog = (video.currentTime / video.duration) * 100;
        setProgress(prog);
        setCurrentTime(formatTime(video.currentTime));

        // If loop is false and we reached near the end, trigger ended
        if (!loop && video.currentTime >= video.duration - 0.25) {
          handleEnded();
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(formatTime(video.duration));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (showEndCard) {
        setHasEnded(true);
      } else {
        setProgress(0);
        setCurrentTime('0:00');
      }
    };

    const handleError = () => {
      setVideoError(true);
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasStarted(true);
      setHasEnded(false);
      // Show sound hint for 3 seconds if playing muted
      if (video.muted) {
        setShowSoundHint(true);
        setTimeout(() => setShowSoundHint(false), 3500);
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    if (autoPlayMuted) {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {
        // Autoplay policy prevented playback, keep paused
      });
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [activeSrc, autoPlayMuted, loop, showEndCard]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !activeSrc || videoError) return;

    if (hasEnded) {
      video.currentTime = 0;
      setHasEnded(false);
      video.play().catch(() => setIsPlaying(false));
      return;
    }

    if (video.paused) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [activeSrc, videoError, hasEnded]);

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    setShowSoundHint(false);
  };

  const handleReplay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setHasEnded(false);
    setProgress(0);
    video.play().catch(() => {});
  };

  const handleSeekInternal = (clientX: number, target: HTMLDivElement) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = target.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newProgress);
    video.currentTime = (newProgress / 100) * video.duration;
    if (hasEnded) setHasEnded(false);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleSeekInternal(e.clientX, e.currentTarget);
  };

  const handleTouchSeek = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.touches.length > 0) {
      handleSeekInternal(e.touches[0].clientX, e.currentTarget);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      container.requestFullscreen().catch(() => {});
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setActiveSrc(url);
      setUserUploaded(true);
      setVideoError(false);
      setHasEnded(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const video = videoRef.current;
    if (!video) return;

    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'm') {
      e.preventDefault();
      toggleMute();
    } else if (e.key === 'f') {
      e.preventDefault();
      const container = containerRef.current;
      if (container) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          container.requestFullscreen().catch(() => {});
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
    }
  };

  const aspectClass =
    aspectRatio === '9/16'
      ? 'aspect-[9/16]'
      : aspectRatio === '4/5'
      ? 'aspect-[4/5]'
      : 'aspect-[16/9]';

  const hasPlayableVideo = Boolean(activeSrc && !videoError);

  return (
    <div
      ref={containerRef}
      className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden bg-black select-none group border border-[#2b2b2b] shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5A4F] ${className}`}
      onClick={hasPlayableVideo && !hasEnded ? togglePlay : undefined}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={title || 'Video Player'}
    >
      {/* Real HTML5 Video element */}
      {hasPlayableVideo ? (
        <video
          ref={videoRef}
          src={activeSrc}
          poster={poster}
          playsInline
          muted={isMuted}
          loop={loop}
          preload="metadata"
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={poster}
          alt={title || 'Video preview poster'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      )}

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

      {/* Play / Pause Center Trigger (Shown when video is paused or before start) */}
      {hasPlayableVideo && !hasEnded && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 pointer-events-none ${
            isPlaying && hasStarted ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 hover:bg-[#FF5A4F] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-2xl pointer-events-auto cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
            ) : (
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            )}
          </button>
        </div>
      )}

      {/* SHOWREEL END CARD OVERLAY */}
      {hasPlayableVideo && hasEnded && showEndCard && (
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md z-30 flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Label */}
          <div className="flex items-center justify-between text-xs font-mono text-[#A7A29A]">
            <span className="text-[#FF5A4F] font-bold tracking-widest uppercase">
              SHOWREEL COMPLETE
            </span>
            <span className="tracking-wider">LAGOS, NG</span>
          </div>

          {/* Central Pitch & Identity */}
          <div className="text-center my-auto px-2 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono tracking-wider mb-1">
              {endCardTitle}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#F6F1E8] tracking-tight uppercase leading-snug">
              GOT VIDEOS THAT NEED EDITING?
            </h3>
            <p className="text-sm sm:text-base text-[#A7A29A] max-w-sm mx-auto leading-relaxed">
              Let’s turn your raw footage into content people actually want to watch.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onEndCardCta && (
                <button
                  onClick={() => onEndCardCta()}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#FF5A4F] hover:bg-[#E0483E] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={handleReplay}
                className="w-full sm:w-auto px-5 py-3.5 bg-[#1f1f1f] hover:bg-[#2b2b2b] text-[#F6F1E8] font-bold text-xs uppercase tracking-wider rounded-md border border-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Showreel</span>
              </button>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="text-center text-xs font-mono text-[#737373]">
            {endCardSubtitle}
          </div>
        </div>
      )}

      {/* Sound Hint Pill (Fades after play if muted) */}
      {hasPlayableVideo && isPlaying && isMuted && showSoundHint && (
        <button
          onClick={toggleMute}
          className="absolute top-14 right-4 z-20 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-xs font-mono text-white flex items-center gap-2 animate-bounce cursor-pointer shadow-lg"
          aria-label="Video is muted, click to enable sound"
        >
          <VolumeX className="w-3.5 h-3.5 text-[#FF5A4F]" />
          <span>Sound Off · Tap to Unmute</span>
        </button>
      )}

      {/* Honest Non-Playable State Fallback */}
      {!hasPlayableVideo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-[#F6F1E8] mb-3 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-[#FF5A4F]" />
            <span>PREVIEW FRAME · READY FOR MP4</span>
          </div>

          <p className="text-xs text-[#A7A29A] max-w-xs mb-4">
            Link any 9:16 vertical video asset in <code className="text-[#FF5A4F]">videoAssets.ts</code> or test with a local file.
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-4 py-2 bg-[#FF5A4F] hover:bg-[#E0483E] text-white font-bold text-xs uppercase tracking-wider rounded-md pointer-events-auto cursor-pointer transition-colors flex items-center gap-1.5 shadow-lg"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Load Local MP4</span>
          </button>
        </div>
      )}

      {/* Hidden file input for testing local video uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Top Details */}
      {title && !hasEnded && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-xs font-mono z-10">
          <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded text-white border border-white/10 font-bold truncate max-w-[70%]">
            {title}
          </span>
          <span className="px-2.5 py-1 bg-[#FF5A4F] text-white font-bold rounded">
            {userUploaded ? 'LOCAL' : '9:16'}
          </span>
        </div>
      )}

      {/* Bottom Video Controls Bar */}
      {hasPlayableVideo && !hasEnded && (
        <div
          className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 pointer-events-auto z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scrubber bar */}
          <div
            className="w-full bg-white/20 hover:bg-white/30 h-2.5 rounded-full overflow-hidden cursor-pointer transition-all touch-none"
            onClick={handleSeek}
            onTouchStart={handleTouchSeek}
            onTouchMove={handleTouchSeek}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Video scrubber"
            tabIndex={0}
          >
            <div
              className="bg-[#FF5A4F] h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Timers & Utility buttons */}
          <div className="flex items-center justify-between text-xs font-mono text-[#F6F1E8]">
            <div className="flex items-center gap-2">
              <span>{currentTime}</span>
              <span className="text-[#737373]">/</span>
              <span className="text-[#A7A29A]">{duration}</span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Load local MP4 button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="p-1.5 rounded-full bg-black/60 hover:bg-[#2e2e2e] text-[#A7A29A] hover:text-white transition-colors"
                title="Load another MP4"
                aria-label="Load another video"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>

              {/* Audio Mute/Unmute */}
              <button
                onClick={(e) => toggleMute(e)}
                className="p-1.5 rounded-full bg-black/60 hover:bg-[#FF5A4F] text-white transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-full bg-black/60 hover:bg-[#FF5A4F] text-white transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
