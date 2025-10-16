import React, { useRef } from 'react';

// Define the props interface
interface UploadScreenProps {
  onFileSelect: (file: File) => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="application/pdf"
        className="upload-input"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button className="upload-button" onClick={handleButtonClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        Upload PDF
      </button>
    </div>
  );
};

export default UploadScreen;