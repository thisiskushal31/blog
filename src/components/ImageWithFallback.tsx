// ImageWithFallback.tsx - Renders an image with automatic fallback logic for different environments.
// If the image fails to load, tries alternative paths and finally a placeholder. Used for robust image rendering.
// If rendering fails, an error is logged and a fallback UI is shown.
import { useState } from 'react';
import { BLOG_BASE_PATH } from '../config/config';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ImageWithFallback = ({ src, alt, className = '', loading = 'lazy' }: ImageWithFallbackProps) => {
  // State for the current image source and error tracking
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Handler for image load errors
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Try alternative paths for different environments
      if (src.startsWith(BLOG_BASE_PATH + '/')) {
        // If it's a blog path, try without the BLOG_BASE_PATH prefix (for local dev)
        setImgSrc(src.replace(BLOG_BASE_PATH + '/', '/'));
      } else if (src.startsWith('/')) {
        // If it's a root path, try with BLOG_BASE_PATH prefix (for GitHub Pages)
        setImgSrc(src.replace('/', BLOG_BASE_PATH + '/'));
      }
    } else {
      // Final fallback to placeholder
      setImgSrc('/placeholder.svg');
    }
  };

  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading={loading}
        onError={handleError}
      />
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering ImageWithFallback:", err);
    return (
      <img
        src="/placeholder.svg"
        alt="Image failed to load"
        className={className}
        loading={loading}
      />
    );
  }
};

export default ImageWithFallback; 