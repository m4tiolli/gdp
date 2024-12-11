"use client"
import React from 'react'
import Text from '@/components/primitives/Text'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TabsNewEF from '@/components/TabsNewEF'

function NewProposal() {

  const [selectedTemplate, setSelectedTemplate] = React.useState("")

  const tabRef = React.useRef<HTMLDivElement>(null)

  const handleChangeTemplate = (e: string) => {
    setSelectedTemplate(e)
    setTimeout(() => {
      tabRef.current?.scrollIntoView()
    }, 200);
  }

  return (
    <div className='flex flex-col items-start justify-start gap-6'>
      <Text className='font-bold text-4xl text-azul'>Criar nova proposta</Text>
      <Select onValueChange={(e) => handleChangeTemplate(e)} value={selectedTemplate}>
        <SelectTrigger className='w-96'>
          <SelectValue placeholder="Selecione o modelo de proposta" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Modelos</SelectLabel>
            <SelectItem value="EF">Eficiência energética</SelectItem>
            <SelectItem value="SC">Serviço de campo</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedTemplate === "EF" && <TabsNewEF tabRef={tabRef} />}

    </div>
  )
}

export default NewProposal