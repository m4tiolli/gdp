import { z } from "zod"

const formSchema = z.object({
  email: z.string().email({
    message: "Digite um e-mail válido",
  }),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.")
})

export default formSchema