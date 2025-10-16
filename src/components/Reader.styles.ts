import styled from 'styled-components';

// --- Contêineres Principais ---

// --- Controles ---

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.buttonBg};
  position: sticky;
  bottom: 0;
  gap: 1rem;
`;

export const ControlsCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PageInfo = styled.div`
  font-size: 0.9rem;
  white-space: nowrap;
`;

export const ViewToggles = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.buttonBg};
  padding: 4px;
  border-radius: 8px;

  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    opacity: 0.6;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.1);
    }

    &.active {
      opacity: 1;
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`;

export const ThemeToggle = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
`;


// --- Visão de Leitura Rápida (Player) ---

export const PlayerContent = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 5rem;
  box-sizing: border-box;
`;

export const WordDisplay = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const PlayerControls = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

export const SliderGroup = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="range"] {
    width: 100%;
  }
`;

export const ReaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden; /* Impede o scroll na página inteira */
`;

export const Viewport = styled.div`
  flex-grow: 1;
  overflow-y: auto; /* Habilita o scroll APENAS nesta área */
  display: flex;
  justify-content: center;
  padding: 2rem 1rem; /* Adiciona espaçamento vertical e horizontal */
  box-sizing: border-box;
`;

// --- Controles (sem alterações) ---
// ...

// --- Visão de Layout (Filtro) ---

export const FilteredDocumentWrapper = styled.div`
  /* Estilos para a página do PDF */
  .react-pdf__Page {
    margin: 0 auto; /* Centraliza a página horizontalmente */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); /* Adiciona uma sombra sutil */
    border-radius: 4px; /* Cantos levemente arredondados */
  }

  /* Garante que a imagem da página não ultrapasse os cantos arredondados */
  .react-pdf__Page__canvas {
    border-radius: 4px;
    max-width: 100%;
    height: auto !important;
  }


`;

// --- Visão de Texto Rico ---

export const RichTextContent = styled.div`
  width: 100%;
  max-width: 800px;
  line-height: 1.7;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text}; /* Garante que a cor do tema seja aplicada */

  .page {
    margin-bottom: 2rem;
    white-space: pre-wrap;
  }
`;




export const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const MenuPanel = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: 100%; /* Posiciona o painel acima da barra de controles */
  right: 1rem;
  background-color: ${({ theme }) => theme.colors.buttonBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  /* Animação de entrada e saída */
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '20px')});
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.2s ease-out;

  /* Agrupa os controles dentro do painel */
  .menu-section {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;

    label {
      font-size: 0.8rem;
      opacity: 0.7;
    }
  }
`;