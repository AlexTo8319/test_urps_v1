import { Marker, Popup, Polyline, Polygon, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../../store/useStore';
import { DATASET_CLUSTERS } from '../../data/catalog';
import { getMarkerColor } from '../../utils/helpers';

function createColoredIcon(color) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px; height: 24px; border-radius: 50% 50% 50% 0;
      background: ${color}; transform: rotate(-45deg);
      border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "><div style="
      width: 10px; height: 10px; border-radius: 50%;
      background: white; margin: 5px auto; transform: rotate(45deg);
    "></div></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
}

export default function DataLayers() {
  const activeLayers = useStore((s) => s.activeLayers);
  const datasetData = useStore((s) => s.datasetData);
  const layerOpacity = useStore((s) => s.layerOpacity);
  const setSelectedFeature = useStore((s) => s.setSelectedFeature);
  const openModal = useStore((s) => s.openModal);

  const allDatasets = DATASET_CLUSTERS.flatMap((c) => c.datasets);

  return (
    <>
      {allDatasets.map((dataset) => {
        if (!activeLayers[dataset.id]) return null;
        const data = datasetData[dataset.id] || [];
        const opacity = layerOpacity[dataset.id] ?? 1;

        if (dataset.geometry === 'Point') {
          return data.map((item) => {
            if (!item.latitude || !item.longitude) return null;
            return (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={createColoredIcon(dataset.color)}
                opacity={opacity}
                eventHandlers={{
                  click: () => {
                    setSelectedFeature(item, dataset.id);
                    openModal('featureInfo', { feature: item, datasetId: dataset.id, datasetName: dataset.name });
                  },
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                    {Object.entries(item).filter(([k]) => !['id', 'name', 'geometry'].includes(k)).slice(0, 5).map(([k, v]) => (
                      <div key={k} className="text-xs text-gray-600">
                        <span className="font-medium">{k}:</span> {String(v)}
                      </div>
                    ))}
                  </div>
                </Popup>
              </Marker>
            );
          });
        }

        if (dataset.geometry === 'LineString') {
          return data.map((item) => {
            if (!item.geometry?.coordinates) return null;
            const positions = item.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
            return (
              <Polyline
                key={item.id}
                positions={positions}
                color={dataset.color}
                weight={3}
                opacity={opacity}
                eventHandlers={{
                  click: () => {
                    setSelectedFeature(item, dataset.id);
                    openModal('featureInfo', { feature: item, datasetId: dataset.id, datasetName: dataset.name });
                  },
                }}
              />
            );
          });
        }

        if (dataset.geometry === 'Polygon') {
          return data.map((item) => {
            if (!item.geometry?.coordinates) return null;
            const positions = item.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
            return (
              <Polygon
                key={item.id}
                positions={positions}
                color={dataset.color}
                fillColor={dataset.color}
                fillOpacity={0.3 * opacity}
                weight={2}
                opacity={opacity}
                eventHandlers={{
                  click: () => {
                    setSelectedFeature(item, dataset.id);
                    openModal('featureInfo', { feature: item, datasetId: dataset.id, datasetName: dataset.name });
                  },
                }}
              />
            );
          });
        }

        return null;
      })}
    </>
  );
}
