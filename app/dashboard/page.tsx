"use client"
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

function Dashboard() {
  const { isAuthenticated } = useAuth()
  return (
    <div>
      {isAuthenticated && "Dashboard"}
    </div>
  )
}

export default Dashboard