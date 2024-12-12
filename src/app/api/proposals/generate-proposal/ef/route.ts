import fs, { PathOrFileDescriptor } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import path from "path";
import { FieldPacket, RowDataPacket } from "mysql2/promise";
import { Client } from "basic-ftp";
import { Readable } from "stream";
import { fields } from "./assets/fields";
import { db } from "@/utils/connections";
import { Body, FatorFinanceiro } from "@/interfaces/ef.api";
import { validateToken } from "@/lib/auth";
import { formatDate } from "./assets/formats";
import 'dotenv/config'
import { connectFTP } from "./assets/connectftp";


export async function POST(req: NextRequest) {
  try {

    const body: Body = await req.json();

    const authHeader = req.headers.get("authorization")

    const token = validateToken(authHeader)
    const pdfPathRecuperadora = path.resolve("src/app/api/proposals/generate-proposal/ef/assets/TemplateRecuperadora.pdf")
    const pdfPathServicos = path.resolve("src/app/api/proposals/generate-proposal/ef/assets/TemplateServicos.pdf")

    const pdfPath = body.cadastroElo === "R" ? pdfPathRecuperadora : pdfPathServicos

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
      fontLight
    }).forEach(({ name, value, font, size }) => {
      const field = form.getTextField(name);
      field.setFontSize(size);
      field.setText(value);
      field.updateAppearances(font);
    });

    form.flatten();
    const pdfBytesFilled = await pdfDoc.save();
    const propostaNome = body.codigoProposta.replace(/ /g, "_");

    const client = new Client();

    try {

      await connectFTP(client)

      const bufferStream = new Readable();
      bufferStream.push(pdfBytesFilled);
      bufferStream.push(null);

      await client.uploadFrom(
        bufferStream,
        "propostas/" + propostaNome + ".pdf"
      );
      console.log("PDF salvo com sucesso no servidor FTP!");

      const downloadLink = `https://elosolutions.com.br/propostas/${propostaNome}.pdf`;

      const numeroProposta = body.codigoProposta.slice(5, 10)

      const [fatoresFinanceiros]: [FatorFinanceiro[], FieldPacket[]] = await db.query<FatorFinanceiro[]>(
        "SELECT * FROM fatorFinanceiro WHERE meses = ?",
        [body.duracaoContrato]
      );

      const fatorFinanceiroId = fatoresFinanceiros[0].id

      const ano = new Date().getFullYear();
      const query =
        "INSERT INTO propostasEF (anoProposta, idUsuario, codigoProposta, nomeEmpresa, razaoEmpresa, cnpjEmpresa, nomeTomador, departamentoTomador, emailTomador, telefoneTomador, potenciaEquipamento, valorTotal, fatorFinanceiroId, duracaoContrato, linkPdf, dataProposta, valorContaEnergia, cadastroElo, numeroProposta) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
        body.duracaoContrato,
        downloadLink,
        formatDate(body.dataProposta),
        body.valorContaEnergia,
        body.cadastroElo,
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