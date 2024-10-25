"use client"
import * as F from '@/utils/functions'
import * as C from '@chakra-ui/react'
import * as R from 'react'
import axios, { AxiosError } from 'axios'
import InputField from '@/components/InputField'
import { decryptAES, encryptAES } from '@/utils/verifications'
import PasswordField from '@/components/PasswordField'

type LoginValues = {
  email: string;
  senha: string;
};

function Login() {

  const toast = C.useToast()

  const [values, setValues] = R.useState<LoginValues>({ email: "", senha: "" });

  const [invalid, setInvalid] = R.useState<Record<keyof LoginValues, string>>({ email: "", senha: "" });

  const [show, setShow] = R.useState(false)

  const [token, setToken] = R.useState('')

  const [isLoading, setIsLoading] = R.useState(false)

  if (token) console.log(decryptAES(token))
  if (token) console.log(token)

  const FazerLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/login', { s: encryptAES(JSON.stringify(values)) });
      const { s } = response.data
      setToken(JSON.parse(decryptAES(s)))
      F.showToast(toast, 'Sucesso', 'Bem vindo.', 'success');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (Array.isArray(error.response.data.issues)) {
          F.handleValidationErrors(error.response.data.issues as F.ValidationError[], setInvalid);
        } else {
          const status = error.response.status;
          if (status === 404) setInvalid(prev => ({ ...prev, email: "Conta não encontrada." }));
          if (status === 401) setInvalid(prev => ({ ...prev, senha: "Senha incorreta." }));
        }
      } else {
        console.error("Erro desconhecido:", error);
        F.showToast(toast, 'Erro', 'Erro desconhecido ao fazer login.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <C.Flex className="bg-pattern w-screen h-dvh justify-center items-center">
      <C.Flex className="h-fit w-fit p-4 rounded-md bg-white backdrop-blur-sm flex-col items-center justify-center gap-4 shadow-md">
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
        <C.Button w="full" variant="solid" colorScheme="azul" isLoading={isLoading} onClick={FazerLogin}>
          Entrar
        </C.Button>
      </C.Flex>
    </C.Flex>
  );

}

export default Login