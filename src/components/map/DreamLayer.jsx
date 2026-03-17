import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../../store/useStore';

function createDreamIcon(index) {
  return L.divIcon({
    className: 'dream-marker',
    html: `<div style="
      width: 28px; height: 28px; border-radius: 50%;
      background: #009688; color: white; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">${index + 1}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export default function DreamLayer() {
  const dreamLayerActive = useStore((s) => s.dreamLayerActive);
  const dreamProjects = useStore((s) => s.dreamProjects);
  const language = useStore((s) => s.language);

  if (!dreamLayerActive) return null;

  return (
    <>
      {dreamProjects.map((project, i) => (
        <Marker
          key={project.id}
          position={[project.latitude, project.longitude]}
          icon={createDreamIcon(i)}
        >
          <Popup>
            <div className="min-w-[220px]">
              <div className="text-xs text-teal-600 font-medium mb-1">DREAM Platform</div>
              <h3 className="font-semibold text-sm mb-2">{project.name}</h3>
              <div className="space-y-1 text-xs text-gray-600">
                <div><span className="font-medium">{language === 'uk' ? 'Тип' : 'Type'}:</span> {project.type}</div>
                <div><span className="font-medium">{language === 'uk' ? 'Статус' : 'Status'}:</span> {project.status}</div>
                <div><span className="font-medium">{language === 'uk' ? 'Бюджет' : 'Budget'}:</span> {new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(project.budget)}</div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
