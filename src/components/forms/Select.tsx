import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import * as SelectBase from "@/components/primitives/Select"
import { schema } from '@/schemas/ef.schema'
import { z } from 'zod'
import { FormEF } from '@/types/form.ef'
import { ItemsSelect } from '@/interfaces/select'

interface IFormInput {
  form: FormEF,
  name: keyof z.infer<typeof schema>,
  label: string,
  placeholder: string,
  items?: ItemsSelect[]
}

function Select({ form, name, label, placeholder, items }: IFormInput) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <SelectBase.default onChange={field.onChange} placeholder={placeholder} label="Cadastro" items={items} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Select