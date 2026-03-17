import { useState } from 'react';
import useStore from '../../store/useStore';

export default function AccessibilityPanel() {
  const [analysisType, setAnalysisType] = useState('walking');
  const [duration, setDuration] = useState(15);
  const language = useStore((s) => s.language);

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-white text-sm">
        {language === 'uk' ? 'Аналіз доступності' : 'Accessibility Analysis'}
      </h3>
      <p className="text-xs text-blue-200">
        {language === 'uk'
          ? 'Виберіть точку на карті та параметри для аналізу ізохрон.'
          : 'Select a point on the map and parameters for isochrone analysis.'}
      </p>

      <div className="space-y-3">
        <label className="block">
          <span className="text-xs text-blue-300">
            {language === 'uk' ? 'Тип пересування' : 'Travel mode'}
          </span>
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
            className="w-full mt-1 bg-blue-900 border border-blue-700 rounded px-2 py-1.5 text-sm text-white"
          >
            <option value="walking">{language === 'uk' ? 'Пішки' : 'Walking'}</option>
            <option value="driving">{language === 'uk' ? 'На автомобілі' : 'Driving'}</option>
            <option value="cycling">{language === 'uk' ? 'На велосипеді' : 'Cycling'}</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs text-blue-300">
            {language === 'uk' ? 'Тривалість (хв)' : 'Duration (min)'}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-white w-8 text-right">{duration}</span>
          </div>
        </label>

        <div className="grid grid-cols-3 gap-1 text-xs">
          {[15, 30, 45].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`py-1 rounded ${duration === d ? 'bg-urps-accent text-urps-dark' : 'bg-blue-900 text-blue-200 hover:bg-blue-800'}`}
            >
              {d} {language === 'uk' ? 'хв' : 'min'}
            </button>
          ))}
        </div>

        <button className="w-full bg-urps-accent text-urps-dark font-medium py-2 rounded text-sm hover:bg-yellow-400 transition-colors">
          {language === 'uk' ? 'Аналізувати' : 'Analyze'}
        </button>

        {/* Legend preview */}
        <div className="mt-4 space-y-1">
          <p className="text-xs text-blue-300 font-medium">
            {language === 'uk' ? 'Градієнт доступності' : 'Accessibility gradient'}
          </p>
          <div className="h-3 rounded" style={{ background: 'linear-gradient(to right, #27ae60, #f39c12, #e74c3c)' }} />
          <div className="flex justify-between text-[10px] text-blue-400">
            <span>{language === 'uk' ? 'Близько' : 'Near'}</span>
            <span>{language === 'uk' ? 'Далеко' : 'Far'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
