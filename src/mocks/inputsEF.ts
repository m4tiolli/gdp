import { ItemsSelect } from "@/interfaces/select";
import { calcularValorTotal } from "@/lib/calcs";
import { searchCNPJ } from "@/lib/fetchs";
import { formatCurrency } from "@/lib/formats";
import { schema } from "@/schemas/ef.schema";
import { FormEF } from "@/types/form.ef";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

interface IInputEF {
  type: "input" | "select" | "date" | "masked" | "currency";
  form: FormEF;
  name: keyof z.infer<typeof schema>;
  label: string;
  placeholder: string;
  mask?: string;
  onBlur?: () => void;
  replacement?: string | object;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, field?: ControllerRenderProps<FormEF>) => void;
  items?: ItemsSelect[]
}

interface ICategoriaEF {
  categoria: string;
  value: string;
  title: string;
  description: string;
  inputs: IInputEF[];
}

export const inputsEF: (form: FormEF, departamentos: ItemsSelect[], fatoresFinanceiros: ItemsSelect[]) => ICategoriaEF[] = (form, departamentos, fatoresFinanceiros) => [
  {
    categoria: "dadosProposta",
    value: "1",
    title: "Dados da proposta",
    description: "Informações como código, data e dados da empresa",
    inputs: [
      {
        type: "select",
        form: form,
        name: "cadastroElo",
        label: "Cadastro da Elo",
        placeholder: "Selecione o cadastro da Elo",
        items: [
          {
            value: "Recuperadora",
            label: "Elo Recuperadora"
          },
          {
            value: "Serviços",
            label: "Elo Serviços"
          }
        ]
      },
      {
        type: "input",
        form: form,
        name: "codigoProposta",
        label: "Código da proposta",
        placeholder: "ELOEF 0000S24",
      },
      {
        type: "select",
        form: form,
        name: "duracaoContrato",
        label: "Duração do contrato",
        placeholder: "Selecione a duração do contrato",
        items: fatoresFinanceiros
      },
      {
        type: "date",
        form: form,
        name: "dataProposta",
        label: "Data da proposta",
        placeholder: "",
      },
      {
        type: "masked",
        form: form,
        name: "cnpjEmpresa",
        label: "CNPJ da empresa",
        placeholder: "CNPJ",
        mask: "__.___.___/____-__",
        onBlur: () => searchCNPJ(form),
        replacement: "_"
      },
      {
        type: "input",
        form: form,
        name: "nomeEmpresa",
        label: "Nome fantasia da empresa",
        placeholder: "Nome fantasia da empresa",
      },
      {
        type: "input",
        form: form,
        name: "razaoEmpresa",
        label: "Razão social da empresa",
        placeholder: "Razão social da empresa",
      },
    ],
  },
  {
    categoria: "dadosContrato",
    value: "2",
    title: "Dados do contrato",
    description: "Informações como valores técnicos usados para calcular o valor da proposta.",
    inputs: [
      {
        type: "input",
        form: form,
        name: "potenciaEquipamento",
        label: "Potência em KVA do equipamento",
        placeholder: "Potência em KVA do equipamento",
        mask: "____ KVA",
        replacement: { _: /\d/ }
      },
      {
        type: "currency",
        form: form,
        name: "valorConta",
        label: "Valor da conta de energia em R$",
        placeholder: "Valor da conta de energia em R$",
        onBlur: () => calcularValorTotal(form),
        value: form.getValues("valorConta"),
        onChange: (e, field) => {
          const formattedValue = formatCurrency(e.target.value);
          if (field) field.onChange(formattedValue);
        }
      },
      {
        type: "currency",
        form: form,
        name: "valorTotal",
        label: "Valor total em R$",
        placeholder: "Valor total em R$",
        value: form.getValues("valorTotal"),
        onChange: (e, field) => {
          const formattedValue = formatCurrency(e.target.value);
          if (field) field.onChange(formattedValue);
        }
      },
    ],
  },
  {
    categoria: "dadosVendedor",
    value: "3",
    title: "Dados do vendedor",
    description: "Informações como nome, email e telefone do vendedor.",
    inputs: [
      {
        type: "input",
        form: form,
        name: "nomeVendedor",
        label: "Nome do vendedor",
        placeholder: "Nome do vendedor",
      },
      {
        type: "input",
        form: form,
        name: "emailVendedor",
        label: "Email do vendedor",
        placeholder: "Email do vendedor",
      },
      {
        type: "masked",
        form: form,
        name: "telefone1Vendedor",
        label: "Telefone 1 do vendedor",
        placeholder: "Telefone 1 do vendedor",
        mask: "(__) _____-____",
        replacement: "_"
      },
      {
        type: "masked",
        form: form,
        name: "telefone2Vendedor",
        label: "Telefone 2 do vendedor",
        placeholder: "Telefone 2 do vendedor",
        mask: "(__) ____-____",
        replacement: "_"
      },
      {
        type: "select",
        form: form,
        name: "departamentoVendedor",
        label: "Departamento do vendedor",
        placeholder: "Departamento do vendedor",
        items: departamentos
      },
    ],
  },
  {
    categoria: "dadosTomador",
    value: "4",
    title: "Dados do tomador",
    description: "Informações como nome, email e telefone do tomador.",
    inputs: [
      {
        type: "input",
        form: form,
        name: "nomeTomador",
        label: "Nome do tomador",
        placeholder: "Nome do tomador",
      },
      {
        type: "input",
        form: form,
        name: "emailTomador",
        label: "Email do tomador",
        placeholder: "Email do tomador",
      },
      {
        type: "masked",
        form: form,
        name: "telefoneTomador",
        label: "Telefone do tomador",
        placeholder: "Telefone do tomador",
        mask: "(__) _____-____",
        replacement: "_"
      },
      {
        type: "select",
        form: form,
        name: "departamentoTomador",
        label: "Departamento do tomador",
        placeholder: "Departamento do tomador",
        items: departamentos
      },
    ],
  },
];
