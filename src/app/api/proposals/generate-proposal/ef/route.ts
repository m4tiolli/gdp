import fs, { PathOrFileDescriptor } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import path from "path";
import { RowDataPacket } from "mysql2/promise";
import { Client } from "basic-ftp";
import { Readable } from "stream";
import { fields } from "./assets/fields";
import { formatCNPJ, formatDate, formatValor } from "./assets/formats";
import { db } from "@/utils/connections";
import { Body } from "@/interfaces/ef.api";
import { validateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();

    const authHeader = req.headers.get("authorization")

    const token = validateToken(authHeader)
    const pdfPathRecuperadora = path.resolve("src/app/api/proposals/generate-proposal/ef/assets/TemplateRecuperadora.pdf")
    const pdfPathServicos = path.resolve("src/app/api/proposals/generate-proposal/ef/assets/TemplateServicos.pdf")

    const pdfPath = body.elo === "Recuperadora" ? pdfPathRecuperadora : pdfPathServicos

    const pdfBytes = fs.readFileSync(pdfPath as PathOrFileDescriptor);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontLightBytes = fs.readFileSync(
      path.resolve("src/app/api/proposals/generate-proposal/ef/assets/SignikaNegative-Light.ttf")
    );
    const fontLight = await pdfDoc.embedFont(fontLightBytes);
    const fontBoldBytes = fs.readFileSync(
      path.resolve("src/app/api/proposals/generate-proposal/ef/assets/SignikaNegative-Regular.ttf")
    );
    const fontBold = await pdfDoc.embedFont(fontBoldBytes);

    const form = pdfDoc.getForm();

    fields({
      body,
      fontBold,
      fontLight,
      formatDate,
      formatCNPJ,
      formatValor,
    }).forEach(({ name, value, font, size }) => {
      const field = form.getTextField(name);
      field.setFontSize(size);
      field.setText(value);
      field.updateAppearances(font);
    });

    form.flatten();
    const pdfBytesFilled = await pdfDoc.save();
    body.codigoProposta.replace(/ /g, "_");
    const propostaNome = body.codigoProposta;

    const client = new Client();
    try {
      await client.access({
        host: "77.37.127.193",
        user: "u867338340.GeradorProposta1122",
        password: "Elo@1122",
        secure: false,
      });

      const bufferStream = new Readable();
      bufferStream.push(pdfBytesFilled);
      bufferStream.push(null);

      await client.uploadFrom(
        bufferStream,
        "/propostas/" + propostaNome + ".pdf"
      );
      console.log("PDF salvo com sucesso no servidor FTP!");

      const downloadLink = `https://elosolutions.com.br/propostas/${propostaNome}.pdf`;

      const numeroProposta = body.codigoProposta.slice(-5)

      const ano = new Date().getFullYear();
      const query =
        "INSERT INTO propostasEF (ano, id_usuario, proposta, nomeEmpresa, razaoEmpresa, cnpjEmpresa, tomador, departamento, email, telefone, potencia, valor, fatorFinanceiro_id, meses, link_pdf, data, contaEnergia, elo, numeroProposta) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      await db.query<RowDataPacket[]>(query, [
        ano,
        token.id,
        body.codigoProposta,
        body.nomeEmpresa,
        body.razaoEmpresa,
        body.cnpjEmpresa,
        body.nomeTomador,
        body.departamentoTomador,
        body.emailTomador,
        body.telefoneTomador,
        body.potenciaEquipamento,
        body.valorTotal,
        fatorFinanceiroId,
        meses,
        downloadLink,
        formatDate(body.dataProposta),
        body.valorConta,
        body.elo,
        parseInt(numeroProposta)
      ]);

      return NextResponse.json({ downloadLink });
    } catch (error) {
      console.error("Erro ao salvar PDF no FTP:", error);
      return NextResponse.json(
        { message: "Error saving PDF to FTP" },
        { status: 500 }
      );
    } finally {
      client.close();
    }
  } catch (error) {
    console.error("Error filling PDF:", error);
    return NextResponse.json(
      { message: "Error filling PDF" },
      { status: 500 }
    );
  }
}