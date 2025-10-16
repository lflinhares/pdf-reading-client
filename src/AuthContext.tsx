import React, { createContext, useState, useContext, useEffect } from "react";
import api from "./api";

interface AuthContextType {
  user: { userId: string; username: string; email: string} | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const defaultState: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultState);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ userId: string; username: string; email: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[AuthContext] useEffect started. Verifying token...");
    const verifyUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log(
          "[AuthContext] No token found. Setting isLoading to false."
        );
        setIsLoading(false);
        return;
      }

      try {
        console.log("[AuthContext] Token found. Calling /auth/profile...");
        const response = await api.get("/auth/profile");
        console.log("[AuthContext] SUCCESS: Profile received. Setting user.");
        setUser(response.data);
      } catch (error) {
        console.error(
          "[AuthContext] FAILURE: Token verification failed. Logging out."
        );
        localStorage.removeItem("authToken");
        setUser(null);
      } finally {
        console.log("[AuthContext] FINALLY: Setting isLoading to false.");
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (token: string) => {
    // This function is not part of the initial load problem, so we leave it as is.
    localStorage.setItem("authToken", token);
    setIsLoading(true);
    try {
      const response = await api.get("/auth/profile");
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("authToken");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("[AuthContext] Logging out.");
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  console.log("[AuthContext] PROVIDER RENDERING WITH VALUE:", value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
