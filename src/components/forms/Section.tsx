import React from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'

interface IFormSection {
  value: string,
  title: string,
  description: string,
  children: React.ReactNode
}

function Section({ value, title, description, children }: IFormSection) {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle className='text-azul'>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {children}
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default Section