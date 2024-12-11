"use client";

import React, { useState } from "react";
import Flex from "@/components/primitives/Flex";
import InputField from "@/components/primitives/InputField";
import Text from "@/components/primitives/Text";
import formSchema from "@/schemas/login.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Button from "@/components/primitives/Button";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/login", values);
      localStorage.setItem("token", response.data.token)
      toast({
        title: "Sucesso",
        description: "Bem-vindo!",
      });
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { errorType } = error.response.data;

        if (errorType === "INVALID_EMAIL") {
          form.setError("email", { type: "manual", message: "E-mail inexistente." });
        } else if (errorType === "INVALID_PASSWORD") {
          form.setError("senha", { type: "manual", message: "Senha incorreta." });
        }
      } else {
        console.error("Erro ao fazer login:", error);
        toast({
          title: "Erro",
          description: "Algo deu errado. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Flex className="bg-pattern h-dvh w-full">
      <Flex className="flex-col bg-white rounded-lg h-3/5 w-1/5 p-4">
        <Text className="font-extrabold text-azul text-3xl">Login</Text>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full flex flex-col items-between justify-between h-4/5"
          >
            <InputField form={form} name="email" placeholder="E-mail" label="E-mail" />
            <InputField form={form} name="senha" placeholder="Senha" label="Senha" type="password" />
            <Button className="w-full" loading={isLoading}>
              Entrar
            </Button>
          </form>
        </Form>
      </Flex>
    </Flex>
  );
}
