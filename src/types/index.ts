export interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface DraggableIconProps {
  id: string;
  title: string;
  image: string;
  alt: string;
  onClick: (id: string) => void;
  initialPosition: { x: number; y: number };
}

export interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onClose: () => void;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
  onFocus: () => void;
}