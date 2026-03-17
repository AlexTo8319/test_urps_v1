import { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../../store/useStore';
import DataLayers from './DataLayers';
import DreamLayer from './DreamLayer';
import DrawingControl from './DrawingControl';
import MapControls from './MapControls';
import FeaturePopup from './FeaturePopup';

function MapUpdater() {
  const map = useMap();
  const mapCenter = useStore((s) => s.mapCenter);
  const mapZoom = useStore((s) => s.mapZoom);

  useEffect(() => {
    map.setView(mapCenter, mapZoom);
  }, [map, mapCenter, mapZoom]);

  return null;
}

function MapClickHandler() {
  const drawingMode = useStore((s) => s.drawingMode);
  const drawingDataset = useStore((s) => s.drawingDataset);
  const addDataEntry = useStore((s) => s.addDataEntry);
  const setDrawingMode = useStore((s) => s.setDrawingMode);
  const openModal = useStore((s) => s.openModal);
  const addNotification = useStore((s) => s.addNotification);

  useMapEvents({
    click(e) {
      if (drawingMode === 'point' && drawingDataset) {
        openModal('editFeature', {
          datasetId: drawingDataset,
          isNew: true,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
        setDrawingMode(null);
      }
    },
  });

  return null;
}

export default function MapView() {
  const mapCenter = useStore((s) => s.mapCenter);
  const mapZoom = useStore((s) => s.mapZoom);
  const mapStyle = useStore((s) => s.mapStyle);

  const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  return (
    <div className="relative flex-1 h-full">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url={mapStyle === 'satellite' ? satelliteUrl : streetUrl}
          attribution={mapStyle === 'satellite'
            ? '&copy; Esri'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          }
        />
        <MapUpdater />
        <MapClickHandler />
        <DataLayers />
        <DreamLayer />
        <DrawingControl />
        <FeaturePopup />
      </MapContainer>
      <MapControls />
    </div>
  );
}
