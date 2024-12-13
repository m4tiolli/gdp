"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useToast } from './use-toast';

type DecodedToken = {
  id: number;
  nome: string;
  iat: string;
  exp: number;
  [key: string]: string | number;
};

export function useAuth() {
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenData, setTokenData] = useState<DecodedToken>()
  const router = useRouter();
  const [newToast, setNewToast] = useState<{
    title: string,
    description: string,
    action: { text: string },
    variant: "default" | "destructive" | null | undefined
  }>({
    title: "",
    description: "",
    action: { text: "" },
    variant: null
  })

  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token && typeof window !== undefined && localStorage) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setTokenData(decodedToken)

        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          setNewToast({
            title: "Sessão expirada",
            description: "Sessão expirada, faça o login novamente.",
            action: { text: "Fazer login" },
            variant: "destructive"
          });
          localStorage.removeItem('token');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setNewToast({
          title: "Erro",
          description: "Token inválido, faça o login novamente.",
          action: { text: "Fazer login" },
          variant: "destructive"
        });
        localStorage.removeItem('token');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } else {
      setNewToast({
        title: "Sessão expirada",
        description: "Sessão expirada, faça o login novamente.",
        action: { text: "Fazer login" },
        variant: "destructive"
      });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [router, toast, token]);

  return { token, isAuthenticated, tokenData, newToast };
}