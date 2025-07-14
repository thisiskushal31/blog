import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ImageWithFallback = ({ src, alt, className = '', loading = 'lazy' }: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Try alternative paths for different environments
      if (src.startsWith('/blog/')) {
        // If it's a blog path, try without the /blog prefix (for local dev)
        setImgSrc(src.replace('/blog/', '/'));
      } else if (src.startsWith('/')) {
        // If it's a root path, try with /blog prefix (for GitHub Pages)
        setImgSrc(src.replace('/', '/blog/'));
      }
    } else {
      // Final fallback to placeholder
      setImgSrc('/placeholder.svg');
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
};

export default ImageWithFallback; 