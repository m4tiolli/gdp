import { Primitives } from '@/interfaces/primitives'
import clsx from 'clsx'
import React from 'react'

function Box({ children, className }: Primitives) {
  return (
    <div className={clsx('block', className)}>{children}</div>
  )
}

export default Box