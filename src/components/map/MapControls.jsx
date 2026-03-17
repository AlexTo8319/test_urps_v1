import { FiPlus, FiMinus, FiNavigation, FiLayers, FiBox } from 'react-icons/fi';
import useStore from '../../store/useStore';

export default function MapControls() {
  const mapStyle = useStore((s) => s.mapStyle);
  const setMapStyle = useStore((s) => s.setMapStyle);
  const mapZoom = useStore((s) => s.mapZoom);
  const setMapZoom = useStore((s) => s.setMapZoom);
  const drawingMode = useStore((s) => s.drawingMode);
  const language = useStore((s) => s.language);

  return (
    <>
      {/* Zoom controls */}
      <div className="absolute bottom-6 right-4 z-[500] flex flex-col gap-1">
        <button
          onClick={() => setMapZoom(mapZoom + 1)}
          className="bg-white rounded shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700"
        >
          <FiPlus size={16} />
        </button>
        <button
          onClick={() => setMapZoom(Math.max(1, mapZoom - 1))}
          className="bg-white rounded shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700"
        >
          <FiMinus size={16} />
        </button>
        <div className="h-1" />
        <button
          onClick={() => setMapStyle(mapStyle === 'street' ? 'satellite' : 'street')}
          className="bg-white rounded shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700"
          title={language === 'uk' ? 'Перемкнути вигляд' : 'Toggle view'}
        >
          <FiLayers size={16} />
        </button>
        <button
          className="bg-white rounded shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700"
          title="3D"
        >
          <FiBox size={16} />
        </button>
        <button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                useStore.getState().setMapCenter([pos.coords.latitude, pos.coords.longitude]);
                useStore.getState().setMapZoom(15);
              });
            }
          }}
          className="bg-white rounded shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700"
          title={language === 'uk' ? 'Моя локація' : 'My location'}
        >
          <FiNavigation size={16} />
        </button>
      </div>

      {/* Drawing mode indicator */}
      {drawingMode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[500] bg-urps-primary text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span className="text-sm">
            {language === 'uk' ? 'Режим малювання' : 'Drawing mode'}: {drawingMode}
          </span>
          <button
            onClick={() => useStore.getState().setDrawingMode(null)}
            className="text-xs bg-white/20 px-2 py-0.5 rounded hover:bg-white/30"
          >
            {language === 'uk' ? 'Скасувати' : 'Cancel'}
          </button>
        </div>
      )}
    </>
  );
}
