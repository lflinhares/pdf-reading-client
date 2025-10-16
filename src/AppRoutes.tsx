import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AuthScreen from "./pages/AuthScreen";
import MainApp from "./layouts/MainApp";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // This log is the most important one.
  console.log(
    "[AppRoutes] RENDERING. isLoading:",
    isLoading,
    "isAuthenticated:",
    isAuthenticated
  );

  if (isLoading) {
    console.log(
      "[AppRoutes] Condition: isLoading is true. Showing Loading screen."
    );
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <MainApp /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/" /> : <AuthScreen />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
