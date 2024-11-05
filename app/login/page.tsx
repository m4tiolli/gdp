"use client";
import * as F from '@/utils/functions';
import * as C from '@chakra-ui/react';
import * as R from 'react';
import axios from 'axios';
import InputField from '@/components/InputField';
import PasswordField from '@/components/PasswordField';
import { useRouter } from 'next/navigation';

type LoginValues = {
  email: string;
  senha: string;
};

type TokenData = {
  auth: boolean;
  token: string;
  expiresIn: string;
}

function Login() {
  const toast = C.useToast();
  const router = useRouter()
  const [values, setValues] = R.useState<LoginValues>({ email: "", senha: "" });
  const [invalid, setInvalid] = R.useState<Record<keyof LoginValues, string>>({ email: "", senha: "" });
  const [show, setShow] = R.useState(false);
  const [isLoading, setIsLoading] = R.useState(false);

  const handleLoginError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      const errorType = error.response.data.errorType;
      if (errorType === "INVALID_EMAIL") {
        setInvalid((prev) => ({ ...prev, email: "Conta não encontrada." }));
      } else if (errorType === "INVALID_PASSWORD") {
        setInvalid((prev) => ({ ...prev, senha: "Senha incorreta." }));
      } else {
        F.showToast(toast, 'Erro', 'Erro desconhecido ao fazer login.', 'error');
      }
    } else {
      console.error("Erro desconhecido:", error);
      F.showToast(toast, 'Erro', 'Erro desconhecido ao fazer login.', 'error');
    }
  };

  const handleLogin = async (e: R.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const response = await axios.post<TokenData>('/api/login', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      F.showToast(toast, 'Sucesso', 'Bem-vindo.', 'success');
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <C.Flex className="bg-pattern w-screen h-dvh justify-center items-center">
      <form className="h-fit w-fit p-4 rounded-md bg-white backdrop-blur-sm flex-col items-center justify-center gap-4 flex shadow-md" onSubmit={handleLogin}>
        <C.Text className="font-bold text-3xl text-azul w-72 text-center">Login</C.Text>

        <InputField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => F.onChange({ e, setValues, setInvalid })}
          isInvalid={Boolean(invalid.email)}
          errorMessage={invalid.email}
        />
        <PasswordField
          label="Senha"
          name="senha"
          value={values.senha}
          onChange={(e) => F.onChange({ e, setValues, setInvalid })}
          isInvalid={Boolean(invalid.senha)}
          errorMessage={invalid.senha}
          show={show}
          setShow={setShow}
        />

        <C.Button w="full" variant="solid" colorScheme="azul" isLoading={isLoading} type='submit'>
          Entrar
        </C.Button>
      </form>
    </C.Flex>
  );
}

export default Login;
