import { useState } from 'react';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';
import { getSchemaForDataset } from '../../data/catalog';

export default function EditFeatureModal({ datasetId, feature, isNew, latitude, longitude, geometry }) {
  const closeModal = useStore((s) => s.closeModal);
  const addDataEntry = useStore((s) => s.addDataEntry);
  const updateDataEntry = useStore((s) => s.updateDataEntry);
  const addNotification = useStore((s) => s.addNotification);
  const language = useStore((s) => s.language);

  const schema = getSchemaForDataset(datasetId);
  const initialValues = isNew
    ? { latitude: latitude || '', longitude: longitude || '', ...(geometry ? { geometry } : {}) }
    : { ...feature };

  const [values, setValues] = useState(initialValues);

  const handleChange = (fieldName, value) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSave = () => {
    if (isNew) {
      addDataEntry(datasetId, values);
      addNotification({
        type: 'success',
        title: language === 'uk' ? 'Запис додано' : 'Entry added',
      });
    } else {
      updateDataEntry(datasetId, feature.id, values);
      addNotification({
        type: 'success',
        title: language === 'uk' ? 'Запис оновлено' : 'Entry updated',
      });
    }
    closeModal();
  };

  return (
    <Modal
      title={isNew
        ? (language === 'uk' ? 'Додати новий запис' : 'Add new entry')
        : (language === 'uk' ? 'Редагувати запис' : 'Edit entry')
      }
      onClose={closeModal}
    >
      <div className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {language === 'uk' ? field.label : field.labelEn}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'dropdown' ? (
              <select
                value={values[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-urps-secondary"
              >
                <option value="">{language === 'uk' ? 'Оберіть...' : 'Select...'}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'integer' ? (
              <input
                type="number"
                value={values[field.name] || ''}
                onChange={(e) => handleChange(field.name, parseInt(e.target.value) || '')}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-urps-secondary"
              />
            ) : field.type === 'decimal' ? (
              <input
                type="number"
                step="0.000001"
                value={values[field.name] || ''}
                onChange={(e) => handleChange(field.name, parseFloat(e.target.value) || '')}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-urps-secondary"
              />
            ) : (
              <input
                type="text"
                value={values[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-urps-secondary"
              />
            )}

            {field.type === 'decimal' && (
              <p className="text-xs text-gray-400 mt-0.5">
                {language === 'uk' ? `Точність: ${field.precision}` : `Precision: ${field.precision}`}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          className="flex-1 bg-urps-primary text-white py-2 rounded text-sm font-medium hover:bg-urps-dark"
        >
          {language === 'uk' ? 'Зберегти' : 'Save'}
        </button>
        <button
          onClick={closeModal}
          className="px-6 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
        >
          {language === 'uk' ? 'Скасувати' : 'Cancel'}
        </button>
      </div>
    </Modal>
  );
}
