import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';

export default function SurveyShareModal({ survey }) {
  const closeModal = useStore((s) => s.closeModal);
  const addNotification = useStore((s) => s.addNotification);
  const language = useStore((s) => s.language);
  const qrRef = useRef();

  const surveyUrl = `${window.location.origin}/survey/${survey.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(surveyUrl);
    addNotification({ type: 'success', title: language === 'uk' ? 'Посилання скопійовано' : 'Link copied' });
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 400, 400);
      ctx.drawImage(img, 50, 50, 300, 300);
      const link = document.createElement('a');
      link.download = `survey_qr_${survey.id}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <Modal title={language === 'uk' ? 'Поділитися опитуванням' : 'Share Survey'} onClose={closeModal}>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">{survey.name}</h3>

        {/* QR Code */}
        <div ref={qrRef} className="inline-block bg-white p-6 rounded-lg border">
          <QRCodeSVG value={surveyUrl} size={200} level="H" />
        </div>

        {/* URL */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={surveyUrl}
            readOnly
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 bg-urps-primary text-white px-3 py-2 rounded text-sm hover:bg-urps-dark"
          >
            <FiCopy size={14} />
            {language === 'uk' ? 'Копіювати' : 'Copy'}
          </button>
        </div>

        {/* Download QR */}
        <button
          onClick={handleDownloadQR}
          className="flex items-center gap-2 mx-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
        >
          <FiDownload size={14} />
          {language === 'uk' ? 'Завантажити QR-код (JPG)' : 'Download QR code (JPG)'}
        </button>

        <p className="text-xs text-gray-400">
          {language === 'uk'
            ? 'Поширте QR-код або посилання серед мешканців громади.'
            : 'Share the QR code or link with community members.'}
        </p>
      </div>
    </Modal>
  );
}
