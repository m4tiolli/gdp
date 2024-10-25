import crypto from "crypto";

// Chave como string hexadecimal
const hexKey = process.env.HEX_KEY || "456c6f536f6c7574696f6e7340474450";
// Converte a string hexadecimal em um Buffer
export const AES_KEY = Buffer.from(hexKey, 'hex'); // Chave deve ter exatamente 32 bytes

// Vetor de inicialização (IV)
export const AES_IV = crypto.randomBytes(16); // 16 bytes para o IV
