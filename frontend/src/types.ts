import React from 'react'

export type ListItemType = {
  title: string
  id: number
  icon?: React.ReactNode
  route: string
}

export type StatusType = 'IN' | 'IP' | 'PK' | 'BK' | 'CP' | 'CC'

export type ProjectFromApiType = {
  id: number
  title: string
  create_at: React.ReactNode
  status: StatusType
}

export type AddItemScopeTypes = 'create' | 'update'
