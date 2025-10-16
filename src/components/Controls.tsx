import React, { useState } from "react";
import { SecondaryButton, PrimaryButton } from "../layouts/MainApp.styles"; // Reutilize os botões
import {
  ControlsContainer,
  ControlsCenter,
  PageInfo,
  ViewToggles,
  ThemeToggle,
  MenuButton,
  MenuPanel,
} from "./Reader.styles";

type ViewMode = "layout" | "text" | "player";
interface ControlsProps {
  // State props
  theme: "dark" | "light";
  currentView: ViewMode;
  currentPage?: number;
  totalPages?: number;
  isPlaying?: boolean;

  // Callback props
  onThemeToggle: () => void;
  onViewChange: (view: ViewMode) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onPlayPause?: () => void;
  onRestart?: () => void;
}
const Controls: React.FC<ControlsProps> = (props) => {
  const {
    theme,
    currentView,
    currentPage,
    totalPages,
    onThemeToggle,
    onViewChange,
    onPrevPage,
    onNextPage,
  } = props;

  // Estado para controlar se o menu está aberto
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ícone de engrenagem para o botão de menu
  const SettingsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.44,0.17-0.48,0.41L9.12,4.84c-0.59,0.24-1.12,0.56-1.62,0.94L5.11,4.82c-0.22-0.08-0.47,0-0.59,0.22L2.6,8.36 c-0.11,0.2-0.06,0.47,0.12,0.61l2.03,1.58C4.72,11.36,4.7,11.68,4.7,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.48,2.03 c0.04,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.48-0.41l0.48-2.03c0.59-0.24,1.12-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.11-0.2,0.06-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  );

  return (
    <ControlsContainer>
      <SecondaryButton onClick={onPrevPage} disabled={currentPage === 1}>
        Anterior
      </SecondaryButton>

      <PageInfo>
        Página {currentPage} de {totalPages || "--"}
      </PageInfo>

      <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <SettingsIcon />
      </MenuButton>

      <MenuPanel isOpen={isMenuOpen}>
        <div className="menu-section">
          <label>Visualização</label>
          <ViewToggles>
            <button
              onClick={() => onViewChange("layout")}
              className={currentView === "layout" ? "active" : ""}
            >
              📖
            </button>
            <button
              onClick={() => onViewChange("text")}
              className={currentView === "text" ? "active" : ""}
            >
              📄
            </button>
            <button
              onClick={() => onViewChange("player")}
              className={currentView === "player" ? "active" : ""}
            >
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

      <SecondaryButton
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Próximo
      </SecondaryButton>
    </ControlsContainer>
  );
};

export default Controls;
