import { Maximize, Minimize } from 'lucide-react';
import { usePresentation } from '@/context/PresentationContext';

export function FullscreenControl() {
  const { isFullscreen, toggleFullscreen } = usePresentation();
  return (
    <button
      className="tool-btn fullscreen-control"
      onClick={toggleFullscreen}
      aria-pressed={isFullscreen}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      title="Fullscreen (F)"
    >
      {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
    </button>
  );
}
