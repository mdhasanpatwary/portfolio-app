/**
 * Utility functions for generating blur placeholders for images
 */

// Generate a simple blur data URL for images
export const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  // Create a simple gradient blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e5e7eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

// Generate a dark mode compatible blur data URL
export const generateDarkBlurDataURL = (width: number = 10, height: number = 10): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#4b5563;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6b7280;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#darkGrad)" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

// Generate a colored blur placeholder for profile/avatar images
export const generateProfileBlurDataURL = (width: number = 10, height: number = 10): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="profileGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
          <stop offset="70%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:1" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#profileGrad)" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

// Predefined blur data URLs for common use cases
export const BLUR_DATA_URLS = {
  default: generateBlurDataURL(),
  dark: generateDarkBlurDataURL(),
  profile: generateProfileBlurDataURL(),
  project: generateBlurDataURL(16, 9), // 16:9 aspect ratio for project images
  avatar: generateProfileBlurDataURL(1, 1), // 1:1 aspect ratio for avatars
} as const;
