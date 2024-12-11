import { db } from "@/utils/connections"
import { NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    validateToken(authHeader)

    const query = "SELECT * FROM fatorFinanceiro"

    const [rows] = await db.query(query)

    return NextResponse.json(rows, { status: 200 })

  } catch (error) {
    console.error("Erro ao buscar os fatores financeiros, ", error)
    return NextResponse.json({ info: "Erro ao buscar os fatores financeiros" }, { status: 500 })
  }
}