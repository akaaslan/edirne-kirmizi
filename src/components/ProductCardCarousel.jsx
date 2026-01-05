import React, { useState } from 'react';

export default function ProductCardCarousel({ images, alt, isOutOfStock }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return <img src={images[0]} alt={alt} style={isOutOfStock ? {opacity: 0.5} : {}} />;
  }

  const goToNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img 
        src={images[currentIndex]} 
        alt={`${alt} - ${currentIndex + 1}`}
        style={isOutOfStock ? {opacity: 0.5} : {}}
      />
      
      {/* Navigation Arrows - Only show on hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="carousel-nav-btn carousel-prev"
            style={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0,
              transition: 'opacity 0.2s',
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
            aria-label="Önceki resim"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--edirne)" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="carousel-nav-btn carousel-next"
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0,
              transition: 'opacity 0.2s',
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
            aria-label="Sonraki resim"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--edirne)" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6,
          zIndex: 2
        }}>
          {images.map((_, index) => (
            <div
              key={index}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
