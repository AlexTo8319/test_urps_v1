import { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import useStore from '../../store/useStore';

const icons = {
  success: <FiCheckCircle className="text-green-500" size={20} />,
  error: <FiAlertCircle className="text-red-500" size={20} />,
  info: <FiInfo className="text-blue-500" size={20} />,
};

export default function NotificationContainer() {
  const notifications = useStore((s) => s.notifications);
  const removeNotification = useStore((s) => s.removeNotification);

  return (
    <div className="fixed top-4 right-4 z-[2000] flex flex-col gap-2 max-w-sm">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} onRemove={() => removeNotification(n.id)} />
      ))}
    </div>
  );
}

function NotificationItem({ notification, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-start gap-3 animate-[slideIn_0.3s_ease-out]">
      {icons[notification.type] || icons.info}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{notification.title}</p>
        {notification.message && <p className="text-xs text-gray-500 mt-1">{notification.message}</p>}
      </div>
      <button onClick={onRemove} className="text-gray-400 hover:text-gray-600">
        <FiX size={16} />
      </button>
    </div>
  );
}
