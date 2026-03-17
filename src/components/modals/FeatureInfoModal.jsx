import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';

export default function FeatureInfoModal({ feature, datasetId, datasetName }) {
  const closeModal = useStore((s) => s.closeModal);
  const openModal = useStore((s) => s.openModal);
  const removeDataEntry = useStore((s) => s.removeDataEntry);
  const addNotification = useStore((s) => s.addNotification);
  const language = useStore((s) => s.language);

  const fields = Object.entries(feature).filter(([k]) => !['id', 'geometry'].includes(k));

  const handleEdit = () => {
    closeModal();
    setTimeout(() => {
      openModal('editFeature', { datasetId, feature, isNew: false });
    }, 100);
  };

  const handleRemove = () => {
    if (window.confirm(language === 'uk' ? 'Ви впевнені, що хочете видалити цей запис?' : 'Are you sure you want to remove this entry?')) {
      removeDataEntry(datasetId, feature.id);
      addNotification({ type: 'success', title: language === 'uk' ? 'Запис видалено' : 'Entry removed' });
      closeModal();
    }
  };

  return (
    <Modal title={feature.name || (language === 'uk' ? 'Деталі об\'єкту' : 'Feature Details')} onClose={closeModal}>
      <div className="space-y-3">
        <div className="text-xs text-gray-400 mb-3">
          {language === 'uk' ? 'Набір даних' : 'Dataset'}: {datasetName}
        </div>

        {fields.map(([key, value]) => (
          <div key={key} className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">{key}</span>
            <span className="text-sm text-gray-800">{typeof value === 'object' ? JSON.stringify(value) : String(value ?? '-')}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-2 bg-urps-primary text-white py-2 rounded text-sm hover:bg-urps-dark"
        >
          <FiEdit2 size={14} />
          {language === 'uk' ? 'Редагувати' : 'Edit'}
        </button>
        <button
          onClick={handleRemove}
          className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded text-sm hover:bg-red-100"
        >
          <FiTrash2 size={14} />
          {language === 'uk' ? 'Видалити' : 'Remove'}
        </button>
      </div>
    </Modal>
  );
}
