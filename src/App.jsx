import { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SurveyPublicPage from './components/participation/SurveyPublicPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/survey/:surveyId" element={<SurveyRoute />} />
      </Routes>
    </HashRouter>
  );
}

// Handles /?code=xxx by redirecting to /#/survey/xxx
function RootRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      navigate(`/survey/${code}`, { replace: true });
    }
  }, [navigate]);

  return <MainLayout />;
}

function SurveyRoute() {
  const { surveyId } = useParams();
  return <SurveyPublicPage surveyId={surveyId} />;
}

export default App;
