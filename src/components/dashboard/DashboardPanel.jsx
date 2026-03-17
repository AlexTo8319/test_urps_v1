import useStore from '../../store/useStore';
import { DATASET_CLUSTERS } from '../../data/catalog';

export default function DashboardPanel() {
  const datasetData = useStore((s) => s.datasetData);
  const surveys = useStore((s) => s.surveys);
  const dreamProjects = useStore((s) => s.dreamProjects);
  const dreamLastSync = useStore((s) => s.dreamLastSync);
  const language = useStore((s) => s.language);

  const totalRecords = Object.values(datasetData).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  const activeClusters = DATASET_CLUSTERS.filter((c) => c.datasets.some((d) => (datasetData[d.id]?.length || 0) > 0)).length;
  const totalSurveys = surveys.length;
  const totalResponses = surveys.reduce((sum, s) => sum + (s.responses?.length || 0), 0);

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-white text-sm">
        {language === 'uk' ? 'Панель керування' : 'Management Dashboard'}
      </h3>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label={language === 'uk' ? 'Записів' : 'Records'}
          value={totalRecords}
          color="bg-blue-500"
        />
        <StatCard
          label={language === 'uk' ? 'Кластерів' : 'Clusters'}
          value={activeClusters}
          color="bg-green-500"
        />
        <StatCard
          label={language === 'uk' ? 'Опитувань' : 'Surveys'}
          value={totalSurveys}
          color="bg-yellow-500"
        />
        <StatCard
          label={language === 'uk' ? 'Відповідей' : 'Responses'}
          value={totalResponses}
          color="bg-purple-500"
        />
      </div>

      {/* Data quality overview */}
      <div className="bg-blue-900/50 rounded-lg p-3">
        <h4 className="text-xs font-semibold text-blue-200 mb-2">
          {language === 'uk' ? 'Якість даних (FAIR)' : 'Data Quality (FAIR)'}
        </h4>
        <div className="space-y-2">
          {[
            { label: 'Findable', labelUk: 'Знайденність', pct: 85 },
            { label: 'Accessible', labelUk: 'Доступність', pct: 90 },
            { label: 'Interoperable', labelUk: 'Сумісність', pct: 75 },
            { label: 'Reusable', labelUk: 'Повторне використання', pct: 70 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[10px] text-blue-300 mb-0.5">
                <span>{language === 'uk' ? item.labelUk : item.label}</span>
                <span>{item.pct}%</span>
              </div>
              <div className="h-1.5 bg-blue-900 rounded">
                <div className="h-full bg-urps-accent rounded" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DREAM status */}
      <div className="bg-blue-900/50 rounded-lg p-3">
        <h4 className="text-xs font-semibold text-blue-200 mb-2">DREAM Platform</h4>
        <div className="space-y-1 text-[10px] text-blue-300">
          <p>{language === 'uk' ? 'Проектів' : 'Projects'}: {dreamProjects.length}</p>
          <p>
            {language === 'uk' ? 'Остання синхронізація' : 'Last sync'}:{' '}
            {dreamLastSync ? new Date(dreamLastSync).toLocaleString('uk-UA') : (language === 'uk' ? 'Не виконано' : 'Not performed')}
          </p>
        </div>
      </div>

      {/* Data collection workflow */}
      <div className="bg-blue-900/50 rounded-lg p-3">
        <h4 className="text-xs font-semibold text-blue-200 mb-2">
          {language === 'uk' ? 'Робочий процес збору даних' : 'Data Collection Workflow'}
        </h4>
        <div className="flex items-center gap-1">
          {[
            { step: 1, label: language === 'uk' ? 'Збір' : 'Collect' },
            { step: 2, label: language === 'uk' ? 'Перевірка' : 'Check' },
            { step: 3, label: language === 'uk' ? 'Підтвердження' : 'Confirm' },
            { step: 4, label: language === 'uk' ? 'Введення' : 'Enter' },
            { step: 5, label: language === 'uk' ? 'Огляд' : 'Review' },
          ].map((s, i) => (
            <div key={s.step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-urps-accent text-urps-dark flex items-center justify-center text-[10px] font-bold">
                  {s.step}
                </div>
                <span className="text-[8px] text-blue-300 mt-0.5 text-center leading-tight">{s.label}</span>
              </div>
              {i < 4 && <div className="w-3 h-0.5 bg-blue-600 mx-0.5 mb-3" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-blue-900/50 rounded-lg p-3">
      <div className={`w-8 h-1 ${color} rounded mb-2`} />
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] text-blue-300">{label}</p>
    </div>
  );
}
