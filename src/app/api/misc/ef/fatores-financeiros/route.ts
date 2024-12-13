import { validateToken } from "@/lib/auth"
import { db } from "@/utils/connections"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {

    const authHeader = await req.headers.get("authorization")
    validateToken(authHeader)

    const query = "SELECT * FROM fatorFinanceiro"

    const [rows] = await db.query(query)

    const formattedRows = (rows as Array<any>).map((row: any) => ({
      label: row.meses + " meses de contrato",
      value: row.meses.toString(),
    }));

    return NextResponse.json(formattedRows, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ info: "Erro ao buscar os fatores financeiros." }, { status: 500 })
  }
}