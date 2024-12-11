import React from 'react'
import { Button as Base } from "../ui/button";
import { Children } from '@/types/children';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface IButton {
  children: Children,
  className?: string,
  loading?: boolean,
  type?: "submit" | "reset" | "button" | undefined,
  onClick?: () => void
}

function Button({ children, className, loading, onClick, type }: IButton) {
  return (
    <Base type={type ?? undefined} onClick={onClick} className={clsx('w-full', className)}>{loading ? <Loader2 className="animate-spin" /> : children}</Base>
  )
}

export default Button