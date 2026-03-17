import TopBar from './map/TopBar';
import Sidebar from './sidebar/Sidebar';
import MapView from './map/MapView';
import RightPanel from './map/RightPanel';
import DrawingToolbar from './map/DrawingToolbar';
import ModalDispatcher from './modals/ModalDispatcher';
import NotificationContainer from './common/Notification';

export default function MainLayout() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative flex">
          <MapView />
          <DrawingToolbar />
          <RightPanel />
        </div>
      </div>
      <ModalDispatcher />
      <NotificationContainer />
    </div>
  );
}
