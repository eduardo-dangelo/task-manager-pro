import React from 'react'

export type ProjectItem = {
  title: string
  id: number
  icon?: React.ReactNode
  active?: boolean
}

export type AddItemScopeTypes = 'create' | 'update'
