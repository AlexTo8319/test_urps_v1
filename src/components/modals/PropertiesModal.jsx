import Modal from '../common/Modal';
import useStore from '../../store/useStore';
import { getSchemaForDataset } from '../../data/catalog';

export default function PropertiesModal({ dataset }) {
  const closeModal = useStore((s) => s.closeModal);
  const datasetData = useStore((s) => s.datasetData);
  const language = useStore((s) => s.language);

  const data = datasetData[dataset.id] || [];
  const schema = getSchemaForDataset(dataset.id);

  return (
    <Modal title={`${language === 'uk' ? 'Властивості' : 'Properties'}: ${language === 'uk' ? dataset.name : dataset.nameEn}`} onClose={closeModal}>
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">{language === 'uk' ? 'Назва' : 'Name'}</span>
            <span className="text-sm font-medium">{language === 'uk' ? dataset.name : dataset.nameEn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">{language === 'uk' ? 'Тип геометрії' : 'Geometry type'}</span>
            <span className="text-sm font-medium">{dataset.geometry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">{language === 'uk' ? 'Кількість записів' : 'Record count'}</span>
            <span className="text-sm font-medium">{data.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">{language === 'uk' ? 'Колір' : 'Color'}</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ background: dataset.color }} />
              <span className="text-sm font-medium">{dataset.color}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            {language === 'uk' ? 'Атрибути шару' : 'Layer Attributes'}
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 text-gray-500 font-medium">{language === 'uk' ? 'Поле' : 'Field'}</th>
                <th className="text-left py-1 text-gray-500 font-medium">{language === 'uk' ? 'Тип' : 'Type'}</th>
                <th className="text-left py-1 text-gray-500 font-medium">{language === 'uk' ? 'Обов\'язкове' : 'Required'}</th>
              </tr>
            </thead>
            <tbody>
              {schema.fields.map((f) => (
                <tr key={f.name} className="border-b">
                  <td className="py-1">{language === 'uk' ? f.label : f.labelEn}</td>
                  <td className="py-1 text-gray-500">{f.type}{f.precision ? `(${f.precision})` : ''}</td>
                  <td className="py-1">{f.required ? '✓' : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
