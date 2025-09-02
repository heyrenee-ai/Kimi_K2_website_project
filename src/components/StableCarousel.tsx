import React, { useState, useEffect, useCallback, useRef } from 'react';
import './StableCarousel.css';

const projectImages = [
  "assets/project-images/IMG_8048.JPG",
  "assets/project-images/IMG_8064.JPG",
  "assets/project-images/IMG_8069.JPG",
  "assets/project-images/IMG_8073.JPG",
  "assets/project-images/IMG_8075.JPG",
  "assets/project-images/IMG_8077.JPG",
  "assets/project-images/IMG_8081.JPG",
  "assets/project-images/IMG_8087.JPG"
];

const StableCarousel: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all images
  useEffect(() => {
    projectImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const openCarousel = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setCurrentImage(projectImages[index]);
    setIsVisible(true);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }, []);

  const closeCarousel = useCallback(() => {
    setIsVisible(false);
    setIsTransitioning(false);
    
    // Restore body scroll
    setTimeout(() => {
      setSelectedImageIndex(null);
      document.body.style.overflow = '';
    }, 300); // Match animation duration
  }, []);

  const goToNextImage = useCallback(() => {
    if (selectedImageIndex === null || isTransitioning) return;
    
    setIsTransitioning(true);
    const nextIndex = (selectedImageIndex + 1) % projectImages.length;
    
    setTimeout(() => {
      setSelectedImageIndex(nextIndex);
      setCurrentImage(projectImages[nextIndex]);
      setIsTransitioning(false);
    }, 150); // Quick transition for smooth experience
  }, [selectedImageIndex, isTransitioning]);

  const goToPreviousImage = useCallback(() => {
    if (selectedImageIndex === null || isTransitioning) return;
    
    setIsTransitioning(true);
    const prevIndex = (selectedImageIndex - 1 + projectImages.length) % projectImages.length;
    
    setTimeout(() => {
      setSelectedImageIndex(prevIndex);
      setCurrentImage(projectImages[prevIndex]);
      setIsTransitioning(false);
    }, 150);
  }, [selectedImageIndex, isTransitioning]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isVisible) return;
    
    if (e.key === 'Escape') {
      closeCarousel();
    } else if (e.key === 'ArrowLeft') {
      goToPreviousImage();
    } else if (e.key === 'ArrowRight') {
      goToNextImage();
    }
  }, [isVisible, closeCarousel, goToPreviousImage, goToNextImage]);

  // Handle keyboard events
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => handleKeyDown(e);
    document.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleKeyDown]);


  return (
    <>
      <div className="projects-content">
        <h3 className="projects-title">My Creative Projects</h3>
        <div className="projects-grid">
          {projectImages.map((image, index) => (
            <div 
              key={`project-${index}`}
              className="project-thumbnail"
              onClick={() => openCarousel(index)}
            >
              <img 
                src={image} 
                alt={`Project ${index + 1}`}
                className="thumbnail-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Window-contained carousel */}
      {selectedImageIndex !== null && (
        <div 
          ref={overlayRef}
          className={`carousel-overlay stable ${isVisible ? 'visible' : ''}`}
                    style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            opacity: isVisible ? 1 : 0,
            visibility: isVisible ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          }}
        >
          <button 
            className="carousel-close"
            onClick={(e) => {
              e.stopPropagation();
              closeCarousel();
            }}
            aria-label="Close carousel"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              background: 'rgba(0, 0, 0, 0.3)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '16px',
              cursor: 'pointer',
              zIndex: 1001,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1
            }}
          >
            ×
          </button>
          
          <div 
            ref={containerRef}
            className="carousel-container stable"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box',
              gap: '20px',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          >
            <button 
              className="carousel-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousImage();
              }}
              aria-label="Previous image"
              disabled={isTransitioning}
              style={{
                position: 'absolute',
                top: '50%',
                left: 'clamp(10px, 5%, 60px)',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10001,
                transition: 'all 0.3s ease',
                opacity: isTransitioning ? 0.5 : 0.8
              }}
            >
              ‹
            </button>
            
            <div className="carousel-image-wrapper"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1',
                maxWidth: 'calc(100% - 340px)',
                maxHeight: 'calc(100% - 40px)',
                minWidth: '200px',
                height: '100%'
              }}
            >
              <img 
                src={currentImage}
                alt={`Project ${selectedImageIndex + 1}`}
                className={`carousel-image ${isTransitioning ? 'transitioning' : ''}`}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: 'calc(100% - 40px)',
                  objectFit: 'contain',
                  display: 'block',
                  margin: 'auto',
                  borderRadius: '8px',
                  opacity: isTransitioning ? 0.7 : 1,
                  transition: 'opacity 0.15s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              />
            </div>
            
            <button 
              className="carousel-nav next"
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
              aria-label="Next image"
              disabled={isTransitioning}
              style={{
                position: 'absolute',
                top: '50%',
                right: 'clamp(10px, 5%, 60px)',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10001,
                transition: 'all 0.3s ease',
                opacity: isTransitioning ? 0.5 : 0.8
              }}
            >
              ›
            </button>
            
            <div className="carousel-indicator"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                zIndex: 1001,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
            >
              {selectedImageIndex + 1} / {projectImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StableCarousel;