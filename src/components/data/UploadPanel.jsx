import { useState, useRef } from 'react';
import { FiUpload, FiDownload, FiFile } from 'react-icons/fi';
import useStore from '../../store/useStore';
import { DATASET_CLUSTERS } from '../../data/catalog';
import { parseUploadedFile, generateTemplate } from '../../utils/helpers';

export default function UploadPanel() {
  const [selectedCluster, setSelectedCluster] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileRef = useRef();
  const addNotification = useStore((s) => s.addNotification);
  const setDatasetData = useStore((s) => s.setDatasetData);
  const datasetData = useStore((s) => s.datasetData);
  const language = useStore((s) => s.language);

  const cluster = DATASET_CLUSTERS.find((c) => c.id === selectedCluster);
  const datasets = cluster?.datasets || [];
  const dataset = datasets.find((d) => d.id === selectedDataset);

  const handleFile = async (file) => {
    if (!selectedDataset) {
      addNotification({ type: 'error', title: language === 'uk' ? 'Оберіть набір даних' : 'Select a dataset' });
      return;
    }
    try {
      setUploadStatus('loading');
      const data = await parseUploadedFile(file);
      const existing = datasetData[selectedDataset] || [];
      setDatasetData(selectedDataset, [...existing, ...data.map((d, i) => ({ ...d, id: `upload-${Date.now()}-${i}` }))]);
      setUploadStatus('success');
      addNotification({
        type: 'success',
        title: language === 'uk' ? 'Дані завантажено' : 'Data uploaded',
        message: `${data.length} ${language === 'uk' ? 'записів додано' : 'records added'}`,
      });
    } catch (err) {
      setUploadStatus('error');
      addNotification({
        type: 'error',
        title: language === 'uk' ? 'Помилка завантаження' : 'Upload error',
        message: err.message,
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-white text-sm">
        {language === 'uk' ? 'Завантажити дані' : 'Upload Data'}
      </h3>

      {/* Cluster selection */}
      <div>
        <label className="block text-xs text-blue-300 mb-1">
          {language === 'uk' ? 'Кластер' : 'Cluster'}
        </label>
        <select
          value={selectedCluster}
          onChange={(e) => { setSelectedCluster(e.target.value); setSelectedDataset(''); }}
          className="w-full bg-blue-900 border border-blue-700 rounded px-2 py-1.5 text-sm text-white"
        >
          <option value="">{language === 'uk' ? 'Оберіть кластер...' : 'Select cluster...'}</option>
          {DATASET_CLUSTERS.map((c) => (
            <option key={c.id} value={c.id}>{language === 'uk' ? c.name : c.nameEn}</option>
          ))}
        </select>
      </div>

      {/* Dataset selection */}
      {selectedCluster && (
        <div>
          <label className="block text-xs text-blue-300 mb-1">
            {language === 'uk' ? 'Набір даних' : 'Dataset'}
          </label>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="w-full bg-blue-900 border border-blue-700 rounded px-2 py-1.5 text-sm text-white"
          >
            <option value="">{language === 'uk' ? 'Оберіть набір...' : 'Select dataset...'}</option>
            {datasets.map((d) => (
              <option key={d.id} value={d.id}>{language === 'uk' ? d.name : d.nameEn}</option>
            ))}
          </select>
        </div>
      )}

      {/* Template download */}
      {selectedDataset && (
        <button
          onClick={() => generateTemplate(selectedDataset)}
          className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-white py-2 rounded text-sm"
        >
          <FiDownload size={14} />
          {language === 'uk' ? 'Завантажити шаблон Excel' : 'Download Excel Template'}
        </button>
      )}

      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver ? 'border-urps-accent bg-blue-800/50' : 'border-blue-600'
        }`}
      >
        <FiUpload className="mx-auto mb-2 text-blue-300" size={24} />
        <p className="text-sm text-blue-200 mb-2">
          {language === 'uk' ? 'Перетягніть файл сюди або' : 'Drag and drop file here or'}
        </p>
        <button
          onClick={() => fileRef.current?.click()}
          className="bg-urps-accent text-urps-dark px-4 py-1.5 rounded text-sm font-medium hover:bg-yellow-400"
        >
          {language === 'uk' ? 'Обрати файл' : 'Choose file'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls,.json,.geojson,.zip"
          onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); }}
          className="hidden"
        />
        <p className="text-[10px] text-blue-400 mt-2">
          CSV, XLSX, GeoJSON, Shapefile (.zip)
        </p>
      </div>

      {/* Upload status */}
      {uploadStatus === 'success' && (
        <div className="bg-green-900/30 text-green-300 rounded p-2 text-xs text-center">
          {language === 'uk' ? 'Дані успішно завантажено!' : 'Data uploaded successfully!'}
        </div>
      )}
      {uploadStatus === 'error' && (
        <div className="bg-red-900/30 text-red-300 rounded p-2 text-xs text-center">
          {language === 'uk' ? 'Помилка формату. Перевірте файл.' : 'Format error. Check the file.'}
        </div>
      )}

      {/* Supported formats */}
      <div className="bg-blue-900/50 rounded p-3 space-y-1">
        <p className="text-[10px] text-blue-300 font-medium">
          {language === 'uk' ? 'Підтримувані формати:' : 'Supported formats:'}
        </p>
        <p className="text-[10px] text-blue-200">CSV/XLSX — {language === 'uk' ? 'для точкових даних' : 'for point data'}</p>
        <p className="text-[10px] text-blue-200">GeoJSON/SHP — {language === 'uk' ? 'для просторових даних' : 'for spatial data'}</p>
      </div>
    </div>
  );
}
