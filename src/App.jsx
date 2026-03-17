import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SurveyPublicPage from './components/participation/SurveyPublicPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/survey/:surveyId" element={<SurveyRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

function SurveyRoute() {
  const surveyId = window.location.pathname.split('/survey/')[1];
  return <SurveyPublicPage surveyId={surveyId} />;
}

export default App;
