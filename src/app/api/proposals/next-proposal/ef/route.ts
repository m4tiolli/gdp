import { db } from "@/utils/connections";
import { RowDataPacket } from "mysql2/promise";
import { NextResponse } from "next/server";

interface PropostaRow extends RowDataPacket {
  maxId: number | null;
}

export const revalidate = 0;

export async function GET() {
  try {
    const anoAtual = new Date().getFullYear();
    const finalAno = anoAtual.toString().slice(2, 4)

    const [rowsServicos] = await db.query<PropostaRow[]>(
      'SELECT MAX(numeroProposta) AS maxIdServicos FROM propostasEF WHERE ano = ? AND elo = \'S\'',
      [anoAtual]
    );

    const [rowsRecuperadora] = await db.query<PropostaRow[]>(
      'SELECT MAX(numeroProposta) AS maxIdRecuperadora FROM propostasEF WHERE ano = ? AND elo = \'R\'',
      [anoAtual]
    );

    const maxIdServicos = rowsServicos[0]?.maxIdServicos ?? 0;
    const maxIdRecuperadora = rowsRecuperadora[0]?.maxIdRecuperadora ?? 0;

    const proximoIdServicos = maxIdServicos + 1;
    const proximoIdRecuperadora = maxIdRecuperadora + 1;

    const propostaServicos = `ELOEF ${String(proximoIdServicos).padStart(4, '0')}S${finalAno}`;
    const propostaRecuperadora = `ELOEF ${String(proximoIdRecuperadora).padStart(4, '0')}R${finalAno}`;

    const proposta = { propostaRecuperadora, propostaServicos };

    return NextResponse.json(proposta);
  } catch (error) {
    console.error("Erro ao gerar a proposta:", error);
    return NextResponse.json({ info: "Erro ao gerar a proposta" }, { status: 500 });
  }
}