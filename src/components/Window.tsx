import React, { useState, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import type { WindowProps } from '../types';
import './Window.css';

const Window: React.FC<WindowProps> = ({
  window,
  isActive,
  onClose,
  onUpdatePosition,
  onUpdateSize,
  onFocus
}) => {
  const [, setIsDragging] = useState(false);

  const handleDragStop = useCallback((_: unknown, data: { x: number; y: number }) => {
    onUpdatePosition({ x: data.x, y: data.y });
    setIsDragging(false);
  }, [onUpdatePosition]);

  const handleResizeStop = useCallback((
    _: unknown,
    __: unknown,
    ref: HTMLElement,
    _delta: { width: number; height: number },
    position: { x: number; y: number }
  ) => {
    onUpdatePosition({ x: position.x, y: position.y });
    onUpdateSize({ 
      width: ref.offsetWidth, 
      height: ref.offsetHeight 
    });
  }, [onUpdatePosition, onUpdateSize]);

  if (!window.isOpen || window.isMinimized) {
    return null;
  }

  return (
    <Rnd
      size={{ width: window.size.width, height: window.size.height }}
      position={{ x: window.position.x, y: window.position.y }}
      onDragStart={() => {
        onFocus();
        setIsDragging(true);
      }}
      onDragStop={handleDragStop}
      onResizeStart={() => onFocus()}
      onResizeStop={handleResizeStop}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      className={`react-rnd-window ${isActive ? 'active' : ''}`}
      style={{ zIndex: isActive ? 1000 : 100 }}
    >
      <div className="window-frame">
        <div className="window-header">
          <div className="window-controls">
            <button
              className="window-control close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close window"
            >
              ×
            </button>
          </div>
          <div className="window-title">{window.title}</div>
        </div>
        
        <div className="window-content">
          {window.content}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;