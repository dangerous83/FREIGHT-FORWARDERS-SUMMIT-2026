import { locations, type LocationId } from '@/data/locations';
import MAP_VIDEO from '@/assets/slide-4-map-rev2.mp4';

interface Props {
  activeId: LocationId | null;
  onSelect: (id: LocationId) => void;
  animate: boolean;
}

export function RouteMap({ onSelect }: Props) {
  const ordered = [...locations].sort((a, b) => a.order - b.order);

  return (
    <div className="route-map">
      <video
        className="route-map__video"
        src={MAP_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="route-map__legend" aria-label="Corridor stops">
        {ordered.map((l) => (
          <button
            key={l.id}
            type="button"
            className="route-map__legend-chip"
            onClick={() => onSelect(l.id)}
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}
