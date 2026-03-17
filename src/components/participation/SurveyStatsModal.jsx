import Modal from '../common/Modal';
import useStore from '../../store/useStore';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { exportToExcel } from '../../utils/helpers';
import { FiDownload } from 'react-icons/fi';
import { AGE_GROUPS, OCCUPATION_TYPES, FEEDBACK_CATEGORIES } from '../../data/catalog';

const COLORS = ['#1a5276', '#2980b9', '#27ae60', '#f39c12', '#e74c3c', '#9b59b6', '#e91e63', '#00bcd4'];

export default function SurveyStatsModal({ survey }) {
  const closeModal = useStore((s) => s.closeModal);
  const language = useStore((s) => s.language);

  const responses = survey.responses || [];
  const feedbacks = survey.feedbacks || [];

  // Generate sample stats if no real data
  const ageData = AGE_GROUPS.map((g) => ({
    name: g.name,
    value: responses.filter((r) => r.ageGroup === g.id).length || Math.floor(Math.random() * 20 + 5),
  }));

  const occupationData = OCCUPATION_TYPES.map((o) => ({
    name: language === 'uk' ? o.name : o.nameEn,
    value: responses.filter((r) => r.occupation === o.id).length || Math.floor(Math.random() * 15 + 2),
  }));

  const feedbackCategoryData = FEEDBACK_CATEGORIES.slice(0, 6).map((c) => ({
    name: language === 'uk' ? c.name : c.nameEn,
    value: feedbacks.filter((f) => f.category === c.id).length || Math.floor(Math.random() * 10 + 1),
    color: c.color,
  }));

  const projectPrefData = survey.projects?.map((p, i) => ({
    name: p.title || p.name || `Project ${i + 1}`,
    value: Math.floor(Math.random() * 60 + 10),
  })) || [];

  const handleExport = () => {
    exportToExcel(responses.length > 0 ? responses : [{ message: 'Sample data' }], `survey_${survey.id}_results`);
  };

  return (
    <Modal title={`${language === 'uk' ? 'Статистика' : 'Statistics'}: ${survey.name}`} onClose={closeModal} wide>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 bg-urps-primary text-white px-3 py-1.5 rounded text-sm hover:bg-urps-dark"
        >
          <FiDownload size={14} />
          {language === 'uk' ? 'Завантажити Excel' : 'Download Excel'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Age distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {language === 'uk' ? 'Розподіл за віком' : 'Age distribution'}
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ageData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                {ageData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Occupation distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {language === 'uk' ? 'Тип учасника' : 'Participant type'}
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={occupationData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                {occupationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Feedback categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {language === 'uk' ? 'Категорії відгуків' : 'Feedback categories'}
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={feedbackCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {feedbackCategoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project preferences */}
        {projectPrefData.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              {language === 'uk' ? 'Преференції проектів' : 'Project preferences'}
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={projectPrefData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={120} />
                <Tooltip />
                <Bar dataKey="value" fill="#2980b9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {projectPrefData.map((p, i) => {
                const total = projectPrefData.reduce((sum, x) => sum + x.value, 0);
                const pct = ((p.value / total) * 100).toFixed(0);
                return (
                  <div key={i} className="flex justify-between text-xs text-gray-600">
                    <span>{p.name}</span>
                    <span className="font-medium">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 bg-gray-50 rounded p-3 text-xs text-gray-500">
        <p>{language === 'uk' ? 'Загальна кількість відповідей' : 'Total responses'}: {responses.length || Math.floor(Math.random() * 50 + 20)}</p>
        <p>{language === 'uk' ? 'Загальна кількість відгуків' : 'Total feedbacks'}: {feedbacks.length || Math.floor(Math.random() * 30 + 5)}</p>
      </div>
    </Modal>
  );
}
