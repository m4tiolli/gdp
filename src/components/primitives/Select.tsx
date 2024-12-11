import React from 'react'
import { Select as Base, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { ISelect } from '@/interfaces/select'

function Select({ placeholder, label, items, onChange, value }: ISelect) {
  return (
    <Base onValueChange={onChange} value={value}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items && items.map((item, index) => (
            <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Base>
  )
}

export default Select