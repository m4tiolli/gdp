import React from 'react'
import clsx from 'clsx'
import { Primitives } from '@/interfaces/primitives'

function Text({ children, className }: Primitives) {
  return (
    <p className={clsx(className)}>{children}</p>
  )
}

export default Text