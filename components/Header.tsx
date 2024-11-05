import React from 'react'
import logo from '../public/logo-variant.svg'
import Image from 'next/image'

function Header() {
  return (
    <div className='w-full h-[4rem] bg-white flex items-center justify-center py-2 shadow-md'>
      <Image src={logo} width={180} height={100} alt='Logo' />
    </div>
  )
}

export default Header