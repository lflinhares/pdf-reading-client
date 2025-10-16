import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { SecondaryButton, PrimaryButton } from "../../layouts/MainApp.styles";
import {
  PlayerContent,
  WordDisplay,
  PlayerControls,
  SliderGroup,
  ControlsContainer,
  ControlsCenter,
  ViewToggles,
  ThemeToggle,
  PageInfo,
  MenuPanel,
  MenuButton,
} from "../Reader.styles";

// --- Interfaces e worker setup (sem alterações) ---
interface TextItem {
  str: string;
  transform: number[];
  height: number;
}
interface PageData {
  words: string[];
  paragraphStarts: number[];
}
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
interface PlayerViewProps {
  file: File;
  theme: "dark" | "light";
  onThemeToggle: () => void;
  onViewChange: (view: "layout" | "text" | "player") => void;
}

const PlayerView: React.FC<PlayerViewProps> = ({
  file,
  theme,
  onThemeToggle,
  onViewChange,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<PageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(250);
  const [fontSize, setFontSize] = useState(64);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // --- Lógica de extração de texto (sem alterações) ---
  useEffect(() => {
    const extractText = async () => {
      setIsLoading(true);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async (event) => {
        const loadingTask = pdfjsLib.getDocument(
          event.target!.result as ArrayBuffer
        );
        const pdf = await loadingTask.promise;
        const allPagesData: PageData[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageWords: string[] = [];
          const paragraphStarts: number[] = [0];
          let lastY: number | null = null;
          for (const item of textContent.items as TextItem[]) {
            if (lastY !== null) {
              const verticalDifference = Math.abs(item.transform[5] - lastY);
              if (
                verticalDifference > item.height * 1.5 &&
                item.str.trim().length > 0
              ) {
                paragraphStarts.push(pageWords.length);
              }
            }
            pageWords.push(
              ...item.str.split(/\s+/).filter((w) => w.length > 0)
            );
            lastY = item.transform[5];
          }
          allPagesData.push({ words: pageWords, paragraphStarts });
        }
        setPages(allPagesData);
        setCurrentPage(1);
        setCurrentIndex(0);
        setIsLoading(false);
      };
    };
    extractText();
  }, [file]);

  // --- Lógica do timer (sem alterações) ---
  useEffect(() => {
    const wordsOnPage = pages[currentPage - 1]?.words || [];
    if (isPlaying && currentIndex < wordsOnPage.length - 1) {
      const interval = (60 / wpm) * 1000;
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, interval);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, wpm, currentIndex, currentPage, pages]);

  // --- Funções de controle (sem alterações) ---
  const togglePlay = () => {
    const wordsOnPage = pages[currentPage - 1]?.words || [];
    if (currentIndex >= wordsOnPage.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(!isPlaying);
  };
  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage((prev) => prev + 1);
      setCurrentIndex(0);
      setIsPlaying(false);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setCurrentIndex(0);
      setIsPlaying(false);
    }
  };
  const handleRestartParagraph = () => {
    const starts = pages[currentPage - 1]?.paragraphStarts || [0];
    const lastParagraphStart =
      starts.filter((s) => s <= currentIndex).pop() ?? 0;
    setCurrentIndex(lastParagraphStart);
    setIsPlaying(false);
  };

  const SettingsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.44,0.17-0.48,0.41L9.12,4.84c-0.59,0.24-1.12,0.56-1.62,0.94L5.11,4.82c-0.22-0.08-0.47,0-0.59,0.22L2.6,8.36 c-0.11,0.2-0.06,0.47,0.12,0.61l2.03,1.58C4.72,11.36,4.7,11.68,4.7,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.48,2.03 c0.04,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.48-0.41l0.48-2.03c0.59-0.24,1.12-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.11-0.2,0.06-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  );

  if (isLoading)
    return (
      <PlayerContent>
        <div>Carregando...</div>
      </PlayerContent>
    );

  const wordsOnPage = pages[currentPage - 1]?.words || [];

  return (
    <>
      <PlayerContent>
        <WordDisplay style={{ fontSize: `${fontSize}px` }}>
          {wordsOnPage[currentIndex]}
        </WordDisplay>
      </PlayerContent>

      <PlayerControls>
        <SliderGroup>
          <label>Velocidade: {wpm} WPM</label>
          <input
            type="range"
            min="50"
            max="1000"
            value={wpm}
            onChange={(e) => setWpm(Number(e.target.value))}
          />
        </SliderGroup>
        <SliderGroup>
          <label>Tamanho da Fonte: {fontSize}px</label>
          <input
            type="range"
            min="24"
            max="120"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </SliderGroup>
      </PlayerControls>

      <ControlsContainer>
        <PrimaryButton onClick={togglePlay} style={{ flex: 1 }}>
          {isPlaying ? "Pausar" : "Play"}
        </PrimaryButton>
        <SecondaryButton onClick={handleRestartParagraph} style={{ flex: 1 }}>
          Reiniciar Parágrafo
        </SecondaryButton>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <SettingsIcon />
        </MenuButton>
        <MenuPanel isOpen={isMenuOpen}>
          <div className="menu-section">
            <label>Visualização</label>
            <ViewToggles>
              <button onClick={() => onViewChange("layout")}>📖</button>
              <button onClick={() => onViewChange("text")}>📄</button>
              <button onClick={() => onViewChange("player")} className="active">
                ⚡️
              </button>
            </ViewToggles>
          </div>
          <div className="menu-section">
            <label>Tema</label>
            <ThemeToggle onClick={onThemeToggle}>
              {theme === "dark" ? "☀️" : "🌙"}
            </ThemeToggle>
          </div>
        </MenuPanel>
      </ControlsContainer>

      <ControlsContainer>
        <SecondaryButton onClick={handlePrevPage} disabled={currentPage <= 1}>
          Página Anterior
        </SecondaryButton>
        <PageInfo>
          Página {currentPage} de {pages.length}
        </PageInfo>
        <SecondaryButton
          onClick={handleNextPage}
          disabled={currentPage >= pages.length}
        >
          Próxima Página
        </SecondaryButton>
      </ControlsContainer>
    </>
  );
};

export default PlayerView;
