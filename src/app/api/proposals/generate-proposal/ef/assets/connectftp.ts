import { Client } from "basic-ftp";
import 'dotenv'

export async function connectFTP(client: Client) {

  const FTP_HOST = process.env.FTP_HOST
  const FTP_USER = process.env.FTP_USER
  const FTP_PASSWORD = process.env.FTP_PASSWORD

  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: false,
  });

}