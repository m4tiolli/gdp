"use client"

import React from 'react'
import logo from '../../public/logo-variant.svg'
import Image from 'next/image'
import Button from './primitives/Button'
import Link from 'next/link'
import MenuBarHeader from './MenuBarHeader'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

function Header() {
  const { tokenData } = useAuth()
  const router = useRouter()
  return (
    <div className='w-full h-[4rem] bg-white flex items-center justify-between px-4 py-2 shadow-md'>
      <Image src={logo} width={180} height={100} alt='Logo' />
      <div className='flex items-center justify-end gap-6'>
        <nav className='flex items-center justify-center gap-4'>
          <Link href={"/dashboard"}>Home</Link>
          <Link href={"/templates"}>Templates</Link>
          <Link href={"/dashboard"}>Propostas</Link>
          <Button onClick={() => router.push("/nova-proposta")} className='font-bold'>Nova proposta</Button>
        </nav>

        <MenuBarHeader nome={tokenData?.nome as string} />
      </div>
    </div>
  )
}

export default Header