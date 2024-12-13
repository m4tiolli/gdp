"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: number;
  nome: string;
  iat: string;
  exp: number;
  [key: string]: string | number;
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<DecodedToken | null>(null);
  const [newToast, setNewToast] = useState<{
    title: string;
    description: string;
    action: { text: string };
    variant: "default" | "destructive" | null | undefined;
  }>({
    title: "",
    description: "",
    action: { text: "" },
    variant: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken); // Atualiza o token no estado

        try {
          const decodedToken = jwtDecode<DecodedToken>(storedToken);
          setTokenData(decodedToken);

          if (decodedToken.exp * 1000 > Date.now()) {
            setIsAuthenticated(true);
          } else {
            handleSessionExpired();
          }
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
          handleInvalidToken();
        }
      } else {
        handleSessionExpired();
      }
    }
  }, [router]);

  const handleSessionExpired = () => {
    setNewToast({
      title: "Sessão expirada",
      description: "Sessão expirada, faça o login novamente.",
      action: { text: "Fazer login" },
      variant: "destructive",
    });
    localStorage.removeItem("token");
    setToken(null);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  const handleInvalidToken = () => {
    setNewToast({
      title: "Erro",
      description: "Token inválido, faça o login novamente.",
      action: { text: "Fazer login" },
      variant: "destructive",
    });
    localStorage.removeItem("token");
    setToken(null);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return { isAuthenticated, token, tokenData, newToast };
}
