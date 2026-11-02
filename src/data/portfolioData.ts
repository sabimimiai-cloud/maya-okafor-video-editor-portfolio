import { Project, ServiceItem, ProcessStep } from '../types/portfolio';
import { VIDEO_ASSETS } from './videoAssets';

export const SHOWREEL_POSTER_IMAGE = '/posters/showreel-poster.jpg';
export const ABOUT_MAYA_IMAGE = '/images/maya_okafor_creator_portrait_1792873988776.jpg';
export const BEFORE_RAW_IMAGE = '/images/lagos_founder_raw_camera_1792876107356.jpg';
export const AFTER_FINAL_IMAGE = '/images/reel_lagos_founder_1792875124040.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'lagos-founder',
    number: '01',
    title: 'LAGOS FOUNDER',
    category: 'FOUNDER CONTENT',
    tagline: 'Talking-head edit — hook, captions, punch-ins & B-roll.',
    description: 'Raw webcam and phone video of a Nigerian tech founder restructured into a fast-paced, high-credibility LinkedIn and Reels video.',
    duration: '0:48',
    image: '/posters/lagos-founder-poster.jpg',
    videoUrl: VIDEO_ASSETS.lagosFounder,
    caseStudy: {
      challenge: 'The original 20-minute recording had valuable business insights, but opened with 40 seconds of rambling preamble and long dead pauses that caused instant drop-off.',
      theEdit: 'Moved the strongest thesis statement directly into the opening second. Cut out 38 filler pauses, introduced 1.15x punch-ins for emphasis, added dynamic subtitles, and integrated B-roll overlays to maintain momentum.',
      whyItWorks: 'The viewer gets to the core insight immediately without losing the founder’s authentic personality, keeping retention high from the first frame.'
    }
  },
  {
    id: 'food-brand',
    number: '02',
    title: 'FOOD BRAND',
    category: 'FOOD / PRODUCT',
    tagline: 'Sensory food storytelling with fast cuts and rhythmic sound design.',
    description: 'A social-first promo for a Lagos food brand showcasing party jollof rice and smoked suya with sensory ASMR sound design.',
    duration: '0:34',
    image: '/posters/food-brand-poster.jpg',
    videoUrl: VIDEO_ASSETS.foodBrand,
    caseStudy: {
      challenge: 'Raw kitchen recordings were chaotic, un-graded, and felt like unedited phone video rather than an appetizing brand campaign.',
      theEdit: 'Built a rapid, rhythmic cut synced to the sizzle of the grill and spoon plating. Applied rich warm color grading that accentuates steam and textures, paired with bold title overlays.',
      whyItWorks: 'Fast macro cuts and crisp sound effects create an immediate sensory reaction that stops viewers mid-scroll.'
    }
  },
  {
    id: 'podcast-clip',
    number: '03',
    title: 'PODCAST',
    category: 'PODCAST / INTERVIEW',
    tagline: 'Dynamic multi-cam clip mining a conversation for its fiery climax.',
    description: 'Mining a 90-minute Lagos creative podcast for a fiery debate moment, edited with dynamic multi-cam switches and highlighted captions.',
    duration: '0:52',
    image: '/posters/podcast-poster.jpg',
    videoUrl: VIDEO_ASSETS.podcast,
    caseStudy: {
      challenge: 'The full podcast episode had great energy, but wide studio shots felt static on mobile feeds and the initial setup took too long to get to the clash.',
      theEdit: 'Started right at the climax of the disagreement. Tightened the back-and-forth dialogue, cut to the host’s reaction face before they spoke, and added clean word-highlight subtitles.',
      whyItWorks: 'Reaction cuts and rapid dialogue handoffs build psychological tension, driving viewers to click through to the full episode.'
    }
  },
  {
    id: 'fashion-beauty',
    number: '04',
    title: 'FASHION / BEAUTY',
    category: 'BEAUTY / LIFESTYLE',
    tagline: 'Cinematic product pacing and color styling for a luxury drop.',
    description: 'Social video campaign for a Nigerian botanical skincare brand, using rhythmic speed ramps, golden hour lighting, and sleek typography.',
    duration: '0:38',
    image: '/posters/fashion-beauty-poster.jpg',
    videoUrl: VIDEO_ASSETS.fashionBeauty,
    caseStudy: {
      challenge: 'Video was shot in flat camera profiles without music or cohesive pacing, looking dull on mobile screens.',
      theEdit: 'Color graded for radiant golden skin tones, synced macro product drops to a rhythmic beat, and used restrained speed ramps to make liquid textures pop.',
      whyItWorks: 'The edit feels editorial and luxurious—native to Instagram Reels without looking like a boring corporate commercial.'
    }
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'short-form',
    title: 'SHORT-FORM VIDEO',
    description: 'Reels, TikToks and Shorts designed to hold attention.'
  },
  {
    id: 'personal-brand',
    title: 'PERSONAL BRAND CONTENT',
    description: 'Turn talking-head videos into clear, engaging content.'
  },
  {
    id: 'podcast-clips',
    title: 'PODCAST CLIPS',
    description: 'Turn longer conversations into strong short-form moments.'
  },
  {
    id: 'brand-content',
    title: 'BRAND & PRODUCT CONTENT',
    description: 'Social-first edits for products, businesses and campaigns.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'SEND',
    description: 'Send your videos and brief.'
  },
  {
    step: '02',
    title: 'EDIT',
    description: 'I shape the videos into engaging content.'
  },
  {
    step: '03',
    title: 'REVIEW',
    description: 'You review the first cut and request adjustments.'
  },
  {
    step: '04',
    title: 'READY',
    description: 'You receive the final export ready to post.'
  }
];
