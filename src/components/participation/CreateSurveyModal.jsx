import { useState } from 'react';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';

export default function CreateSurveyModal() {
  const closeModal = useStore((s) => s.closeModal);
  const addSurvey = useStore((s) => s.addSurvey);
  const addNotification = useStore((s) => s.addNotification);
  const datasetData = useStore((s) => s.datasetData);
  const language = useStore((s) => s.language);

  const [step, setStep] = useState(1);
  const [survey, setSurvey] = useState({
    name: '',
    description: '',
    type: 'feedback',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    projects: [],
    demographicQuestions: true,
    acceptingFeedback: true,
    coverageArea: null,
  });

  const [newProject, setNewProject] = useState({ title: '', description: '', status: 'Плановий', estimatedBeneficiaries: 0, latitude: '', longitude: '' });

  const existingProjects = datasetData['implementation-projects'] || [];

  const updateField = (key, value) => setSurvey((prev) => ({ ...prev, [key]: value }));

  const addProject = () => {
    if (newProject.title) {
      setSurvey((prev) => ({
        ...prev,
        projects: [...prev.projects, { ...newProject, id: Date.now().toString() }],
      }));
      setNewProject({ title: '', description: '', status: 'Плановий', estimatedBeneficiaries: 0, latitude: '', longitude: '' });
    }
  };

  const addExistingProject = (project) => {
    if (!survey.projects.find((p) => p.id === project.id)) {
      setSurvey((prev) => ({
        ...prev,
        projects: [...prev.projects, project],
      }));
    }
  };

  const handleSubmit = () => {
    if (!survey.name || !survey.endDate) {
      addNotification({ type: 'error', title: language === 'uk' ? 'Заповніть обов\'язкові поля' : 'Fill required fields' });
      return;
    }
    addSurvey(survey);
    addNotification({ type: 'success', title: language === 'uk' ? 'Опитування створено' : 'Survey created' });
    closeModal();
  };

  return (
    <Modal title={language === 'uk' ? 'Створити опитування' : 'Create Survey'} onClose={closeModal}>
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
              step >= s ? 'bg-urps-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
            {s < 4 && <div className={`w-8 h-0.5 ${step > s ? 'bg-urps-primary' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic info */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {language === 'uk' ? 'Назва опитування' : 'Survey name'} *
            </label>
            <input
              type="text"
              value={survey.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-urps-secondary"
              placeholder={language === 'uk' ? 'Введіть назву...' : 'Enter name...'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {language === 'uk' ? 'Опис' : 'Description'}
            </label>
            <textarea
              value={survey.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-urps-secondary h-20 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {language === 'uk' ? 'Дата початку' : 'Start date'}
              </label>
              <input
                type="date"
                value={survey.startDate}
                onChange={(e) => updateField('startDate', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {language === 'uk' ? 'Дата завершення' : 'End date'} *
              </label>
              <input
                type="date"
                value={survey.endDate}
                onChange={(e) => updateField('endDate', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Survey type */}
      {step === 2 && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {language === 'uk' ? 'Тип опитування' : 'Survey type'}
          </label>
          {[
            { id: 'feedback', label: language === 'uk' ? 'Збір відгуків' : 'Feedback Collection', desc: language === 'uk' ? 'Збирайте коментарі та пропозиції від мешканців' : 'Collect comments and suggestions from residents' },
            { id: 'location', label: language === 'uk' ? 'Пріоритизація локацій' : 'Location Prioritization', desc: language === 'uk' ? 'Консультація щодо переваг місця для проекту' : 'Consult on preferred location for a project' },
            { id: 'project-type', label: language === 'uk' ? 'Пріоритизація типів проектів' : 'Project Type Prioritization', desc: language === 'uk' ? 'Консультація щодо переваг типу проекту' : 'Consult on preferred type of project' },
          ].map((t) => (
            <label
              key={t.id}
              className={`block p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                survey.type === t.id ? 'border-urps-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="surveyType"
                  checked={survey.type === t.id}
                  onChange={() => updateField('type', t.id)}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">{t.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </div>
              </div>
            </label>
          ))}

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={survey.demographicQuestions}
              onChange={(e) => updateField('demographicQuestions', e.target.checked)}
            />
            <span className="text-sm text-gray-600">
              {language === 'uk' ? 'Включити демографічні запитання' : 'Include demographic questions'}
            </span>
          </label>
        </div>
      )}

      {/* Step 3: Projects */}
      {step === 3 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">
            {language === 'uk' ? 'Проекти для опитування' : 'Survey projects'}
          </h4>

          {/* Selected projects */}
          {survey.projects.length > 0 && (
            <div className="space-y-2">
              {survey.projects.map((p, i) => (
                <div key={p.id || i} className="bg-gray-50 rounded p-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{p.title || p.name}</p>
                    <p className="text-xs text-gray-500">{p.status}</p>
                  </div>
                  <button
                    onClick={() => setSurvey((prev) => ({ ...prev, projects: prev.projects.filter((_, j) => j !== i) }))}
                    className="text-red-500 text-xs"
                  >
                    {language === 'uk' ? 'Видалити' : 'Remove'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add from existing */}
          {existingProjects.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                {language === 'uk' ? 'Обрати з існуючих:' : 'Select from existing:'}
              </p>
              <div className="max-h-32 overflow-y-auto border rounded p-1 space-y-1">
                {existingProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addExistingProject(p)}
                    className="w-full text-left px-2 py-1 text-xs hover:bg-blue-50 rounded"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Create new project */}
          <div className="border rounded-lg p-3 space-y-2">
            <p className="text-xs font-medium text-gray-500">
              {language === 'uk' ? 'Або створити новий:' : 'Or create new:'}
            </p>
            <input
              type="text"
              placeholder={language === 'uk' ? 'Назва проекту' : 'Project title'}
              value={newProject.title}
              onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="text"
              placeholder={language === 'uk' ? 'Опис' : 'Description'}
              value={newProject.description}
              onChange={(e) => setNewProject((p) => ({ ...p, description: e.target.value }))}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={language === 'uk' ? 'Широта' : 'Latitude'}
                value={newProject.latitude}
                onChange={(e) => setNewProject((p) => ({ ...p, latitude: e.target.value }))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <input
                type="number"
                placeholder={language === 'uk' ? 'Довгота' : 'Longitude'}
                value={newProject.longitude}
                onChange={(e) => setNewProject((p) => ({ ...p, longitude: e.target.value }))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
            <button
              onClick={addProject}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 rounded text-sm"
            >
              + {language === 'uk' ? 'Додати проект' : 'Add project'}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">
            {language === 'uk' ? 'Підтвердження' : 'Confirmation'}
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{language === 'uk' ? 'Назва' : 'Name'}</span>
              <span className="font-medium">{survey.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{language === 'uk' ? 'Тип' : 'Type'}</span>
              <span className="font-medium">{survey.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{language === 'uk' ? 'Період' : 'Period'}</span>
              <span className="font-medium">{survey.startDate} — {survey.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{language === 'uk' ? 'Проектів' : 'Projects'}</span>
              <span className="font-medium">{survey.projects.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
          >
            {language === 'uk' ? 'Назад' : 'Back'}
          </button>
        )}
        <div className="flex-1" />
        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-urps-primary text-white rounded text-sm hover:bg-urps-dark"
          >
            {language === 'uk' ? 'Далі' : 'Next'}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-urps-success text-white rounded text-sm hover:bg-green-600"
          >
            {language === 'uk' ? 'Створити опитування' : 'Create Survey'}
          </button>
        )}
      </div>
    </Modal>
  );
}
