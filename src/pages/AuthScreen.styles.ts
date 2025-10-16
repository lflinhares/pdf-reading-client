import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme.colors.buttonBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
  max-width: 400px;
  color: ${({ theme }) => theme.colors.text};

  h2 {
    margin: 0 0 1rem 0;
    text-align: center;
    font-weight: 600;
  }
`;

export const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 6px;
  border: 1px solid #555;
  background: #2a2a2a;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #777;
  }
`;

export const Button = styled.button`
  padding: 0.8rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ToggleAuth = styled.p`
  margin: 0.5rem 0 0 0;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
  opacity: 0.8;
  font-size: 0.9rem;

  &:hover {
    opacity: 1;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff6b6b;
  background-color: rgba(255, 107, 107, 0.1);
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
  margin: 0;
`;
