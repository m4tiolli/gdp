import { Token } from "@/types/token";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "";

export function validateToken(authHeader: string | null): Token {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token não fornecido ou inválido");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    if (typeof decoded !== "object" || !decoded) {
      throw new Error("Formato de token inválido");
    }

    const tokenData: Token = decoded as Token;

    return tokenData;
  } catch (error) {
    console.error(error);
    throw new Error("Token inválido ou expirado");
  }
}
