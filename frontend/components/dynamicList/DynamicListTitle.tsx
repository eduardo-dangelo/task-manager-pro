import React, { useState } from 'react'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import ListItemText from '@mui/material/ListItemText'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import ListItemButton from '@mui/material/ListItemButton'
import FolderIcon from '@mui/icons-material/Folder'

type ComponentType = {
  title?: string
  open?: boolean
  [prop: string]: any
}
export const DynamicListTitle: React.FC<ComponentType> = ({
  title = '',
  open = false,
  ...props
}) => {
  return (
    <ListItemButton
      alignItems='flex-start'
      sx={{ px: '0 !important', py: 1.5 }}
      {...props}
    >
      {open ? <FolderOpenIcon sx={{ mx: 2 }} /> : <FolderIcon sx={{ mx: 2 }} />}
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          fontSize: 15,
          fontWeight: 'medium',
          lineHeight: '20px',
          mb: '2px',
        }}
        sx={{ my: 0 }}
      />
      <KeyboardArrowDown
        sx={{
          mr: 1,
          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: '0.2s',
        }}
      />
    </ListItemButton>
  )
}
