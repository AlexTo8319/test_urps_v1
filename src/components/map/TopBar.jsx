import { FiDownload, FiUser, FiGlobe } from 'react-icons/fi';
import useStore from '../../store/useStore';
import { exportToExcel } from '../../utils/helpers';
import { DATASET_CLUSTERS } from '../../data/catalog';

export default function TopBar() {
  const language = useStore((s) => s.language);
  const setLanguage = useStore((s) => s.setLanguage);
  const datasetData = useStore((s) => s.datasetData);
  const activeLayers = useStore((s) => s.activeLayers);

  const handleExport = () => {
    const allDatasets = DATASET_CLUSTERS.flatMap((c) => c.datasets);
    const activeDatasets = allDatasets.filter((d) => activeLayers[d.id]);

    if (activeDatasets.length === 0) {
      useStore.getState().addNotification({
        type: 'info',
        title: language === 'uk' ? 'Увімкніть шари для експорту' : 'Enable layers to export',
      });
      return;
    }

    activeDatasets.forEach((d) => {
      const data = datasetData[d.id];
      if (data?.length > 0) {
        const cleanData = data.map(({ geometry, ...rest }) => rest);
        exportToExcel(cleanData, `urps_${d.id}`);
      }
    });

    useStore.getState().addNotification({
      type: 'success',
      title: language === 'uk' ? 'Дані експортовано' : 'Data exported',
    });
  };

  return (
    <div className="h-14 bg-urps-primary flex items-center justify-between px-4 z-20 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">U</span>
        </div>
        <div>
          <h1 className="text-white font-semibold text-sm leading-tight">URPS</h1>
          <p className="text-blue-200 text-[10px]">Urban Recovery Planning System</p>
        </div>
      </div>

      {/* Subtitle */}
      <div className="hidden md:block text-center">
        <p className="text-blue-200 text-xs">
          UNITAC — UN-Habitat + HafenCity Universität Hamburg
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-sm transition-colors"
        >
          <FiDownload size={14} />
          <span>{language === 'uk' ? 'Експорт' : 'Export'}</span>
        </button>

        <button
          onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
          className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-1.5 rounded text-sm"
        >
          <FiGlobe size={14} />
          <span>{language === 'uk' ? 'EN' : 'UA'}</span>
        </button>

        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30">
          <FiUser size={16} />
        </button>
      </div>
    </div>
  );
}
