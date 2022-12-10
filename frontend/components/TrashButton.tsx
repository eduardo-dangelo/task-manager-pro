import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, SxProps, Theme } from '@mui/material'

type ComponentType = {
  onDelete: () => void
  className?: string
  sx?: SxProps<Theme>
}

const TrashButton: React.FC<ComponentType> = ({ onDelete, ...props }) => {
  return (
    <IconButton
      {...props}
      edge='end'
      aria-label='delete'
      size='small'
      sx={{ mr: 0.5, ...props?.sx }}
      onClick={onDelete}
      className={props?.className}
    >
      <DeleteIcon fontSize='small' />
    </IconButton>
  )
}

export default TrashButton
