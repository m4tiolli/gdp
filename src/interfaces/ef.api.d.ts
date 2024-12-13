import { schema } from "@/schemas/ef.schema";
import { RowDataPacket } from "mysql2";
import z from 'zod'

export type CadastroElo = "Recuperadora" | "Serviços"

export interface Body extends z.infer<typeof schema> {
  nomeVendedor: string;
  emailVendedor: string;
  telefone1Vendedor: string;
  telefone2Vendedor: string;
  departamentoVendedor: string
}

export interface PropostaEF {
  id: number; // ID único da proposta
  cadastroElo: 'R' | 'S'; // Pode ser 'R' ou 'S'
  codigoProposta: string; // Código no formato "ELOEF 0000S24"
  numeroProposta: number; // Número com até 4 dígitos
  anoProposta: number; // Ano no formato YYYY
  dataProposta: string; // Data no formato "YYYY-MM-DD"
  duracaoContrato: number; // Duração do contrato em meses
  nomeEmpresa: string; // Nome fantasia da empresa
  razaoEmpresa: string; // Razão social da empresa
  cnpjEmpresa: string; // Apenas números do CNPJ (14 caracteres)
  nomeTomador: string; // Nome abreviado do tomador
  departamentoTomador: string; // Departamento do tomador
  emailTomador: string; // Email do tomador
  telefoneTomador: string; // Apenas números do telefone
  valorContaEnergia: number; // Valor com até duas casas decimais
  potenciaEquipamento: number; // Valor com até duas casas decimais
  valorTotal: number; // Valor total com até duas casas decimais
  linkPdf: string; // URL do PDF armazenado
  fatorFinanceiroId: number; // ID do fator financeiro associado
  idUsuario: number; // ID do usuário que gerou a proposta
}

export interface FatorFinanceiro extends RowDataPacket {
  id: number;
  meses: number;
  valor: number;
  porcentagem: number;
  implementacao: number;
}