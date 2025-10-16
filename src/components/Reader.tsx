import React, { useState, useCallback } from "react";
import LayoutView from "./views/LayoutView";
import RichTextView from "./views/RichTextView";
import PlayerView from "./views/PlayerView";
import Controls from "./Controls";
import { ReaderContainer } from "./Reader.styles";

type ViewMode = "layout" | "text" | "player";

interface ReaderProps {
  file: File;
  theme: "dark" | "light";
  onThemeToggle: () => void;
}

const Reader: React.FC<ReaderProps> = ({ file, theme, onThemeToggle }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("layout");
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagesLoaded = useCallback((numPages: number) => {
    setTotalPages(numPages);
  }, []);

  const handleViewChange = (view: ViewMode) => {
    setViewMode(view);
    setCurrentPage(1);
  };

  const renderView = () => {
    switch (viewMode) {
      case "layout":
        return (
          <LayoutView
            file={file}
            theme={theme}
            pageNumber={currentPage}
            onLoadSuccess={setTotalPages}
          />
        );
      case "text":
        return (
          <RichTextView
            file={file}
            currentPage={currentPage}
            onPagesLoaded={handlePagesLoaded}
          />
        );
      case "player":
        return (
          <PlayerView
            file={file}
            theme={theme}
            onThemeToggle={onThemeToggle}
            onViewChange={handleViewChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ReaderContainer>
      {renderView()}
      {viewMode !== "player" && (
        <Controls
          theme={theme}
          currentView={viewMode}
          currentPage={currentPage}
          totalPages={totalPages || undefined}
          onThemeToggle={onThemeToggle}
          onViewChange={handleViewChange}
          onPrevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNextPage={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages || 1))
          }
        />
      )}
    </ReaderContainer>
  );
};

export default Reader;
