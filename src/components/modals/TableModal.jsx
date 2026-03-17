import { useState, useMemo } from 'react';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';
import { exportToExcel } from '../../utils/helpers';
import { FiDownload, FiArrowUp, FiArrowDown } from 'react-icons/fi';

export default function TableModal({ dataset }) {
  const closeModal = useStore((s) => s.closeModal);
  const datasetData = useStore((s) => s.datasetData);
  const language = useStore((s) => s.language);
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [filterText, setFilterText] = useState('');

  const data = datasetData[dataset.id] || [];
  const fields = data.length > 0
    ? Object.keys(data[0]).filter((k) => k !== 'id' && k !== 'geometry')
    : [];

  const sortedData = useMemo(() => {
    let filtered = data;
    if (filterText) {
      const q = filterText.toLowerCase();
      filtered = data.filter((row) =>
        Object.values(row).some((v) => String(v).toLowerCase().includes(q))
      );
    }
    if (!sortField) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortField] ?? '';
      const vb = b[sortField] ?? '';
      const cmp = String(va).localeCompare(String(vb), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortField, sortDir, filterText]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const handleExport = () => {
    const cleanData = data.map(({ geometry, id, ...rest }) => rest);
    exportToExcel(cleanData, `urps_${dataset.id}`);
  };

  return (
    <Modal title={`${language === 'uk' ? 'Таблиця' : 'Table'}: ${language === 'uk' ? dataset.name : dataset.nameEn}`} onClose={closeModal} wide>
      <div className="mb-3 flex items-center justify-between gap-3">
        <input
          type="text"
          placeholder={language === 'uk' ? 'Фільтр...' : 'Filter...'}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-urps-secondary"
        />
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 bg-urps-primary text-white px-3 py-1.5 rounded text-sm hover:bg-urps-dark"
        >
          <FiDownload size={14} />
          <span>{language === 'uk' ? 'Завантажити' : 'Download'}</span>
        </button>
      </div>

      <div className="overflow-x-auto max-h-[60vh]">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-600 border-b">#</th>
              {fields.map((f) => (
                <th
                  key={f}
                  className="px-3 py-2 text-left font-medium text-gray-600 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(f)}
                >
                  <div className="flex items-center gap-1">
                    {f}
                    {sortField === f && (sortDir === 'asc' ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr key={row.id || i} className="hover:bg-blue-50">
                <td className="px-3 py-1.5 border-b text-gray-400">{i + 1}</td>
                {fields.map((f) => (
                  <td key={f} className="px-3 py-1.5 border-b text-gray-700 whitespace-nowrap">
                    {typeof row[f] === 'object' ? JSON.stringify(row[f]) : String(row[f] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td colSpan={fields.length + 1} className="px-3 py-8 text-center text-gray-400">
                  {language === 'uk' ? 'Немає даних' : 'No data'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-xs text-gray-400">
        {sortedData.length} {language === 'uk' ? 'записів' : 'records'}
      </div>
    </Modal>
  );
}
