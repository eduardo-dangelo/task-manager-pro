import React from 'react'
import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import BurgerDrawer from './BurgerDrawer'
import Sidebar from './Sidebar'

type ComponentType = {
  page: React.ReactNode
  sidebar: React.ReactNode
}

const SidebarGrid: React.FC<ComponentType> = ({ page, sidebar }) => {
  return (
    <Grid container spacing={0}>
      <Paper
        component={Grid}
        elevation={24}
        item
        variant='elevation'
        display={{ xs: 'none', md: 'block' }}
        sx={{
          borderRadius: 0,
          height: '100vh',
          width: '280px !important',
        }}
      >
        {sidebar}
      </Paper>
      <Grid item xs={12} md={9} lg={9.5}>
        <BurgerDrawer>{sidebar}</BurgerDrawer>
        {page}
      </Grid>
    </Grid>
  )
}

export default SidebarGrid
