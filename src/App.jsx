import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SurveyPublicPage from './components/participation/SurveyPublicPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/survey/:surveyId" element={<SurveyRoute />} />
      </Routes>
    </HashRouter>
  );
}

function SurveyRoute() {
  const surveyId = window.location.pathname.split('/survey/')[1];
  return <SurveyPublicPage surveyId={surveyId} />;
}

export default App;
