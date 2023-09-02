import React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded'
import ListItemText from '@mui/material/ListItemText'
import { Box } from '@mui/material'

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <ListItemIcon sx={{ fontSize: 20, display: 'flex', alignItems: 'center' }}>
        <AssignmentTurnedInRoundedIcon color='secondary' fontSize='large' />️
      </ListItemIcon>
      <ListItemText
        sx={{ my: 0 }}
        primary='TASK MANAGER PRO'
        primaryTypographyProps={{
          fontSize: 20,
          letterSpacing: 0,
          py: 0,
        }}
      />
    </Box>
  )
}

export default Logo
