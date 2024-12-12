import { Body } from "@/interfaces/ef.api";
import { formatToExtenseDate } from "@/lib/formats";
import { PDFFont } from "pdf-lib";
import { formatCNPJ, formatDate, formatTelefone, formatValor } from "./formats";

interface IFields {
  body: Body,
  fontBold: PDFFont,
  fontLight: PDFFont,
}

export const fields = ({
  body,
  fontBold,
  fontLight,
}: IFields) => [
    { name: "Vendedor1", value: body.nomeVendedor, font: fontBold, size: 13 },
    { name: "Tomador", value: body.nomeTomador, font: fontLight, size: 12 },
    { name: "Departamento", value: body.departamentoTomador, font: fontLight, size: 12 },
    { name: "Email", value: body.emailTomador, font: fontLight, size: 10 },
    { name: "Telefone", value: formatTelefone(body.telefoneTomador), font: fontLight, size: 12 },
    { name: "Data", value: formatDate(body.dataProposta), font: fontBold, size: 12 },
    { name: "DataExtensa", value: formatToExtenseDate(body.dataProposta), font: fontLight, size: 12 },
    { name: "Proposta", value: body.codigoProposta, font: fontBold, size: 13 },
    { name: "Empresa", value: body.nomeEmpresa, font: fontBold, size: 17 },
    { name: "RazaoSocial", value: body.razaoEmpresa, font: fontLight, size: 13 },
    { name: "CNPJ", value: formatCNPJ(body.cnpjEmpresa), font: fontLight, size: 13 },
    { name: "Potencia", value: `${body.potenciaEquipamento} KVA`, font: fontBold, size: 12 },
    { name: "ValorTotal", value: formatValor(body.valorTotal), font: fontBold, size: 12 },
    { name: "Vendedor", value: body.nomeVendedor, font: fontLight, size: 12 },
    { name: "DepartamentoVendedor", value: body.departamentoVendedor, font: fontLight, size: 12 },
    { name: "EmailVendedor", value: body.emailVendedor, font: fontLight, size: 12 },
    { name: "Telefone1Vendedor", value: formatTelefone(body.telefone1Vendedor), font: fontLight, size: 12 },
    { name: "Telefone2Vendedor", value: formatTelefone(body.telefone2Vendedor), font: fontLight, size: 12 },
    { name: "Meses", value: body.duracaoContrato.toString(), font: fontLight, size: 12 },
    { name: "Site", value: "www.elosolutions.com.br", font: fontLight, size: 12 },
  ];