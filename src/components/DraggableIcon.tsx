import React, { useState, useCallback, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import type { DraggableIconProps } from '../types';
import './DraggableIcon.css';

const DraggableIcon: React.FC<DraggableIconProps> = ({
  id,
  title,
  image,
  alt,
  onClick,
  initialPosition
}) => {
  const [position, setPosition] = useState(initialPosition);
  
  const [, setIsDragging] = useState(false);
  const [iconSize, setIconSize] = useState({ width: 96, height: 96, container: 120 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      if (window.innerWidth <= 480) {
        setIconSize({ width: 64, height: 64, container: 80 });
      } else if (window.innerWidth <= 768) {
        setIconSize({ width: 80, height: 80, container: 100 });
      } else {
        setIconSize({ width: 96, height: 96, container: 120 });
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, [id]);

  const handleDragStop = useCallback((_: unknown, data: { x: number; y: number }) => {
    if (!isMobile) {
      setPosition({ x: data.x, y: data.y });
      // No localStorage - positions reset on page refresh
    }
  }, [isMobile]);

  const handleDesktopDoubleClick = () => {
    onClick(id);
  };

  const handleMobileClick = () => {
    if (isMobile) {
      onClick(id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick(id);
    }
  };

  return (
    <Rnd
      position={position}
      size={{ width: iconSize.container, height: iconSize.container + 40 }}
      onDragStart={() => setIsDragging(true)}
      onDragStop={handleDragStop}
      bounds="parent"
      className="draggable-icon"
      disableDragging={isMobile}
      enableResizing={false}
      onDoubleClick={!isMobile ? handleDesktopDoubleClick : undefined}
      onClick={isMobile ? handleMobileClick : undefined}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={title}
    >
      <img
        src={image}
        alt={alt}
        draggable={false}
        style={{ 
          width: iconSize.width, 
          height: iconSize.height,
          marginBottom: '12px'
        }}
      />
      <span className="icon-title">{title}</span>
    </Rnd>
  );
};

export default DraggableIcon;