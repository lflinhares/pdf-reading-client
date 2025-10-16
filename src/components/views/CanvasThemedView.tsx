import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

interface FilteredLayoutViewProps {
  file: File;
  theme: 'dark' | 'light';
  pageNumber: number;
  onLoadSuccess: (numPages: number) => void;
}

const FilteredLayoutView: React.FC<FilteredLayoutViewProps> = ({ file, theme, pageNumber, onLoadSuccess }) => {
  return (
    <div className="pdf-viewer">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => onLoadSuccess(numPages)}
        // Apply a class ONLY when in dark mode
        className={theme === 'dark' ? 'pdf-document-dark-filtered' : ''}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default FilteredLayoutView;