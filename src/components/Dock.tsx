import React, { useState, useEffect } from 'react';
import './Dock.css';

const Dock: React.FC = () => {
  const [trashIcon, setTrashIcon] = useState('assets/dock/empty-trash-can.png');
  const [isWiggling, setIsWiggling] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [isTrashHovered, setIsTrashHovered] = useState(false);
  const [isBubbleHovered, setIsBubbleHovered] = useState(false);
  const [lastMessage, setLastMessage] = useState('');

  const socialLinks = [
    {
      name: 'Xiaohongshu',
      url: 'https://www.xiaohongshu.com/user/profile/62a6b493000000001b02aa8d',
      icon: 'assets/dock/xiaohongshu-icon.png',
      alt: 'Xiaohongshu icon'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/heyrenee.ai/',
      icon: 'assets/dock/instagram-icon.png',
      alt: 'Instagram icon'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@heyrenee.ai?lang=en',
      icon: 'assets/dock/tiktok-icon.png',
      alt: 'TikTok icon'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@heyrenee_ai',
      icon: 'assets/dock/youtube-icon.png',
      alt: 'YouTube icon'
    }
  ];

  const handleTrashClick = () => {
    const messages = [
      "Stop poking me!",
      "I'm empty, I swear!",
      "beep boop",
      "You're trashing my vibe!",
      "honk honk",
      "Welcome to the garbage circus!",
      "I'm not a real trash can, you know!",
      "Hey! Where's my pizza?",
      "error 404: trash not found",
      "*hums trash can man theme*"
    ];
    
    // Filter out the last message to ensure different text
    const availableMessages = messages.filter(msg => msg !== lastMessage);
    
    // If only one message left (edge case), use it
    const newMessage = availableMessages.length > 0 
      ? availableMessages[Math.floor(Math.random() * availableMessages.length)]
      : messages[Math.floor(Math.random() * messages.length)];
    
    setIsWiggling(true);
    setShowMessage(newMessage);
    setLastMessage(newMessage);
    
    // Simple audio using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch {
      // Silently fail if audio not supported
    }
    
    // Change to full trash briefly
    setTrashIcon('assets/dock/full-trash-can.png');
    
    // Reset after animation
    setTimeout(() => {
      setIsWiggling(false);
      setTrashIcon('assets/dock/empty-trash-can.png');
    }, 500);
  };

  // Handle hover states for bubble dismissal
  useEffect(() => {
    if (!isTrashHovered && !isBubbleHovered && showMessage) {
      // Hide message when not hovering over trash or bubble
      const timer = setTimeout(() => {
        setShowMessage('');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isTrashHovered, isBubbleHovered, showMessage]);

  const handleSocialClick = (url: string, name: string) => {
    if (name === 'Trash') {
      handleTrashClick();
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="dock">
      <div className="dock-icons">
        {socialLinks.map((link) => (
          <div
            key={link.name}
            className="dock-icon"
            onClick={() => handleSocialClick(link.url, link.name)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSocialClick(link.url, link.name);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={link.name === 'Trash' ? 'Trash' : `Open ${link.name}`}
            title={link.name}
          >
            <img
              src={link.icon}
              alt={link.alt}
              className="dock-icon-image"
              draggable={false}
            />
          </div>
        ))}
        
        {/* Fun Trash Can */}
        <div className="trash-container" style={{ position: 'relative' }}>
          <div
            className={`dock-icon ${isWiggling ? 'wiggle' : ''}`}
            onClick={() => handleTrashClick()}
            onMouseEnter={() => setIsTrashHovered(true)}
            onMouseLeave={() => setIsTrashHovered(false)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleTrashClick();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Trash"
            title="Trash"
          >
            <img
              src={trashIcon}
              alt="Trash can icon"
              className="dock-icon-image"
              draggable={false}
            />
          </div>
          
          {/* Fun message popup */}
          {showMessage && (
            <div 
              className="trash-message"
              onMouseEnter={() => setIsBubbleHovered(true)}
              onMouseLeave={() => setIsBubbleHovered(false)}
            >
              {showMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dock;