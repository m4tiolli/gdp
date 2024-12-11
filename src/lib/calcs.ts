import { schema } from "@/schemas/ef.schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const calcularValorTotal = (form: UseFormReturn<z.infer<typeof schema>>) => {
  const potencia = parseFloat(form.getValues("potenciaEquipamento")) || 0;
  const valorConta = parseFloat(form.getValues("valorConta").replace(/[^\d,]/g, "").replace(",", ".")) || 0;
  const fatorFinanceiro = parseFloat(form.getValues("duracaoContrato")) || 0;

  console.table([
    "Potência * Fator: " + potencia * fatorFinanceiro,
    "Valor da conta: " + valorConta,
    "5% Conta de energia: " + (valorConta * 0.05),
    "10% Conta de energia: " + (valorConta * 0.1),
  ]);

  let valorTotal = 0;

  if ((potencia * fatorFinanceiro) < (valorConta * 0.05)) {
    valorTotal = (valorConta * 0.05);
  } else if ((potencia * fatorFinanceiro) > (valorConta * 0.10)) {
    valorTotal = (valorConta * 0.10);
  } else {
    valorTotal = (potencia * fatorFinanceiro);
  }

  form.setValue("valorTotal", valorTotal.toFixed(2).toString());
};