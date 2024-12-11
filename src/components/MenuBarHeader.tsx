import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from 'next/link'


function MenuBarHeader({ nome }: { nome: string }) {

  function getInitials(text: string) {
    if (text) {
      const words = text.split(" ");

      if (words.length >= 2) {
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
      }
    }

    return "ES";
  }

  return (
    <>
      <Menubar className='border-none '>
        <MenubarMenu>
          <MenubarTrigger className='rounded-full grid place-items-center size-10 bg-vermelho p-0 focus:bg-vermelho focus:text-white data-[state=open]:bg-vermelho data-[state=open]:text-white cursor-pointer hover:bg-vermelhotp'>
            <h1 className='text-white font-extrabold text-xl'>{getInitials(nome)}</h1>
          </MenubarTrigger>
          <MenubarContent>
            <h1 className='font-bold px-2 py-2'>{nome}</h1>
            <MenubarSeparator />
            <MenubarItem><Link href={"/editar-dados"}>
              Editar dados
            </Link></MenubarItem>
            <MenubarSeparator />
            <MenubarItem><Link href={"/administrativo"}>
              Administrativo
            </Link></MenubarItem>
            <MenubarSeparator />
            <MenubarItem className='text-vermelho'>
              <Link href={"/sair"}>
                Sair
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

    </>
  )
}

export default MenuBarHeader