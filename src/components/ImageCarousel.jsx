import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageCarousel({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return <img src={images[0]} alt={alt} style={{ width: '100%', borderRadius: 16 }} />;
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Main Image Container */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        aspectRatio: '1/1',
        overflow: 'hidden',
        borderRadius: 16,
        boxShadow: '0 12px 40px rgba(156, 30, 36, 0.12)',
        border: '1px solid rgba(156, 30, 36, 0.08)',
        background: '#f5f5f5'
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s',
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              aria-label="Önceki resim"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--edirne)" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s',
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              aria-label="Sonraki resim"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--edirne)" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: '0.85rem',
          fontWeight: 500,
          zIndex: 2
        }}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Dots */}
      {images.length > 1 && (
        <div style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          marginTop: 12,
          flexWrap: 'wrap'
        }}>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: 60,
                height: 60,
                padding: 0,
                border: currentIndex === index ? '3px solid var(--edirne)' : '2px solid transparent',
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s',
                opacity: currentIndex === index ? 1 : 0.6,
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = currentIndex === index ? '1' : '0.6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label={`${index + 1}. resme git`}
            >
              <img 
                src={img} 
                alt={`${alt} thumbnail ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
