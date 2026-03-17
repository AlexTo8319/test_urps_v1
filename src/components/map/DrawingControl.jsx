import { useEffect, useState } from 'react';
import { useMap, useMapEvents, Polyline, Polygon, Marker } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../../store/useStore';

export default function DrawingControl() {
  const drawingMode = useStore((s) => s.drawingMode);
  const drawingDataset = useStore((s) => s.drawingDataset);
  const setDrawingMode = useStore((s) => s.setDrawingMode);
  const addDataEntry = useStore((s) => s.addDataEntry);
  const openModal = useStore((s) => s.openModal);
  const [points, setPoints] = useState([]);
  const map = useMap();

  useEffect(() => {
    if (drawingMode === 'line' || drawingMode === 'polygon') {
      map.getContainer().style.cursor = 'crosshair';
    } else if (drawingMode === 'point') {
      map.getContainer().style.cursor = 'crosshair';
    } else {
      map.getContainer().style.cursor = '';
    }
    setPoints([]);
    return () => { map.getContainer().style.cursor = ''; };
  }, [drawingMode, map]);

  useMapEvents({
    click(e) {
      if (drawingMode === 'line' || drawingMode === 'polygon') {
        setPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
      }
    },
    dblclick(e) {
      if ((drawingMode === 'line' || drawingMode === 'polygon') && points.length >= 2) {
        const coords = [...points, [e.latlng.lat, e.latlng.lng]];
        const geojsonCoords = coords.map(([lat, lng]) => [lng, lat]);

        if (drawingMode === 'polygon') {
          geojsonCoords.push(geojsonCoords[0]); // Close polygon
        }

        openModal('editFeature', {
          datasetId: drawingDataset,
          isNew: true,
          geometry: {
            type: drawingMode === 'line' ? 'LineString' : 'Polygon',
            coordinates: drawingMode === 'polygon' ? [geojsonCoords] : geojsonCoords,
          },
        });
        setPoints([]);
        setDrawingMode(null);
      }
    },
  });

  if (!drawingMode || drawingMode === 'point') return null;

  return (
    <>
      {drawingMode === 'line' && points.length >= 2 && (
        <Polyline positions={points} color="#2980b9" weight={3} dashArray="5,10" />
      )}
      {drawingMode === 'polygon' && points.length >= 2 && (
        <Polygon positions={points} color="#2980b9" fillColor="#2980b9" fillOpacity={0.2} dashArray="5,10" />
      )}
      {points.map((p, i) => (
        <Marker
          key={i}
          position={p}
          icon={L.divIcon({
            className: 'draw-vertex',
            html: `<div style="width:10px;height:10px;background:#2980b9;border:2px solid white;border-radius:50%;"></div>`,
            iconSize: [10, 10],
            iconAnchor: [5, 5],
          })}
        />
      ))}
    </>
  );
}
