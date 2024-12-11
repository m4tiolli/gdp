import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input as InputBase } from "@/components/ui/input"
import { schema } from '@/schemas/ef.schema'
import { z } from 'zod'
import { FormEF } from '@/types/form.ef'

interface IFormInput {
  form: FormEF,
  name: keyof z.infer<typeof schema>,
  label: string,
  placeholder: string
}

function Input({form, name, label, placeholder}: IFormInput) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputBase {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Input