import styled from 'styled-components';

// --- Componentes Base Reutilizáveis ---

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  font-size: 0.9rem;
  white-space: nowrap;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    opacity: 0.8;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.buttonBg};

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonBg};
  }
`;

// --- Componentes da Tela da Biblioteca ---

export const LibraryContainer = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  box-sizing: border-box;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.buttonBg};
  padding-bottom: 1rem;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadLabel = styled.label`
  /* Faz o label se parecer com um botão */
  display: inline-block;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    opacity: 0.8;
  }
`;

export const PdfList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PdfListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.buttonBg};
  padding: 1rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.2s;

  &:hover {
    background-color: #4a4a4a; /* Um pouco mais claro para o hover */
  }
`;

export const PdfName = styled.span`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1rem;
`;

export const PdfActions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-shrink: 0;
`;

export const EmptyLibraryMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #888;
  margin-top: 4rem;
`;

export const BackButton = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: ${({ theme }) => theme.colors.buttonBg};
  opacity: 0.4;
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
  z-index: 10;

  &:hover {
    opacity: 0.8;
  }
`;