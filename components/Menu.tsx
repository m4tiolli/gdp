import { MenuButtons } from '@/mocks/MenuButtons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaLock } from 'react-icons/fa'

function Menu() {
  return (
    <>
      <div className='w-[4rem] h-[calc(100dvh-4rem) mt-16'>&nbsp;</div>
      <div className='w-[4rem] h-[calc(100dvh-4rem) mt-16 bg-white absolute top-0 left-0 transition-all hover:w-[15%] cursor-pointer shadow-md overflow-x-clip'>
        <div className="relative flex flex-col items-start justify-between p-2 h-full w-[15vw]">
          <Image src={'../logo-variant.svg'} width={180} height={120} loading='eager' alt='Logo' className='ml-1' />
          <div>
            {MenuButtons.map((button, index) => (
              <Button {...button} key={index} />
            ))}
          </div>
          <Button text='Sair' link='/sair' icon={<FaLock className='text-4xl' />} color='#d84c4c' />
        </div>
      </div>
    </>
  )
}

interface IButton {
  text: string;
  link: string;
  icon: React.ReactElement;
  color?: string
}

const Button = ({ text, link, icon, color }: IButton) => (
  <Link href={link} className='flex items-center justify-start gap-4 hover:bg-[#00000022] transition-all p-2 rounded-md' style={{ color: color ?? '#38457a' }}>
    {icon}
    <p className='text-sm font-bold'>
      {text}
    </p>
  </Link>
)

export default Menu