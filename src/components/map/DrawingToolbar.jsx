import { useState } from 'react';
import { FiMapPin, FiMinus, FiSquare, FiX } from 'react-icons/fi';
import useStore from '../../store/useStore';
import { DATASET_CLUSTERS } from '../../data/catalog';

export default function DrawingToolbar() {
  const [showDatasetPicker, setShowDatasetPicker] = useState(null);
  const drawingMode = useStore((s) => s.drawingMode);
  const setDrawingMode = useStore((s) => s.setDrawingMode);
  const language = useStore((s) => s.language);

  const allDatasets = DATASET_CLUSTERS.flatMap((c) => c.datasets);

  const handleDrawingClick = (mode) => {
    if (drawingMode === mode) {
      setDrawingMode(null);
      setShowDatasetPicker(null);
    } else {
      setShowDatasetPicker(mode);
    }
  };

  const handleDatasetSelect = (datasetId) => {
    setDrawingMode(showDatasetPicker, datasetId);
    setShowDatasetPicker(null);
  };

  const geometryFilter = {
    point: 'Point',
    line: 'LineString',
    polygon: 'Polygon',
  };

  const filteredDatasets = showDatasetPicker
    ? allDatasets.filter((d) => d.geometry === geometryFilter[showDatasetPicker])
    : [];

  return (
    <div className="absolute top-20 left-4 z-[500] flex flex-col gap-1">
      <div className="bg-white rounded-lg shadow-lg p-1 flex flex-col gap-1">
        <button
          onClick={() => handleDrawingClick('point')}
          className={`p-2 rounded hover:bg-gray-100 ${drawingMode === 'point' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title={language === 'uk' ? 'Додати точку' : 'Add point'}
        >
          <FiMapPin size={18} />
        </button>
        <button
          onClick={() => handleDrawingClick('line')}
          className={`p-2 rounded hover:bg-gray-100 ${drawingMode === 'line' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title={language === 'uk' ? 'Намалювати лінію' : 'Draw line'}
        >
          <FiMinus size={18} />
        </button>
        <button
          onClick={() => handleDrawingClick('polygon')}
          className={`p-2 rounded hover:bg-gray-100 ${drawingMode === 'polygon' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title={language === 'uk' ? 'Намалювати полігон' : 'Draw polygon'}
        >
          <FiSquare size={18} />
        </button>
      </div>

      {/* Dataset picker dropdown */}
      {showDatasetPicker && (
        <div className="bg-white rounded-lg shadow-xl p-2 min-w-[200px] max-h-[300px] overflow-y-auto">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-medium text-gray-600">
              {language === 'uk' ? 'Оберіть набір даних:' : 'Select dataset:'}
            </span>
            <button onClick={() => setShowDatasetPicker(null)} className="text-gray-400 hover:text-gray-600">
              <FiX size={14} />
            </button>
          </div>
          {filteredDatasets.map((d) => (
            <button
              key={d.id}
              onClick={() => handleDatasetSelect(d.id)}
              className="w-full text-left px-2 py-1.5 text-sm hover:bg-blue-50 rounded flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-gray-700">{language === 'uk' ? d.name : d.nameEn}</span>
            </button>
          ))}
          {filteredDatasets.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-2">
              {language === 'uk' ? 'Немає наборів цього типу' : 'No datasets of this type'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
