import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React from "react"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { schema, useForm } from "@/schemas/ef.schema"
import Section from "./forms/Section"
import { inputsEF } from "@/mocks/inputsEF"
import Button from "./primitives/Button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { InputMask } from '@react-input/mask'
import { Input } from "./ui/input"
import Select from "./primitives/Select"
import DatePicker from "./primitives/DatePicker"
import { Body } from "@/interfaces/ef.api"
import { getDepartamentos, getFatoresFinanceiros, getNextProposals, getUserInfo, post } from "@/lib/fetchs"
import { useAuth } from "@/hooks/useAuth"
import { AxiosResponse } from "axios"
import { useToast } from "@/hooks/use-toast"
import { ItemsSelect } from "@/interfaces/select"
import { ToastAction } from "./ui/toast"

export default function TabsNewEF({ tabRef }: { tabRef: React.RefObject<HTMLDivElement> }) {

  const [currentStep, setCurrentStep] = React.useState("1")
  const [loading, setLoading] = React.useState(false)
  const [nextProposals, setNextProposals] = React.useState({ propostaRecuperadora: "", propostaServicos: "" })
  const [departamentos, setDepartamentos] = React.useState<ItemsSelect[]>([])
  const [fatoresFinanceiros, setFatoresFinanceiros] = React.useState<ItemsSelect[]>([])
  const [link, setLink] = React.useState<{ downloadLink: string }>()
  const { token, tokenData } = useAuth()
  const { toast } = useToast()
  const { form } = useForm()

  const cadastroElo = form.watch("cadastroElo")

  const handleNextStep = () => {
    const atualStep = parseInt(currentStep)
    const nextStep = atualStep + 1
    setCurrentStep(nextStep.toString())
  }

  function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true)
    const body: Body = values
    console.log(body);

    const treatResponse = (response: AxiosResponse<any, any>) => {
      setLink(response.data.downloadLink)
      toast({
        title: "Sucesso",
        description: "Proposta gerada!",
        action: <ToastAction altText="Ver PDF" onClick={() => window.open(link?.downloadLink, "_blank")}>Ver PDF</ToastAction>
      });
    }
    const response = post("/api/proposals/generate-proposal/ef", token ?? "", body)
    response.then((response) => treatResponse(response)).catch(err => console.error(err))
    setLoading(false)
  }

  React.useEffect(() => {
    if (token) {
      Promise.all([
        getNextProposals(token ?? "", setNextProposals),
        getDepartamentos(token ?? "", setDepartamentos),
        getFatoresFinanceiros(token ?? "", setFatoresFinanceiros),
        getUserInfo(token ?? "", form, tokenData?.id as number)
      ])
    }
  }, [token, tokenData, form])

  React.useEffect(() => {
    if (nextProposals.propostaRecuperadora && nextProposals.propostaServicos) {
      form.setValue(
        "codigoProposta",
        cadastroElo === "Recuperadora" ? nextProposals.propostaRecuperadora : nextProposals.propostaServicos
      );
    }
  }, [form, nextProposals, cadastroElo]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Tabs value={currentStep} onValueChange={(e) => setCurrentStep(e)} ref={tabRef}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value={"1"}>Dados da proposta</TabsTrigger>
            <TabsTrigger value={"2"}>Dados do contrato</TabsTrigger>
            <TabsTrigger value={"3"}>Dados do vendedor</TabsTrigger>
            <TabsTrigger value={"4"}>Dados do tomador</TabsTrigger>
          </TabsList>

          {inputsEF(form, departamentos, fatoresFinanceiros).map((field, i) => (
            <Section {...field} key={i}>
              {field.inputs.map((input, j) => (
                <FormField
                  key={j}
                  control={form.control}
                  name={input.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-azul">{input.label}</FormLabel>
                      <FormControl>
                        <span>
                          {input.type === "currency" &&
                            <Input
                              {...field}
                              placeholder={input.placeholder}
                              onChange={(e) => input.onChange?.(e, field) || undefined}
                              value={field.value}
                              onBlur={input.onBlur}
                            />
                          }
                          {input.type === "input" &&
                            <Input
                              {...field}
                              placeholder={input.placeholder}
                            />
                          }
                          {input.type === "select" &&
                            <Select
                              {...field}
                              items={input.items}
                              label={input.label}
                              placeholder={input.placeholder}
                            />
                          }
                          {input.type === "date" &&
                            <DatePicker {...input} onChange={field.onChange} value={field.value} key={j} />
                          }
                          {input.type === "masked" &&
                            <InputMask {...input} component={Input} value={field.value} onChange={field.onChange} mask={input.mask} replacement={input.replacement as string} />
                          }
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {i < inputsEF(form, departamentos, fatoresFinanceiros).length - 1 ? <Button type="button" onClick={handleNextStep} key={i} className="">Próximo</Button> : <Button type="submit" loading={loading} key={i}>Finalizar</Button>}
            </Section>
          ))}
        </Tabs>
      </form>
    </Form >
  )
}
