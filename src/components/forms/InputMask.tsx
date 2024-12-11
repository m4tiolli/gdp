import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input as InputBase } from "@/components/ui/input"
import { schema } from '@/schemas/ef.schema'
import { z } from 'zod'
import { FormEF } from '@/types/form.ef'
import { InputMask } from '@react-input/mask'

interface IFormInput {
  form: FormEF,
  name: keyof z.infer<typeof schema>,
  label: string,
  placeholder: string,
  mask?: string,
  value: string,
  onBlur?: (() => void),
  onChange?: (() => void)
}

function InputMasked({ form, name, label, placeholder, mask, onBlur }: IFormInput) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputMask {...field} placeholder={placeholder} component={InputBase} mask={mask} value={field.value} onChange={field.onChange} replacement="_" onBlur={onBlur} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputMasked