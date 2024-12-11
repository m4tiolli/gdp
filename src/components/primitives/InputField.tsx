"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { InputData } from '@/interfaces/input'

function InputField({form, name, label, placeholder, type}: InputData) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-azul'>{label}</FormLabel>
          <FormControl>
            <Input type={type ?? "text"} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputField