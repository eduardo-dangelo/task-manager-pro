import React from 'react'

export type ProjectItem = {
  title: string
  id: number
  icon?: React.ReactNode
  active?: boolean
  route: string
}

export type AddItemScopeTypes = 'create' | 'update'
