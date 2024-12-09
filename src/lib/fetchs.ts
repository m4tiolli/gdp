import { ItemsSelect } from "@/interfaces/select";
import { FormEF } from "@/types/form.ef";
import axios from "axios"
import React from "react";

export const get = (url: string, token: string) => {
  return axios.get(url, { headers: { Authorization: "Bearer " + token } })
}

export const post = (url: string, token: string, body: object) => {
  return axios.post(url, body, { headers: { Authorization: "Bearer " + token } })
}

export const searchCNPJ = async (form: FormEF) => {
  const cnpj = form.getValues("cnpjEmpresa").replace(/[^\d]/g, "");
  try {
    const response = await axios.get(`https://open.cnpja.com/office/${cnpj}`, {
      headers: {
        Authorization: `Bearer ffaafa01-3f8a-43eb-b361-6033430f3f98-55be84d3-2df7-4987-b151-49d9a0b6b0a6`,
      },
    });

    const { alias, company } = response.data;
    const { name } = company

    form.setValue("nomeEmpresa", alias || "");
    form.setValue("razaoEmpresa", name || "");
  } catch (error) {
    console.error("Erro ao buscar dados do CNPJ:", error);
  }
};

export const getNextProposals = async (token: string, setNextProposals: React.Dispatch<React.SetStateAction<{ propostaRecuperadora: string, propostaServicos: string }>>) => {
  const response = await get("/api/proposals/next-proposal/ef", token)
  setNextProposals(response.data)
}

export const getDepartamentos = async (token: string, setDepartamentos: React.Dispatch<React.SetStateAction<ItemsSelect[]>>) => {
  const response = await get("/api/departamentos", token)
  setDepartamentos(response.data)
}

export const getFatoresFinanceiros = async (token: string, setFatoresFinanceiros: React.Dispatch<React.SetStateAction<ItemsSelect[]>>) => {
  const response = await get("/api/misc/ef/fatores-financeiros", token)
  setFatoresFinanceiros(response.data)
}

export const getUserInfo = async (token: string, form: FormEF, id: number) => {
  const response = await get(`/api/profile/${id}`, token)
  form.setValue("nomeVendedor", response.data.nome)
  form.setValue("emailVendedor", response.data.email)
  form.setValue("telefone1Vendedor", response.data.telefone1)
  form.setValue("telefone2Vendedor", response.data.telefone2)
  form.setValue("departamentoVendedor", response.data.departamento)
}