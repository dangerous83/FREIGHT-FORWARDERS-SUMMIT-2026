import { Volume2, VolumeX } from 'lucide-react';
import { usePresentation } from '@/context/PresentationContext';

/**
 * Mute / unmute control for the OPTIONAL interface audio.
 * Audio is disabled by default and only ever begins after a user gesture.
 * When no audio asset is present this simply toggles intent; the audio layer
 * documents where sound files can be dropped in later.
 */
export function IntroAudioControl() {
  const { audioEnabled, toggleAudio } = usePresentation();
  return (
    <button
      type="button"
      className="intro-ctl-btn"
      onClick={toggleAudio}
      aria-pressed={audioEnabled}
      aria-label={audioEnabled ? 'Mute interface audio' : 'Enable interface audio'}
    >
      {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
      <span>{audioEnabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}
