import { MenuButtons } from '@/mocks/MenuButtons'
import Image from 'next/image'
import React from 'react'
import sair from '../public/icons/Sair.svg'
import { Button } from './ButtonMenu'

function Menu() {
  return (
    <div className='flex flex-col items-start justify-center'>
      <div className='h-16 w-16 grid place-items-center z-20 relative bg-white'>
        <Image src={'../rings.svg'} alt='Logo' width={50} height={48} />
      </div>
      <div className='relative h-[calc(100dvh-4rem)] z-20 menu'>
        <div className='w-[4rem] h-full'>&nbsp;</div>
        <div className='w-[4rem] h-full bg-white absolute left-0 top-0 transition-all hover:w-[15vw] cursor-pointer shadow-md overflow-x-clip'>
          <div className="relative flex flex-col items-start justify-between pt-24 p-2 h-full w-[15vw]">
            <div className='flex flex-col items-start gap-2'>
              {MenuButtons.map((button, index) => (
                <Button {...button} key={index} />
              ))}
            </div>
            <Button text='Sair' link='/sair' icon={sair} color='#d84c4c' />
          </div>
        </div>
      </div>
      <div className='fixed top-0 right-0 w-[85vw] h-screen bg-[#0000006c] z-10 invisible transition-all opacity-0 bg'>&nbsp;</div>
    </div>
  )
}

export default Menu