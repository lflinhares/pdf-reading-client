const baseTheme = {
  fonts: {
    main: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
  },
  borderRadius: "8px",
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    background: "#F5F5F5",
    text: "#1E1E1E",
    buttonBg: "#e0e0e0",
    buttonText: "#1E1E1E",
    primary: "#1E1E1E",
    secondary: "#F5F5F5",
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    background: "#1E1E1E",
    text: "#E0E0E0",
    buttonBg: "#424242",
    buttonText: "#E0E0E0",
    primary: "#E0E0E0",
    secondary: "#1E1E1E",
  },
};

// --- ESTA É A LINHA ADICIONADA ---
// Exportamos o TIPO do nosso objeto de tema para ser usado em outros lugares.
export type Theme = typeof darkTheme;
