import crypto from "crypto";
import { jwtDecode } from "jwt-decode";
import { AES_KEY } from "./keys";

interface JwtPayload {
  exp: number;
}

export function encryptAES(text: string) {
  const iv = crypto.randomBytes(16); // Gera um novo IV
  const cipher = crypto.createCipheriv('aes-128-cbc', AES_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Retorna o IV e o texto criptografado concatenados
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptAES(encrypted: string) {
  const parts = encrypted.split(':');

  // Verifica se o IV foi extraído corretamente
  const iv = parts.shift();
  if (!iv) {
    throw new Error("IV não encontrado no texto criptografado.");
  }

  const ivBuffer = Buffer.from(iv, 'hex'); // Extrai o IV do texto criptografado
  const encryptedText = Buffer.from(parts.join(':'), 'hex'); // A parte restante é a string criptografada

  const decipher = crypto.createDecipheriv('aes-128-cbc', AES_KEY, ivBuffer);
  let decrypted = decipher.update(encryptedText, undefined, 'utf8'); // O primeiro parâmetro é um Buffer, e o segundo é `undefined`
  decrypted += decipher.final('utf8'); // Converte o resultado final em UTF-8
  return decrypted;
}

// Função para verificar se o token JWT expirou
export function isTokenExpired(token: string): boolean {
  try {
    // Descriptografa o token antes de decodificá-lo
    const decryptedToken = decryptAES(token);

    // Decodifica o token JWT para obter o payload
    const decodedToken = jwtDecode<JwtPayload>(decryptedToken);

    // Obtém o timestamp atual em segundos
    const currentTime = Math.floor(Date.now() / 1000);

    // Verifica se o token expirou comparando o campo "exp" com o tempo atual
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Erro ao decodificar ou descriptografar o token:", error);
    return true; // Se houver erro, assume que o token é inválido ou expirado
  }
}
