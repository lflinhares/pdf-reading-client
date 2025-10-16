import React, { useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Typescript interface for the text items we care about
interface TextItem {
  str: string;
  transform: number[];
  height: number;
}

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface TextViewProps {
  file: File;
  currentPage: number;
  onTextExtracted: (pages: string[]) => void;
}

const TextView: React.FC<TextViewProps> = ({ file, currentPage, onTextExtracted }) => {
  const [pages, setPages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const extractText = async () => {
      setIsLoading(true);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async (event) => {
        const loadingTask = pdfjs.getDocument(event.target!.result as ArrayBuffer);
        const pdf = await loadingTask.promise;
        const allPagesText: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          // --- START OF THE NEW LOGIC ---
          
          let lastY: number | null = null;
          let pageText = '';

          // Sort items by their vertical position, then horizontal. This helps with columns.
          const sortedItems = (textContent.items as TextItem[]).sort((a, b) => {
            if (a.transform[5] > b.transform[5]) return -1; // Higher on page first
            if (a.transform[5] < b.transform[5]) return 1;
            if (a.transform[4] < b.transform[4]) return -1; // Then left-to-right
            if (a.transform[4] > b.transform[4]) return 1;
            return 0;
          });

          for (const item of sortedItems) {
            if (lastY !== null) {
              const verticalDifference = Math.abs(item.transform[5] - lastY);
              
              // If the vertical gap is larger than 1.5x the line height, it's a new paragraph.
              if (verticalDifference > item.height * 1.5) {
                pageText += '\n\n';
              } 
              // A smaller gap is just a new line.
              else if (verticalDifference > 5) { 
                pageText += '\n';
              }
              // A tiny gap means it's on the same line.
              else {
                pageText += ' ';
              }
            }
            pageText += item.str;
            lastY = item.transform[5];
          }
          allPagesText.push(pageText);
          // --- END OF THE NEW LOGIC ---
        }
        
        setPages(allPagesText);
        onTextExtracted(allPagesText);
        setIsLoading(false);
      };
    };
    extractText();
  }, [file, onTextExtracted]);

  if (isLoading) return <div className="loading-text">Extracting Formatted Text...</div>;

  return (
    <div className="text-reader-content">
      {/* The <pre> tag is essential here as it respects the \n characters */}
      <pre>{pages[currentPage - 1]}</pre>
    </div>
  );
};

export default TextView;