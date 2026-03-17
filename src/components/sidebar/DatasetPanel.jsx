import { useState } from 'react';
import { FiChevronDown, FiChevronRight, FiMoreVertical, FiSearch, FiCircle } from 'react-icons/fi';
import useStore from '../../store/useStore';
import { DATASET_CLUSTERS } from '../../data/catalog';

export default function DatasetPanel() {
  const [expandedClusters, setExpandedClusters] = useState({});
  const [contextMenu, setContextMenu] = useState(null);
  const activeLayers = useStore((s) => s.activeLayers);
  const toggleLayer = useStore((s) => s.toggleLayer);
  const searchQuery = useStore((s) => s.searchQuery);
  const setSearchQuery = useStore((s) => s.setSearchQuery);
  const openModal = useStore((s) => s.openModal);
  const language = useStore((s) => s.language);

  const toggleCluster = (clusterId) => {
    setExpandedClusters((prev) => ({ ...prev, [clusterId]: !prev[clusterId] }));
  };

  const handleContextMenu = (e, dataset) => {
    e.stopPropagation();
    setContextMenu(contextMenu?.id === dataset.id ? null : dataset);
  };

  const filteredClusters = DATASET_CLUSTERS.map((cluster) => ({
    ...cluster,
    datasets: cluster.datasets.filter((d) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.nameEn.toLowerCase().includes(q);
    }),
  })).filter((c) => c.datasets.length > 0);

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-blue-800">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={14} />
          <input
            type="text"
            placeholder={language === 'uk' ? 'Пошук наборів даних...' : 'Search datasets...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-blue-900 border border-blue-700 rounded pl-9 pr-3 py-1.5 text-sm text-white placeholder-blue-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Clusters */}
      <div className="flex-1 overflow-y-auto">
        {filteredClusters.map((cluster) => (
          <div key={cluster.id}>
            <button
              onClick={() => toggleCluster(cluster.id)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-urps-sidebar-hover"
            >
              {expandedClusters[cluster.id] ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
              <span>{language === 'uk' ? cluster.name : cluster.nameEn}</span>
              <span className="ml-auto text-xs text-blue-400">{cluster.datasets.length}</span>
            </button>

            {expandedClusters[cluster.id] && (
              <div className="ml-4">
                {cluster.datasets.map((dataset) => (
                  <div key={dataset.id} className="relative">
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-urps-sidebar-hover group">
                      <input
                        type="checkbox"
                        checked={!!activeLayers[dataset.id]}
                        onChange={() => toggleLayer(dataset.id)}
                        className="rounded border-blue-600"
                      />
                      <FiCircle size={8} style={{ color: dataset.color, fill: dataset.color }} />
                      <span className="flex-1 text-blue-100 text-xs truncate">
                        {language === 'uk' ? dataset.name : dataset.nameEn}
                      </span>
                      <button
                        onClick={(e) => handleContextMenu(e, dataset)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-700 rounded"
                      >
                        <FiMoreVertical size={14} />
                      </button>
                    </div>

                    {/* Context menu */}
                    {contextMenu?.id === dataset.id && (
                      <div className="absolute right-2 top-8 bg-white text-gray-800 rounded-lg shadow-xl z-50 py-1 min-w-[180px]">
                        <button
                          onClick={() => { openModal('properties', dataset); setContextMenu(null); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {language === 'uk' ? 'Властивості' : 'Properties'}
                        </button>
                        <button
                          onClick={() => { openModal('table', dataset); setContextMenu(null); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {language === 'uk' ? 'Переглянути як таблицю' : 'View as Table'}
                        </button>
                        <button
                          onClick={() => { openModal('chart', dataset); setContextMenu(null); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {language === 'uk' ? 'Переглянути як діаграму' : 'View as Chart'}
                        </button>
                        <button
                          onClick={() => { setContextMenu(null); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {language === 'uk' ? 'Перевірити оновлення' : 'Check for updates'}
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => { toggleLayer(dataset.id); setContextMenu(null); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                        >
                          {language === 'uk' ? 'Видалити' : 'Remove'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Open Data section */}
        <div className="border-t border-blue-800 mt-2 pt-2">
          <OpenDataSection />
        </div>
      </div>
    </div>
  );
}

function OpenDataSection() {
  const [expanded, setExpanded] = useState(false);
  const dreamLayerActive = useStore((s) => s.dreamLayerActive);
  const toggleDreamLayer = useStore((s) => s.toggleDreamLayer);
  const syncDreamData = useStore((s) => s.syncDreamData);
  const addNotification = useStore((s) => s.addNotification);
  const language = useStore((s) => s.language);

  const handleSync = () => {
    const result = syncDreamData();
    addNotification({
      type: result.success ? 'success' : 'error',
      title: result.success
        ? (language === 'uk' ? 'Дані синхронізовано' : 'Data synced')
        : (language === 'uk' ? 'Помилка синхронізації' : 'Sync failed'),
      message: result.success
        ? `${result.count} ${language === 'uk' ? 'проектів оновлено' : 'projects updated'}`
        : undefined,
    });
  };

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-urps-sidebar-hover text-urps-accent"
      >
        {expanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
        <span>{language === 'uk' ? 'Відкриті дані' : 'Open Data'}</span>
      </button>
      {expanded && (
        <div className="ml-4 space-y-1">
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm">
            <input
              type="checkbox"
              checked={dreamLayerActive}
              onChange={toggleDreamLayer}
              className="rounded border-blue-600"
            />
            <span className="text-blue-100 text-xs">DREAM Platform</span>
            <button
              onClick={handleSync}
              className="ml-auto text-xs text-urps-accent hover:text-yellow-300"
            >
              {language === 'uk' ? 'Оновити' : 'Sync'}
            </button>
          </div>
          <button className="w-full text-left px-3 py-1.5 text-xs text-blue-300 hover:bg-urps-sidebar-hover">
            + {language === 'uk' ? 'Додати групу' : 'Add group'}
          </button>
        </div>
      )}
    </div>
  );
}
