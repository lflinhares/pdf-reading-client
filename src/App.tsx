import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import { GlobalStyle } from "./globalStyles";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;