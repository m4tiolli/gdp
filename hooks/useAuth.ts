"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { showToast } from '@/utils/functions';
import { useToast } from '@chakra-ui/react';

type DecodedToken = {
  id: number;
  nome: string;
  iat: string;
  exp: number;
  [key: string]: string | number;
};

export function useAuth() {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          showToast(toast, 'Sessão expirada', 'Sessão expirada, faça login novamente.', 'error');
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        showToast(toast, 'Erro', 'Token inválido, faça login novamente.', 'error');
        localStorage.removeItem('token');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router, toast]);

  return { isAuthenticated };
}
