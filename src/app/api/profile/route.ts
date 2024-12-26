import { db } from "@/utils/connections";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { validateToken } from "@/lib/auth";

interface Usuario extends RowDataPacket {
  id: number;
  nome: string;
  departamento: string;
  telefone1: string;
  telefone2: string;
  email: string;
  senha: string;
  administrador: boolean;
  assinatura: string;
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const searchParams = req.nextUrl.searchParams
    validateToken(authHeader);

    const id = searchParams.get('id')

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const query = `SELECT * FROM usuario WHERE id = ?`;
    const [rows] = await db.query<Usuario[]>(query, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ info: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error);
    return NextResponse.json({ info: "Erro ao buscar os dados do usuário" }, { status: 500 });
  }
}
