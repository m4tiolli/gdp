"use client"

import HomeProposals from '@/components/dashboards/HomeProposals'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { ToastAction } from '@radix-ui/react-toast'
import React from 'react'

function Dashboard() {
  const { toast } = useToast()
  const { newToast } = useAuth()

  React.useEffect(() => {
    if (newToast.title && newToast.description) {
      toast({
        title: newToast.title,
        description: newToast.description,
        variant: newToast.variant,
        action: newToast.action?.text ? (
          <ToastAction altText="Clique para realizar a ação">
            {newToast.action.text}
          </ToastAction>
        ) : undefined,
      })
    }
  }, [newToast, toast])

  return (
    <div>
      <HomeProposals />
      <Toaster />
    </div>
  )
}

export default Dashboard