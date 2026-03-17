import { useMemo } from 'react';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#1a5276', '#2980b9', '#27ae60', '#f39c12', '#e74c3c', '#9b59b6', '#e91e63', '#00bcd4', '#ff9800', '#607d8b'];

export default function ChartModal({ dataset }) {
  const closeModal = useStore((s) => s.closeModal);
  const datasetData = useStore((s) => s.datasetData);
  const language = useStore((s) => s.language);

  const data = datasetData[dataset.id] || [];

  const categoricalField = useMemo(() => {
    if (data.length === 0) return null;
    const fields = Object.keys(data[0]).filter((k) => !['id', 'geometry', 'latitude', 'longitude', 'name', 'description'].includes(k));
    return fields.find((f) => {
      const values = data.map((d) => d[f]).filter(Boolean);
      const unique = new Set(values);
      return unique.size > 1 && unique.size <= 10 && typeof values[0] === 'string';
    }) || fields[0];
  }, [data]);

  const chartData = useMemo(() => {
    if (!categoricalField || data.length === 0) return [];
    const counts = {};
    data.forEach((item) => {
      const val = String(item[categoricalField] || 'N/A');
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data, categoricalField]);

  return (
    <Modal title={`${language === 'uk' ? 'Діаграма' : 'Chart'}: ${language === 'uk' ? dataset.name : dataset.nameEn}`} onClose={closeModal} wide>
      {chartData.length === 0 ? (
        <p className="text-center text-gray-400 py-8">{language === 'uk' ? 'Немає даних для візуалізації' : 'No data to visualize'}</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              {language === 'uk' ? 'Розподіл за' : 'Distribution by'}: {categoricalField}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1a5276" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              {language === 'uk' ? 'Частка' : 'Share'}: {categoricalField}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <div className="mt-4 text-xs text-gray-400">
        {data.length} {language === 'uk' ? 'записів аналізовано' : 'records analyzed'}
      </div>
    </Modal>
  );
}
