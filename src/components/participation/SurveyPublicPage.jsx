import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../../store/useStore';
import { AGE_GROUPS, OCCUPATION_TYPES, FEEDBACK_CATEGORIES } from '../../data/catalog';

const STEPS = ['consent', 'demographics', 'map'];

export default function SurveyPublicPage({ surveyId }) {
  const surveys = useStore((s) => s.surveys);
  const addSurveyResponse = useStore((s) => s.addSurveyResponse);
  const addSurveyFeedback = useStore((s) => s.addSurveyFeedback);

  const [lang, setLang] = useState('uk');
  const [step, setStep] = useState('consent');
  const [demographics, setDemographics] = useState({ gender: '', ageGroup: '', occupation: '' });
  const [priorities, setPriorities] = useState({});
  const [feedbackPoints, setFeedbackPoints] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const survey = surveys.find((s) => s.id === surveyId || s.code === surveyId);

  if (!survey) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">{lang === 'uk' ? 'Опитування не знайдено' : 'Survey not found'}</p>
      </div>
    );
  }

  if (!survey.acceptingFeedback) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">{lang === 'uk' ? 'Опитування закрито' : 'Survey is closed'}</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center consent-page">
        <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-xl">
          <div className="text-4xl mb-4">&#10003;</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {lang === 'uk' ? 'Дякуємо!' : 'Thank you!'}
          </h2>
          <p className="text-gray-600">
            {lang === 'uk' ? 'Вашу відповідь збережено.' : 'Your response has been saved.'}
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    addSurveyResponse(surveyId, { ...demographics, priorities });
    feedbackPoints.forEach((fp) => addSurveyFeedback(surveyId, fp));
    setSubmitted(true);
  };

  // Consent page
  if (step === 'consent') {
    return (
      <div className="min-h-screen consent-page flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-lg shadow-xl">
          <div className="flex justify-end mb-4">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="uk">Українська</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-urps-primary rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">URPS</h1>
            <p className="text-sm text-gray-500">Urban Recovery Planning System</p>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-3">{survey.name}</h2>
          {survey.description && <p className="text-sm text-gray-600 mb-4">{survey.description}</p>}

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800 mb-2">
              {lang === 'uk' ? 'Захист даних' : 'Data Protection Notice'}
            </h3>
            <p>
              {lang === 'uk'
                ? 'Ваші дані збираються анонімно та будуть використані виключно для планування відновлення громади. Ваша участь є добровільною.'
                : 'Your data is collected anonymously and will be used exclusively for community recovery planning. Your participation is voluntary.'}
            </p>
          </div>

          <button
            onClick={() => setStep(survey.demographicQuestions ? 'demographics' : 'map')}
            className="w-full bg-urps-primary text-white py-3 rounded-lg font-medium hover:bg-urps-dark transition-colors"
          >
            {lang === 'uk' ? 'Я погоджуюсь — Продовжити' : 'I agree — Continue'}
          </button>
        </div>
      </div>
    );
  }

  // Demographics page
  if (step === 'demographics') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-lg shadow-lg w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            {lang === 'uk' ? 'Розкажіть про себе' : 'Tell us about yourself'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {lang === 'uk' ? '(необов\'язково)' : '(optional)'}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {lang === 'uk' ? 'Стать' : 'Gender'}
              </label>
              <select
                value={demographics.gender}
                onChange={(e) => setDemographics((d) => ({ ...d, gender: e.target.value }))}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">{lang === 'uk' ? 'Оберіть...' : 'Select...'}</option>
                <option value="male">{lang === 'uk' ? 'Чоловіча' : 'Male'}</option>
                <option value="female">{lang === 'uk' ? 'Жіноча' : 'Female'}</option>
                <option value="other">{lang === 'uk' ? 'Інше' : 'Other'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {lang === 'uk' ? 'Вікова група' : 'Age group'}
              </label>
              <select
                value={demographics.ageGroup}
                onChange={(e) => setDemographics((d) => ({ ...d, ageGroup: e.target.value }))}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">{lang === 'uk' ? 'Оберіть...' : 'Select...'}</option>
                {AGE_GROUPS.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {lang === 'uk' ? 'Тип діяльності' : 'Occupation type'}
              </label>
              <select
                value={demographics.occupation}
                onChange={(e) => setDemographics((d) => ({ ...d, occupation: e.target.value }))}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">{lang === 'uk' ? 'Оберіть...' : 'Select...'}</option>
                {OCCUPATION_TYPES.map((o) => (
                  <option key={o.id} value={o.id}>{lang === 'uk' ? o.name : o.nameEn}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setStep('map')}
            className="w-full mt-6 bg-urps-primary text-white py-3 rounded-lg font-medium hover:bg-urps-dark"
          >
            {lang === 'uk' ? 'Продовжити до карти' : 'Continue to Map'}
          </button>
        </div>
      </div>
    );
  }

  // Map page
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-urps-primary text-white px-4 py-3 flex items-center justify-between">
        <h2 className="font-semibold text-sm">{survey.name}</h2>
        <button
          onClick={handleSubmit}
          className="bg-urps-accent text-urps-dark px-4 py-1.5 rounded text-sm font-medium hover:bg-yellow-400"
        >
          {lang === 'uk' ? 'Надіслати' : 'Submit'}
        </button>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar for priorities and feedback */}
        <div className="w-80 bg-white border-r overflow-y-auto p-4 space-y-4">
          {/* Project priorities */}
          {(survey.type === 'location' || survey.type === 'project-type') && survey.projects?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {lang === 'uk' ? 'Визначте пріоритети' : 'Set priorities'}
              </h3>
              {survey.projects.map((p, i) => (
                <div key={p.id || i} className="bg-gray-50 rounded p-2 mb-2">
                  <p className="text-sm font-medium">{p.title || p.name}</p>
                  <select
                    value={priorities[p.id || i] || ''}
                    onChange={(e) => setPriorities((prev) => ({ ...prev, [p.id || i]: e.target.value }))}
                    className="w-full mt-1 border rounded px-2 py-1 text-sm"
                  >
                    <option value="">{lang === 'uk' ? 'Оберіть пріоритет' : 'Select priority'}</option>
                    <option value="1">{lang === 'uk' ? 'Пріоритет 1' : 'Priority 1'}</option>
                    <option value="2">{lang === 'uk' ? 'Пріоритет 2' : 'Priority 2'}</option>
                    <option value="3">{lang === 'uk' ? 'Пріоритет 3' : 'Priority 3'}</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Feedback */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              {lang === 'uk' ? 'Залиште коментар' : 'Leave a comment'}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              {lang === 'uk' ? 'Натисніть на карті, щоб додати коментар.' : 'Click on the map to add a comment.'}
            </p>

            {feedbackPoints.map((fp, i) => (
              <div key={i} className="bg-gray-50 rounded p-2 mb-2">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: FEEDBACK_CATEGORIES.find((c) => c.id === fp.category)?.color || '#95a5a6' }} />
                  <span className="text-xs font-medium">{FEEDBACK_CATEGORIES.find((c) => c.id === fp.category)?.name || fp.category}</span>
                </div>
                <p className="text-xs text-gray-600">{fp.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <SurveyMap
            survey={survey}
            lang={lang}
            onAddFeedback={(fb) => setFeedbackPoints((prev) => [...prev, fb])}
          />
        </div>
      </div>
    </div>
  );
}

function SurveyMap({ survey, lang, onAddFeedback }) {
  const currentHromada = useStore((s) => s.currentHromada);
  const [showForm, setShowForm] = useState(null);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('other');

  function ClickHandler() {
    useMapEvents({
      click(e) {
        setShowForm({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  }

  const handleAddFeedback = () => {
    if (showForm && comment) {
      onAddFeedback({
        latitude: showForm.lat,
        longitude: showForm.lng,
        comment,
        category,
        geometryType: 'point',
      });
      setShowForm(null);
      setComment('');
      setCategory('other');
    }
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer center={currentHromada.center} zoom={currentHromada.zoom} className="w-full h-full" zoomControl={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler />
        {survey.projects?.map((p, i) => {
          if (!p.latitude || !p.longitude) return null;
          return (
            <Marker
              key={p.id || i}
              position={[parseFloat(p.latitude), parseFloat(p.longitude)]}
              icon={L.divIcon({
                className: 'project-marker',
                html: `<div style="width:24px;height:24px;border-radius:50%;background:#009688;color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white;">${String.fromCharCode(65 + i)}</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })}
            />
          );
        })}
      </MapContainer>

      {/* Feedback form overlay */}
      {showForm && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-[1000]">
          <h4 className="text-sm font-semibold mb-2">
            {lang === 'uk' ? 'Додати коментар' : 'Add comment'}
          </h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-2 py-1.5 text-sm mb-2"
          >
            {FEEDBACK_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{lang === 'uk' ? c.name : c.nameEn}</option>
            ))}
          </select>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={lang === 'uk' ? 'Ваш коментар...' : 'Your comment...'}
            className="w-full border rounded px-2 py-1.5 text-sm h-16 resize-none mb-2"
          />
          <div className="flex gap-2">
            <button onClick={handleAddFeedback} className="flex-1 bg-urps-primary text-white py-1.5 rounded text-sm">
              {lang === 'uk' ? 'Додати' : 'Add'}
            </button>
            <button onClick={() => setShowForm(null)} className="px-4 py-1.5 border rounded text-sm">
              {lang === 'uk' ? 'Скасувати' : 'Cancel'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
