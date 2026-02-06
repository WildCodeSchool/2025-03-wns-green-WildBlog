import { useState } from 'react';

interface UseImageOptions {
  fallbackSrc?: string;
  placeholder?: string;
}

export const useImage = (src: string | undefined, options: UseImageOptions = {}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!!src);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    if (options.fallbackSrc) {
      setImageSrc(options.fallbackSrc);
    } else {
      setImageSrc(undefined);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const getImageProps = () => ({
    src: imageSrc,
    onError: handleError,
    onLoad: handleLoad,
    style: { display: hasError && !options.fallbackSrc ? 'none' : 'block' }
  });

  return {
    imageSrc,
    hasError,
    isLoading,
    getImageProps
  };
};