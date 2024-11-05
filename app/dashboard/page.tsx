"use client"
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import * as C from '@chakra-ui/react'

function Dashboard() {
  const { tokenData } = useAuth()
  return (
    <C.Flex className='h-[calc(100dvh-4rem)] p-4 px-[10vw] gap-8 flex-col items-start justify-start bg-opacity-40 bg-white'>
      <C.Text className='text-2xl text-azul font-bold'>Olá, {tokenData?.nome}!</C.Text>
      <C.Flex className='items-center justify-between w-full'>
        <C.Flex className='bg-vermelho text-white rounded-md px-4 py-6 items-center gap-4 justify-center w-[30vw] cursor-pointer hover:scale-105 transition-all'>
          <C.Text className='text-7xl font-extrabold'>130</C.Text>
          <C.Text className='text-2xl font-light'>propostas feitas neste ano</C.Text>
        </C.Flex>
        <C.Flex className='bg-azul text-white rounded-md px-4 py-6 items-center gap-4 justify-center w-[30vw] cursor-pointer hover:scale-105 transition-all'>
          <C.Text className='text-7xl font-extrabold'>130</C.Text>
          <C.Text className='text-2xl font-light'>propostas feitas por você</C.Text>
        </C.Flex>
      </C.Flex>
      <C.Flex className='justify-between items-start w-full'>
        <C.Flex className='flex-col gap-4 w-[30vw]'>
          <C.Text className="text-2xl text-azul font-bold">Ações</C.Text>
          <C.Button colorScheme='azul'>Criar nova proposta</C.Button>
          <C.Button colorScheme='azul'>Visualizar uma proposta</C.Button>
          <C.Button colorScheme='azul'>Editar uma proposta</C.Button>
        </C.Flex>
        <C.Flex className='flex-col gap-4 w-[30vw]'>
          <C.Text className="text-2xl text-azul font-bold">Histórico de propostas</C.Text>
        </C.Flex>
      </C.Flex>

    </C.Flex>
  )
}

export default Dashboard