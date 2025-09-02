import React, { useState } from 'react';
import DraggableIcon from './DraggableIcon';
import './Desktop.css';

interface DesktopProps {
  onIconClick: (id: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ onIconClick }) => {
  const desktopIcons = [
    {
      id: 'who-is-renee',
      title: 'Who is Renee',
      image: 'assets/icons/who-is-renee.png',
      alt: 'Who is Renee icon',
      initialPosition: { x: 50, y: 50 }
    },
    {
      id: 'projects',
      title: 'Projects',
      image: 'assets/icons/projects.png',
      alt: 'Projects icon',
      initialPosition: { x: 50, y: 200 }
    },
    {
      id: 'resources',
      title: 'Resources',
      image: 'assets/icons/resources.png',
      alt: 'Resources icon',
      initialPosition: { x: 50, y: 350 }
    },
    {
      id: 'drop-message',
      title: 'Drop A Message',
      image: 'assets/icons/drop-a-message.png',
      alt: 'Drop a message icon',
      initialPosition: { x: 50, y: 500 }
    }
  ];

  // No localStorage - positions reset on page refresh

  const [isDispered, setIsDispered] = useState(false);
  const titleText = "Reneee!!";

  const disperseTransforms = [
    { x: -100, y: -75, rotate: -29 },
    { x: -25, y: -50, rotate: -6 },
    { x: -6, y: 12, rotate: 12 },
    { x: -6, y: -12, rotate: -9 },
    { x: -12, y: 68, rotate: 3 },
    { x: 0, y: -12, rotate: 9 },
    { x: 0, y: 18, rotate: -12 },
    { x: 0, y: -80, rotate: 9 },
  ];

  return (
    <div className="desktop">
      <div 
        className="site-title"
        onMouseEnter={() => setIsDispered(true)}
        onMouseLeave={() => setIsDispered(false)}
      >
        <div className="disperse-text">
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              className="disperse-char"
              style={{
                transform: isDispered 
                  ? `translate(${disperseTransforms[index % 10].x}px, ${disperseTransforms[index % 10].y}px) rotate(${disperseTransforms[index % 10].rotate}deg)`
                  : 'translate(0px, 0px) rotate(0deg)',
                transition: 'transform 0.75s ease-in-out',
                display: 'inline-block',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      <div className="center-logo">
        <img 
          src="assets/logo/renee-working.gif?v=3" 
          alt="Renee's personal logo" 
          className="logo-image"
        />
      </div>
      
      {desktopIcons.map((icon) => (
        <DraggableIcon
          key={icon.id}
          id={icon.id}
          title={icon.title}
          image={icon.image}
          alt={icon.alt}
          onClick={onIconClick}
          initialPosition={icon.initialPosition}
        />
      ))}
      
    </div>
  );
};

export default Desktop;