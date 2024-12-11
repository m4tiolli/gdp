import { Body } from "@/interfaces/ef.api";
import { formatToExtenseDate } from "@/lib/formats";
import { PDFFont } from "pdf-lib";

interface IFields {
  mes: string,
  body: Body,
  fontBold: PDFFont,
  fontLight: PDFFont,
  formatDate: (date: string | Date) => string,
  formatCNPJ: (cnpj: string) => string,
  formatValor: (value: number) => string
}

export const fields = ({
  mes,
  body,
  fontBold,
  fontLight,
  formatDate,
  formatCNPJ,
  formatValor,
}: IFields) => [
    { name: "Vendedor1", value: body.nomeVendedor, font: fontBold, size: 13 },
    { name: "Tomador", value: body.nomeTomador, font: fontLight, size: 12 },
    { name: "Departamento", value: body.departamentoTomador, font: fontLight, size: 12 },
    { name: "Email", value: body.emailTomador, font: fontLight, size: 10 },
    { name: "Telefone", value: body.telefoneTomador, font: fontLight, size: 12 },
    { name: "Data", value: formatDate(body.dataProposta), font: fontBold, size: 12 },
    { name: "DataExtensa", value: formatToExtenseDate(body.dataProposta), font: fontLight, size: 12 },
    { name: "Proposta", value: body.codigoProposta, font: fontBold, size: 13 },
    { name: "Empresa", value: body.nomeEmpresa, font: fontBold, size: 17 },
    { name: "RazaoSocial", value: body.razaoEmpresa, font: fontLight, size: 13 },
    { name: "CNPJ", value: formatCNPJ(body.cnpjEmpresa), font: fontLight, size: 13 },
    { name: "Potencia", value: `${body.potenciaEquipamento} KVA`, font: fontBold, size: 12 },
    { name: "ValorTotal", value: formatValor(parseInt(body.valorTotal)), font: fontBold, size: 12 },
    { name: "Vendedor", value: body.nomeVendedor, font: fontLight, size: 12 },
    { name: "DepartamentoVendedor", value: body.departamentoVendedor, font: fontLight, size: 12 },
    { name: "EmailVendedor", value: body.emailVendedor, font: fontLight, size: 12 },
    { name: "Telefone1Vendedor", value: body.telefone1Vendedor, font: fontLight, size: 12 },
    { name: "Telefone2Vendedor", value: body.telefone2Vendedor, font: fontLight, size: 12 },
    { name: "Meses", value: mes, font: fontLight, size: 12 },
    { name: "Site", value: "www.elosolutions.com.br", font: fontLight, size: 12 },
  ];