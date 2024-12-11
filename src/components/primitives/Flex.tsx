import { Primitives } from '@/interfaces/primitives'
import clsx from 'clsx'
import React from 'react'

function Flex({ children, className }: Primitives) {
  return (
    <div className={clsx('flex items-center justify-center', className)}>{children}</div>
  )
}

export default Flex