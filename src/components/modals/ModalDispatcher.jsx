import useStore from '../../store/useStore';
import TableModal from './TableModal';
import ChartModal from './ChartModal';
import FeatureInfoModal from './FeatureInfoModal';
import EditFeatureModal from './EditFeatureModal';
import PropertiesModal from './PropertiesModal';
import CreateSurveyModal from '../participation/CreateSurveyModal';
import SurveyShareModal from '../participation/SurveyShareModal';
import SurveyStatsModal from '../participation/SurveyStatsModal';

export default function ModalDispatcher() {
  const activeModal = useStore((s) => s.activeModal);
  const modalData = useStore((s) => s.modalData);

  if (!activeModal) return null;

  switch (activeModal) {
    case 'table':
      return <TableModal dataset={modalData} />;
    case 'chart':
      return <ChartModal dataset={modalData} />;
    case 'featureInfo':
      return <FeatureInfoModal {...modalData} />;
    case 'editFeature':
      return <EditFeatureModal {...modalData} />;
    case 'properties':
      return <PropertiesModal dataset={modalData} />;
    case 'createSurvey':
      return <CreateSurveyModal />;
    case 'surveyShare':
      return <SurveyShareModal survey={modalData} />;
    case 'surveyStats':
      return <SurveyStatsModal survey={modalData} />;
    default:
      return null;
  }
}
