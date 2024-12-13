import { validateToken } from "@/lib/auth";
import { db } from "@/utils/connections";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    validateToken(authHeader);

    const query = `SELECT u.id AS idUsuario,
          u.nome AS nomeUsuario,
          p.codigoProposta,
          p.numeroProposta,
          p.cadastroElo,
          p.linkPdf
     FROM usuario u
    INNER JOIN (
             SELECT codigoProposta,
                    numeroProposta,
                    cadastroElo,
                    linkPdf,
                    idUsuario,
                    'propostasEF' AS nomeTabela
               FROM propostasEF
          UNION ALL
             SELECT codigoProposta,
                    numeroProposta,
                    cadastroElo,
                    linkPdf,
                    idUsuario,
                    'propostasSCHH' AS nomeTabela
               FROM propostasSCHH
          ) AS p ON u.id=p.idUsuario;`;

    const [rows] = await db.query(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ "error": "Erro no servidor" }, { status: 500 });
  }
}
