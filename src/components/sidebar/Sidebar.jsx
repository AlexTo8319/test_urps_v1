import { useState } from 'react';
import {
  FiDatabase, FiUpload, FiMap, FiBarChart2, FiSettings, FiLogOut,
  FiMessageSquare, FiLayers, FiDownload, FiChevronLeft, FiChevronRight,
  FiGrid, FiTarget
} from 'react-icons/fi';
import useStore from '../../store/useStore';
import DatasetPanel from './DatasetPanel';
import ParticipationPanel from '../participation/ParticipationPanel';
import UploadPanel from '../data/UploadPanel';
import DashboardPanel from '../dashboard/DashboardPanel';
import AccessibilityPanel from './AccessibilityPanel';
import { HROMADAS } from '../../data/catalog';

const MENU_ITEMS = [
  { id: 'datasets', icon: FiDatabase, label: 'Набори даних', labelEn: 'Datasets' },
  { id: 'upload', icon: FiUpload, label: 'Завантажити дані', labelEn: 'Upload Data' },
  { id: 'territory', icon: FiTarget, label: 'Вибір території', labelEn: 'Territory Selection' },
  { id: 'accessibility', icon: FiMap, label: 'Аналіз доступності', labelEn: 'Accessibility Analysis' },
  { id: 'modeling', icon: FiGrid, label: 'Моделювання', labelEn: 'Modeling' },
  { id: 'participation', icon: FiMessageSquare, label: 'Участь', labelEn: 'Participation' },
  { id: 'dashboard', icon: FiBarChart2, label: 'Панель керування', labelEn: 'Dashboard' },
  { id: 'download', icon: FiDownload, label: 'Завантаження даних', labelEn: 'Data Download' },
  { id: 'settings', icon: FiSettings, label: 'Налаштування', labelEn: 'Settings' },
];

export default function Sidebar() {
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const sidebarSection = useStore((s) => s.sidebarSection);
  const setSidebarSection = useStore((s) => s.setSidebarSection);
  const currentHromada = useStore((s) => s.currentHromada);
  const setCurrentHromada = useStore((s) => s.setCurrentHromada);
  const setMapCenter = useStore((s) => s.setMapCenter);
  const setMapZoom = useStore((s) => s.setMapZoom);
  const language = useStore((s) => s.language);

  const handleHromadaChange = (e) => {
    const h = HROMADAS.find((h) => h.id === e.target.value);
    if (h) {
      setCurrentHromada(h);
      setMapCenter(h.center);
      setMapZoom(h.zoom);
    }
  };

  return (
    <div className={`h-full flex flex-col bg-urps-sidebar text-white transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-12'} relative z-10`}>
      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 -translate-y-1/2 bg-urps-sidebar text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md z-20 hover:bg-urps-sidebar-hover"
      >
        {sidebarOpen ? <FiChevronLeft size={14} /> : <FiChevronRight size={14} />}
      </button>

      {sidebarOpen ? (
        <>
          {/* Menu items */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <nav className="py-2 border-b border-blue-800">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSidebarSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-urps-sidebar-hover transition-colors ${
                    sidebarSection === item.id ? 'bg-urps-sidebar-hover border-l-3 border-urps-accent' : ''
                  }`}
                >
                  <item.icon size={18} />
                  <span>{language === 'uk' ? item.label : item.labelEn}</span>
                </button>
              ))}
            </nav>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto">
              {sidebarSection === 'datasets' && <DatasetPanel />}
              {sidebarSection === 'participation' && <ParticipationPanel />}
              {sidebarSection === 'upload' && <UploadPanel />}
              {sidebarSection === 'dashboard' && <DashboardPanel />}
              {sidebarSection === 'accessibility' && <AccessibilityPanel />}
              {sidebarSection === 'modeling' && (
                <div className="p-4 text-sm text-blue-200">
                  <h3 className="font-semibold text-white mb-2">
                    {language === 'uk' ? 'Моделювання сценаріїв' : 'Scenario Modeling'}
                  </h3>
                  <p>{language === 'uk' ? 'Модуль сценарного моделювання для планування відновлення.' : 'Scenario modeling module for recovery planning.'}</p>
                </div>
              )}
              {sidebarSection === 'territory' && (
                <div className="p-4 text-sm text-blue-200">
                  <h3 className="font-semibold text-white mb-2">
                    {language === 'uk' ? 'Вибір території' : 'Territory Selection'}
                  </h3>
                  <p>{language === 'uk' ? 'Натисніть на карті, щоб визначити територію для аналізу.' : 'Click on the map to define a territory for analysis.'}</p>
                </div>
              )}
              {sidebarSection === 'download' && (
                <div className="p-4 text-sm text-blue-200">
                  <h3 className="font-semibold text-white mb-2">
                    {language === 'uk' ? 'Завантаження даних' : 'Data Download'}
                  </h3>
                  <p>{language === 'uk' ? 'Оберіть набір даних зі списку для завантаження.' : 'Select a dataset to download.'}</p>
                </div>
              )}
              {sidebarSection === 'settings' && (
                <div className="p-4 text-sm text-blue-200">
                  <h3 className="font-semibold text-white mb-2">
                    {language === 'uk' ? 'Налаштування' : 'Settings'}
                  </h3>
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-xs text-blue-300">{language === 'uk' ? 'Мова' : 'Language'}</span>
                      <select
                        value={language}
                        onChange={(e) => useStore.getState().setLanguage(e.target.value)}
                        className="w-full mt-1 bg-blue-900 border border-blue-700 rounded px-2 py-1.5 text-sm text-white"
                      >
                        <option value="uk">Українська</option>
                        <option value="en">English</option>
                      </select>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hromada selector */}
          <div className="border-t border-blue-800 p-3">
            <select
              value={currentHromada.id}
              onChange={handleHromadaChange}
              className="w-full bg-blue-900 border border-blue-700 rounded px-2 py-1.5 text-sm text-white"
            >
              {HROMADAS.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>

          {/* Logout */}
          <button className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-urps-sidebar-hover border-t border-blue-800">
            <FiLogOut size={18} />
            <span>{language === 'uk' ? 'Вихід' : 'Logout'}</span>
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center py-2 gap-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setSidebarSection(item.id); if (!sidebarOpen) toggleSidebar(); }}
              className="p-2 rounded hover:bg-urps-sidebar-hover"
              title={language === 'uk' ? item.label : item.labelEn}
            >
              <item.icon size={18} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
