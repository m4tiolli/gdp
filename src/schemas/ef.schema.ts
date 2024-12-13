"use client"

import { FormEF } from '@/types/form.ef'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as BaseUseForm } from 'react-hook-form'
import { z } from 'zod'

export const schema = z.object({
  cadastroElo: z.string().min(2, { message: "Escolha o cadastro da Elo a ser utilizado na proposta." }),
  codigoProposta: z.string().min(2, { message: "Preencha o código da proposta ou atualize a página." }),
  duracaoContrato: z.string().min(2, { message: "Selecione a duração do contrato." }),
  dataProposta: z.date({ message: "Selecione a data de emissão da proposta." }),
  cnpjEmpresa: z.string().min(2, { message: "Informe o CNPJ da empresa." }),
  nomeEmpresa: z.string().min(2, { message: "Informe o nome da empresa." }),
  razaoEmpresa: z.string().min(2, { message: "Informe a razão social da empresa." }),
  potenciaEquipamento: z.string().min(2, { message: "Informe a potência do equipamento." }),
  valorContaEnergia: z.string().min(2, { message: "Informe o valor da conta de energia." }),
  valorTotal: z.string().min(2, { message: "Informe o valor total ou atualize a página." }),
  nomeVendedor: z.string().min(2, { message: "Informe o nome do vendedor ou atualize a página." }),
  emailVendedor: z.string().min(2, { message: "Informe o email do vendedor ou atualize a página." }),
  telefone1Vendedor: z.string().min(2, { message: "Informe o telefone do vendedor ou atualize a página." }),
  telefone2Vendedor: z.string().min(2, { message: "Informe o telefone do vendedor ou atualize a página." }),
  departamentoVendedor: z.string().min(2, { message: "Informe o departamento do vendedor ou atualize a página." }),
  nomeTomador: z.string().min(2, { message: "Informe o nome do tomador." }),
  emailTomador: z.string().min(2, { message: "Informe o email do tomador." }),
  telefoneTomador: z.string().min(2, { message: "Informe o telefone do tomador." }),
  departamentoTomador: z.string().min(2, { message: "Informe o departamento do tomador." }),
})

export const useForm = () => {
  const form = BaseUseForm<FormEF>({
    resolver: zodResolver(schema),
    defaultValues: {
      cadastroElo: "",
      codigoProposta: "",
      duracaoContrato: "",
      dataProposta: "",
      cnpjEmpresa: "",
      nomeEmpresa: "",
      razaoEmpresa: "",
      potenciaEquipamento: "",
      valorContaEnergia: "",
      valorTotal: "",
      nomeVendedor: "",
      emailVendedor: "",
      telefone1Vendedor: "",
      telefone2Vendedor: "",
      departamentoVendedor: "",
      nomeTomador: "",
      emailTomador: "",
      telefone1Tomador: "",
      telefone2Tomador: "",
      departamentoTomador: ""
    }
  })

  return { form }
}