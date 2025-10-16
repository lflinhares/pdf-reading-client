import React, { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import {

  RichTextContent,
  Viewport,
} from "../Reader.styles";
// Define a type for our structured text chunks
interface StyledTextChunk {
  text: string;
  style: React.CSSProperties;
}

// Define a type for the text items from pdf.js we are interested in
interface TextItem {
  str: string;
  transform: number[];
  height: number;
  fontName: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface RichTextViewProps {
  file: File;
  // We'll add pagination back in this version
  currentPage: number;
  onPagesLoaded: (numPages: number) => void;
}

const RichTextView: React.FC<RichTextViewProps> = ({
  file,
  currentPage,
  onPagesLoaded,
}) => {
  const [pagesContent, setPagesContent] = useState<StyledTextChunk[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processPdf = async () => {
      setIsLoading(true);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async (event) => {
        const loadingTask = pdfjs.getDocument(
          event.target!.result as ArrayBuffer
        );
        const pdf = await loadingTask.promise;
        const allPagesContent: StyledTextChunk[][] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          const pageChunks: StyledTextChunk[] = [];
          let lastY: number | null = null;

          for (const item of textContent.items as TextItem[]) {
            // --- Heuristic for Paragraphs ---
            if (lastY !== null) {
              const verticalDifference = Math.abs(item.transform[5] - lastY);
              if (
                verticalDifference > item.height * 1.5 &&
                item.str.trim().length > 0
              ) {
                pageChunks.push({ text: "\n\n", style: {} });
              }
            }
            lastY = item.transform[5];

            // --- CORRECTED Style Reconstruction ---
            const fontName = item.fontName.toLowerCase();
            const style: React.CSSProperties = {
              fontSize: `${item.height * 0.95}px`, // Scale height to font-size
              fontWeight: fontName.includes("bold") ? "bold" : "normal",
              fontStyle:
                fontName.includes("italic") || fontName.includes("oblique")
                  ? "italic"
                  : "normal",
            };

            pageChunks.push({ text: item.str, style });
            pageChunks.push({ text: " ", style: {} }); // Add space between items
          }
          allPagesContent.push(pageChunks);
        }
        setPagesContent(allPagesContent);
        onPagesLoaded(pdf.numPages); // Inform parent of total pages
        setIsLoading(false);
      };
    };
    processPdf();
  }, [file, onPagesLoaded]);

  if (isLoading)
    return <div className="loading-text">Analyzing PDF Layout...</div>;

  // Render only the current page
  const currentPageChunks = pagesContent[currentPage - 1] || [];

  return (
    <Viewport>
      <RichTextContent>
        <div className="page">
          {currentPageChunks.map((chunk, chunkIndex) => (
            <span key={chunkIndex} style={chunk.style}>
              {chunk.text}
            </span>
          ))}
        </div>
      </RichTextContent>
    </Viewport>
  );
};

export default RichTextView;
