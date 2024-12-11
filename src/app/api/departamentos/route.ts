import { db } from "@/utils/connections"
import { NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    validateToken(authHeader);

    const query = "SELECT * FROM departamentos ORDER BY nome";
    const [rows] = await db.query(query);

    const formattedRows = (rows as Array<any>).map((row: any) => ({
      label: row.nome,
      value: row.nome,
    }));

    return NextResponse.json(formattedRows, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar os departamentos, ", error);
    return NextResponse.json({ info: "Erro ao buscar os departamentos" }, { status: 500 });
  }
}
