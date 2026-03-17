import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBarChart2, FiDownload, FiToggleLeft, FiToggleRight, FiShare2 } from 'react-icons/fi';
import useStore from '../../store/useStore';

export default function ParticipationPanel() {
  const surveys = useStore((s) => s.surveys);
  const openModal = useStore((s) => s.openModal);
  const deleteSurvey = useStore((s) => s.deleteSurvey);
  const updateSurvey = useStore((s) => s.updateSurvey);
  const addNotification = useStore((s) => s.addNotification);
  const language = useStore((s) => s.language);

  const handleDelete = (surveyId) => {
    if (window.confirm(language === 'uk' ? 'Видалити опитування?' : 'Delete survey?')) {
      deleteSurvey(surveyId);
      addNotification({ type: 'success', title: language === 'uk' ? 'Опитування видалено' : 'Survey deleted' });
    }
  };

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm">
          {language === 'uk' ? 'Участь громади' : 'Community Participation'}
        </h3>
        <button
          onClick={() => openModal('createSurvey')}
          className="flex items-center gap-1 bg-urps-accent text-urps-dark px-3 py-1 rounded text-xs font-medium hover:bg-yellow-400"
        >
          <FiPlus size={14} />
          {language === 'uk' ? 'Створити' : 'Create'}
        </button>
      </div>

      <p className="text-xs text-blue-200">
        {language === 'uk'
          ? 'Збирайте геореференційні відгуки, консультації щодо пріоритетів проектів.'
          : 'Collect georeferenced feedback, consultations on project priorities.'}
      </p>

      {/* Survey types info */}
      <div className="bg-blue-900/50 rounded p-2 space-y-1">
        <p className="text-[10px] text-blue-300 font-medium">{language === 'uk' ? 'Типи опитувань:' : 'Survey types:'}</p>
        <p className="text-[10px] text-blue-200">1. {language === 'uk' ? 'Збір відгуків' : 'Feedback Collection'}</p>
        <p className="text-[10px] text-blue-200">2. {language === 'uk' ? 'Пріоритизація локацій' : 'Location Prioritization'}</p>
        <p className="text-[10px] text-blue-200">3. {language === 'uk' ? 'Пріоритизація типів проектів' : 'Project Type Prioritization'}</p>
      </div>

      {/* Surveys list */}
      {surveys.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-blue-300">{language === 'uk' ? 'Опитувань поки немає' : 'No surveys yet'}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {surveys.map((survey) => (
            <div key={survey.id} className="bg-blue-900/50 rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">{survey.name}</h4>
                  <p className="text-[10px] text-blue-300 mt-0.5">
                    {survey.type === 'location' ? (language === 'uk' ? 'Пріоритизація локацій' : 'Location Priority') :
                     survey.type === 'project-type' ? (language === 'uk' ? 'Пріоритизація проектів' : 'Project Type Priority') :
                     (language === 'uk' ? 'Збір відгуків' : 'Feedback Collection')}
                  </p>
                </div>
                <button
                  onClick={() => updateSurvey(survey.id, { acceptingFeedback: !survey.acceptingFeedback })}
                  className="text-blue-300 hover:text-white"
                  title={survey.acceptingFeedback ? 'Disable' : 'Enable'}
                >
                  {survey.acceptingFeedback ? <FiToggleRight size={20} className="text-green-400" /> : <FiToggleLeft size={20} />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-blue-300">
                <span>{survey.startDate} — {survey.endDate}</span>
                <span>|</span>
                <span>{(survey.responses?.length || 0)} {language === 'uk' ? 'відповідей' : 'responses'}</span>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => openModal('surveyShare', survey)}
                  className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded text-[10px]"
                >
                  <FiShare2 size={10} /> {language === 'uk' ? 'Поділитися' : 'Share'}
                </button>
                <button
                  onClick={() => openModal('surveyStats', survey)}
                  className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded text-[10px]"
                >
                  <FiBarChart2 size={10} /> {language === 'uk' ? 'Статистика' : 'Statistics'}
                </button>
                <button
                  onClick={() => openModal('editSurvey', survey)}
                  className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded text-[10px]"
                >
                  <FiEdit2 size={10} />
                </button>
                <button
                  onClick={() => handleDelete(survey.id)}
                  className="flex items-center gap-1 bg-red-900/50 hover:bg-red-800 px-2 py-1 rounded text-[10px] text-red-300"
                >
                  <FiTrash2 size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
