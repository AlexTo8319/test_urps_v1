import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getSchemaForDataset } from '../data/catalog';

export function exportToExcel(data, filename) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([buf], { type: 'application/octet-stream' }), `${filename}.xlsx`);
}

export function generateTemplate(datasetId) {
  const schema = getSchemaForDataset(datasetId);
  const headers = schema.fields.map((f) => f.name);
  const descriptions = schema.fields.map((f) => `${f.labelEn} (${f.type}${f.required ? ', required' : ''})`);
  const ws = XLSX.utils.aoa_to_sheet([headers, descriptions]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([buf], { type: 'application/octet-stream' }), `urps_template_${datasetId}.xlsx`);
}

export function parseUploadedFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const ext = file.name.split('.').pop().toLowerCase();

    reader.onload = (e) => {
      try {
        if (ext === 'json' || ext === 'geojson') {
          const geojson = JSON.parse(e.target.result);
          const features = geojson.features || [geojson];
          const data = features.map((f) => ({
            ...f.properties,
            geometry: f.geometry,
            latitude: f.geometry?.coordinates?.[1],
            longitude: f.geometry?.coordinates?.[0],
          }));
          resolve(data);
        } else if (ext === 'csv' || ext === 'xlsx' || ext === 'xls') {
          const wb = XLSX.read(e.target.result, { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        } else {
          reject(new Error('Unsupported file format'));
        }
      } catch (err) {
        reject(err);
      }
    };

    if (ext === 'json' || ext === 'geojson') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

export function getMarkerColor(datasetId) {
  const colorMap = {
    'education-institutions': '#3f51b5',
    'health-facilities': '#f44336',
    'transport-stops': '#2980b9',
    'warning-sirens': '#e74c3c',
    'invincibility-points': '#f39c12',
    'heritage-facilities': '#ff9800',
    'water-supply': '#3498db',
    'admin-institutions': '#2c3e50',
    'implementation-projects': '#009688',
    'industrial': '#8e44ad',
    'cultural-leisure': '#e91e63',
    'sports': '#00bcd4',
  };
  return colorMap[datasetId] || '#1a5276';
}

export function formatNumber(num) {
  return new Intl.NumberFormat('uk-UA').format(num);
}

export function truncate(str, len = 50) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '...' : str;
}
