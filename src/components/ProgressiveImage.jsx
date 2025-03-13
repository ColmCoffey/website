import React, { useState, useEffect } from 'react';

const ProgressiveImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 9"><rect width="100%" height="100%" fill="#f1f5f9"/></svg>');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <img 
      src={currentSrc} 
      alt={alt} 
      className={`transition-opacity duration-300 ${className} ${isLoaded ? 'opacity-100' : 'opacity-60'}`}
    />
  );
};

export default ProgressiveImage; 