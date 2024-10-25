import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/utils/connections";
import { RowDataPacket } from "mysql2/promise";
import { z } from "zod"; // Validação de entrada
import { decryptAES, encryptAES } from "@/utils/verifications";

// Validação de dados de login
const loginSchema = z.object({
  email: z.string().email("Email inválido."),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export async function POST(req: Request) {
  try {
    const { s } = await req.json()
    const payload = decryptAES(s)

    const { email, senha } = loginSchema.parse(JSON.parse(payload));

    const query = "SELECT * FROM usuario WHERE email = ?";
    const [rows] = await db.query<RowDataPacket[]>(query, [
      email.toLowerCase(),
    ]);

    if (rows.length === 0) {
      return NextResponse.json({ emailInvalid: true }, { status: 404 });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return NextResponse.json({ passwordInvalid: true }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, nome: user.nome }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Criptografando o token JWT
    const encryptedToken = encryptAES(token);

    const response = { auth: true, token: encryptedToken }

    return NextResponse.json({ s: encryptAES(JSON.stringify(response)) }, { status: 200 });

  } catch (error) {

    console.error("Erro ao fazer login:", error);

    return NextResponse.json(error, { status: 500 });
  }
}
