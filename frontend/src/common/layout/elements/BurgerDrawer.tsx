import React, { useState } from 'react'
import { IconButton, SwipeableDrawer } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { Box } from '@mui/system'

type ComponentType = {
  children: React.ReactNode
}

export const BurgerDrawer: React.FC<ComponentType> = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <Box display={{ xs: 'block', md: 'none' }}>
      <IconButton
        color='primary'
        aria-label='menu'
        onClick={() => setOpen(true)}
        component='label'
        sx={{
          p: 1,
          m: 1,
        }}
      >
        <MenuOutlinedIcon />
      </IconButton>
      <SwipeableDrawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {children}
      </SwipeableDrawer>
    </Box>
  )
}
