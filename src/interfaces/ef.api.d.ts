import { schema } from "@/schemas/ef.schema"
import { z } from "zod"

export type CadastroElo = "Recuperadora" | "Serviços"

export interface Body extends z.infer<typeof schema> {
  elo?: "Recuperadora" | "Serviços"
}