import { useState, useEffect } from 'react';
import './App.css';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Window from './components/Window';
import ProjectsGallery from './components/ProjectsGallery';
import type { WindowState } from './types';


function App() {
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'who-is-renee',
      title: 'Who is Renee?',
      content: (
        <div className="text-content">
          <div className="profile-section">
            <img 
              src="assets/logo/renee-profile.png" 
              alt="Renee Profile"
              className="profile-image"
            />
          </div>
          <div className="bio-text">
            <p>Hey, I'm Renee — your AI bestie 🐱💻</p>
            <p>I'm a hacker with a soft spot for crime thrillers, obsessed with AI, and here to help you actually get tech.</p>
            <p>Your go-to girl for turning confusing tools into cool hacks — saving you time, money, and headaches.</p>
            <p>When I'm not nerding out, I'm probably laughing at weird memes or watching another plot twist I totally didn't see coming.</p>
            <p>Let's make tech fun together 🚀</p>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      position: { x: 200, y: 100 },
      size: { width: 500, height: 500 }
    },
    {
      id: 'projects',
      title: 'Projects',
      content: <ProjectsGallery />,
      isOpen: false,
      isMinimized: false,
      position: { x: 200, y: 100 },
      size: { width: 800, height: 600 }
    },
    {
      id: 'resources',
      title: 'Resources',
      content: (
        <div className="text-content">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <a href="https://21st.dev/" target="_blank" rel="noopener noreferrer">
                Prompts for web design components
              </a>
            </li>
          </ul>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      position: { x: 300, y: 200 },
      size: { width: 350, height: 250 }
    }
  ]);

  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  // Responsive window positioning and sizing
  useEffect(() => {
    const updateWindowSizes = () => {
      if (typeof window !== 'undefined') {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const isMobile = viewportWidth <= 768;
        const isTablet = viewportWidth <= 1024;
        
        setWindows(prev => prev.map((window) => {
          let newSize = window.size;
          let newPosition = window.position;
          
          // Responsive sizing
          if (window.id === 'who-is-renee') {
            newSize = isMobile 
              ? { width: Math.min(350, viewportWidth - 40), height: Math.min(450, viewportHeight - 100) }
              : isTablet 
              ? { width: 450, height: 500 }
              : { width: 500, height: 500 };
          } else if (window.id === 'projects') {
            newSize = isMobile 
              ? { width: Math.min(350, viewportWidth - 40), height: Math.min(500, viewportHeight - 100) }
              : isTablet 
              ? { width: 600, height: 500 }
              : { width: 800, height: 600 };
          } else if (window.id === 'resources') {
            newSize = isMobile 
              ? { width: Math.min(300, viewportWidth - 40), height: Math.min(200, viewportHeight - 100) }
              : isTablet 
              ? { width: 320, height: 220 }
              : { width: 350, height: 250 };
          }
          
          // Responsive positioning - center windows
          const centerX = Math.max(20, Math.floor((viewportWidth - newSize.width) / 2));
          const centerY = Math.max(20, Math.floor((viewportHeight - newSize.height) / 2));
          
          newPosition = { x: centerX, y: centerY };
          
          return {
            ...window,
            size: newSize,
            position: newPosition
          };
        }));
      }
    };

    updateWindowSizes();
    window.addEventListener('resize', updateWindowSizes);
    return () => window.removeEventListener('resize', updateWindowSizes);
  }, []);

  const openWindow = (id: string) => {
    if (id === 'drop-message') {
      window.location.href = 'mailto:renee.mktg@gmail.com';
      return;
    }

    setWindows(prev =>
      prev.map(window => {
        if (window.id === id) {
          const viewportWidth = Math.max(document.documentElement?.clientWidth || 800, 320);
          const viewportHeight = Math.max(document.documentElement?.clientHeight || 600, 320);
          
          // Responsive positioning based on viewport
          let centerX = Math.max(20, Math.floor((viewportWidth - window.size.width) / 2));
          let centerY = Math.max(20, Math.floor((viewportHeight - window.size.height) / 2));
          
          // Ensure window stays within viewport bounds
          centerX = Math.min(centerX, viewportWidth - window.size.width - 20);
          centerY = Math.min(centerY, viewportHeight - window.size.height - 20);
          
          
          return { 
            ...window, 
            isOpen: true, 
            isMinimized: false,
            position: { x: centerX, y: centerY }
          };
        }
        return window;
      })
    );
    setActiveWindow(id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, isOpen: false, isMinimized: false }
          : window
      )
    );
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };


  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, position }
          : window
      )
    );
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, size }
          : window
      )
    );
  };

  return (
    <div className="App">
      <Desktop onIconClick={openWindow} />
      <Dock />
      
      {windows.map(window => (
          window.isOpen && !window.isMinimized && (
            <Window
              key={window.id}
              window={window}
              isActive={activeWindow === window.id}
              onClose={() => closeWindow(window.id)}
              onUpdatePosition={(position) => updateWindowPosition(window.id, position)}
              onUpdateSize={(size) => updateWindowSize(window.id, size)}
              onFocus={() => setActiveWindow(window.id)}
            />
          )
        ))} 
    </div>
  );
}

export default App;