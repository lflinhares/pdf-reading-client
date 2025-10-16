import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import {
  AuthContainer,
  AuthForm,
  Input,
  Button,
  ToggleAuth,
  ErrorMessage,
} from "./AuthScreen.styles";

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { username, password }
        : { username, email, password };
      const response = await api.post(endpoint, payload);

      if (response.data.access_token) {
        await login(response.data.access_token);
      } else {
        setError(response.data.message || "Ocorreu um erro.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message[0] || "Falha ao conectar ao servidor."
      );
    }
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Registrar"}</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {!isLogin && (
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">{isLogin ? "Entrar" : "Registrar"}</Button>
        <ToggleAuth onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Não tem uma conta? Registre-se"
            : "Já tem uma conta? Faça o login"}
        </ToggleAuth>
      </AuthForm>
    </AuthContainer>
  );
};

export default AuthScreen;
