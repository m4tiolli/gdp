"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Sair() {
  const router = useRouter()
  useEffect(() => {
    localStorage.removeItem("token")
    router.push("/login")
  })

  return (
    <div>Sair</div>
  )
}

export default Sair