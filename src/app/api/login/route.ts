import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/utils/connections";
import { RowDataPacket } from "mysql2/promise";
import { z } from "zod";

// Validação de dados de login
const loginSchema = z.object({
  email: z.string().email("Email inválido."),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export async function POST(req: Request) {
  try {
    const { email, senha } = loginSchema.parse(await req.json());

    const query = "SELECT * FROM usuario WHERE email = ?";
    const [rows] = await db.query<RowDataPacket[]>(query, [
      email.toLowerCase(),
    ]);

    if (rows.length === 0) {
      return NextResponse.json({ errorType: "INVALID_EMAIL" }, { status: 404 });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return NextResponse.json({ errorType: "INVALID_PASSWORD" }, { status: 401 });
    }

    // Geração do token JWT
    const token = jwt.sign(
      { id: user.id, nome: user.nome },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ auth: true, token, expiresIn: "1h" }, { status: 200 });

  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

export const revalidate = 0