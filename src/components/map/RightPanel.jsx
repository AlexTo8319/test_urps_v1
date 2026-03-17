import { FiEye, FiEyeOff, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import useStore from '../../store/useStore';
import { DATASET_CLUSTERS } from '../../data/catalog';

export default function RightPanel() {
  const rightPanelOpen = useStore((s) => s.rightPanelOpen);
  const toggleRightPanel = useStore((s) => s.toggleRightPanel);
  const rightPanelTab = useStore((s) => s.rightPanelTab);
  const setRightPanelTab = useStore((s) => s.setRightPanelTab);
  const activeLayers = useStore((s) => s.activeLayers);
  const toggleLayer = useStore((s) => s.toggleLayer);
  const layerOpacity = useStore((s) => s.layerOpacity);
  const setLayerOpacity = useStore((s) => s.setLayerOpacity);
  const dreamLayerActive = useStore((s) => s.dreamLayerActive);
  const language = useStore((s) => s.language);

  const allDatasets = DATASET_CLUSTERS.flatMap((c) => c.datasets);
  const activeDatasets = allDatasets.filter((d) => activeLayers[d.id]);

  if (!rightPanelOpen) {
    return (
      <button
        onClick={toggleRightPanel}
        className="absolute top-20 right-0 z-[500] bg-white shadow-md rounded-l-lg p-2 hover:bg-gray-50"
      >
        <FiChevronLeft size={16} />
      </button>
    );
  }

  return (
    <div className="w-72 bg-white shadow-lg z-[500] flex flex-col border-l border-gray-200 h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setRightPanelTab('legend')}
          className={`flex-1 py-2.5 text-sm font-medium ${rightPanelTab === 'legend' ? 'text-urps-primary border-b-2 border-urps-primary' : 'text-gray-500'}`}
        >
          {language === 'uk' ? 'Легенда' : 'Legend'}
        </button>
        <button
          onClick={() => setRightPanelTab('layers')}
          className={`flex-1 py-2.5 text-sm font-medium ${rightPanelTab === 'layers' ? 'text-urps-primary border-b-2 border-urps-primary' : 'text-gray-500'}`}
        >
          {language === 'uk' ? 'Активні шари' : 'Active Layers'}
        </button>
        <button onClick={toggleRightPanel} className="px-2 text-gray-400 hover:text-gray-600">
          <FiChevronRight size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {rightPanelTab === 'legend' && (
          <div className="space-y-3">
            {activeDatasets.length === 0 && !dreamLayerActive ? (
              <p className="text-sm text-gray-400 text-center mt-8">
                {language === 'uk' ? 'Увімкніть шари для відображення легенди' : 'Enable layers to show legend'}
              </p>
            ) : (
              <>
                {activeDatasets.map((d) => (
                  <div key={d.id} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-xs text-gray-700">{language === 'uk' ? d.name : d.nameEn}</span>
                  </div>
                ))}
                {dreamLayerActive && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 bg-teal-600" />
                    <span className="text-xs text-gray-700">DREAM Platform</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {rightPanelTab === 'layers' && (
          <div className="space-y-3">
            {activeDatasets.length === 0 && !dreamLayerActive ? (
              <p className="text-sm text-gray-400 text-center mt-8">
                {language === 'uk' ? 'Немає активних шарів' : 'No active layers'}
              </p>
            ) : (
              <>
                {activeDatasets.map((d) => (
                  <div key={d.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                        <span className="text-xs font-medium text-gray-700">{language === 'uk' ? d.name : d.nameEn}</span>
                      </div>
                      <button onClick={() => toggleLayer(d.id)} className="text-gray-400 hover:text-gray-600">
                        {activeLayers[d.id] ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{language === 'uk' ? 'Прозорість' : 'Opacity'}</span>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={layerOpacity[d.id] ?? 1}
                        onChange={(e) => setLayerOpacity(d.id, parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-[10px] text-gray-400 w-8 text-right">
                        {Math.round((layerOpacity[d.id] ?? 1) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
                {dreamLayerActive && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-600" />
                      <span className="text-xs font-medium text-gray-700">DREAM Platform</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
