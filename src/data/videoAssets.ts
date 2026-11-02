/**
 * Centralized Video Asset Architecture
 * 
 * Replace or link real MP4/WebM video files here.
 * Files located in /public/videos/ are served directly at /videos/<filename>.mp4
 */

export interface VideoAssetMap {
  showreel: string;
  lagosFounder: string;
  foodBrand: string;
  podcast: string;
  fashionBeauty: string;
  rawFounder: string;
  finalFounder: string;
}

export const VIDEO_ASSETS: VideoAssetMap = {
  // Showreel vertical cut
  showreel: '/videos/showreel.mp4',

  // Four Core Showcase Projects
  lagosFounder: '/videos/lagos-founder.mp4',
  foodBrand: '/videos/food-brand.mp4',
  podcast: '/videos/podcast.mp4',
  fashionBeauty: '/videos/fashion-beauty.mp4',

  // Raw vs Final Edit Transformation Assets
  rawFounder: '/videos/raw-founder.mp4',
  finalFounder: '/videos/final-founder.mp4',
};
