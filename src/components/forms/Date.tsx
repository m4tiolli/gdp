import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { schema } from '@/schemas/ef.schema'
import { z } from 'zod'
import { FormEF } from '@/types/form.ef'
import DatePicker from '../primitives/DatePicker'

interface IFormDate {
  form: FormEF,
  name: keyof z.infer<typeof schema>,
  label: string,
}

function Date({ form, name, label }: IFormDate) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePicker {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Date