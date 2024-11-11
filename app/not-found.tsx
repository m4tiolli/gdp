import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Link from 'next/link';
import React from 'react'
import { HiOutlineEmojiSad } from "react-icons/hi";

function NotFound() {
  return (

    <div className="flex items-center justify-center min-h-screen w-screen bg-white">
      <Menu />
      <div className="w-[calc(100%-4rem)] min-h-screen z-0">
        <Header />
        <div className='h-[calc(100dvh-4rem)] w-full bg-pattern'>
          <div className="bg-white bg-opacity-40 w-full h-full grid place-items-center">
            <div className="flex flex-col items-center justify-center gap-4 backdrop-blur-sm w-fit h-fit p-6 rounded-md">
              <HiOutlineEmojiSad className="text-azul text-6xl" />
              <h1 className="font-regular text-azul text-lg">A página que você está tentando acessar não existe.</h1>
              <Link href={'/dashboard'} className='bg-azul text-md text-white rounded-md px-6 py-2 hover:scale-105 transition-all'>Voltar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound