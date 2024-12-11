import { validateToken } from "@/lib/auth";
import { db } from "@/utils/connections";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    validateToken(authHeader)

    const query = "SELECT u.id AS id_usuario, u.nome AS nome_usuario, u.email AS email_usuario, p.proposta AS numero_proposta, p.elo AS elo_proposta, p.link_pdf AS link_pdf_proposta, p.nome_tabela AS tabela_origem FROM usuario u INNER JOIN ( SELECT proposta, elo, link_pdf, id_usuario AS usuario_id, 'propostasEF' AS nome_tabela FROM propostasEF UNION ALL SELECT proposta, elo, link_pdf, id_vendedor AS usuario_id, 'propostasSCHH' AS nome_tabela FROM propostasSCHH ) AS p ON u.id = p.usuario_id;"

    const [rows] = await db.query(query)

    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ "error": "Erro no servidor" }, { status: 500 })
  }
}