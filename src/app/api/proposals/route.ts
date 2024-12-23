import { db } from "@/utils/connections";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { code, table } = await req.json();

    const allowedTables = ["propostasEF", "propostasSCHH"];
    if (!allowedTables.includes(table)) {
      return NextResponse.json(
        { info: "Tabela inválida." },
        { status: 400 }
      );
    }

    const query = `DELETE FROM ${table} WHERE codigoProposta = ?`;
    await db.query(query, [code]);

    return NextResponse.json(
      { info: "Proposta deletada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { info: "Ocorreu um erro ao deletar a proposta." },
      { status: 500 }
    );
  }
}
