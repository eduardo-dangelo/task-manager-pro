import React from 'react'
import { Card, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import BurgerDrawer from './BurgerDrawer'
import Sidebar from './Sidebar'
import theme from '../../../theme'

type ComponentType = {
  page: React.ReactNode
  sidebar: React.ReactNode
}

const ResponsiveSidebarWrapper: React.FC<ComponentType> = ({ page, sidebar }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', flexGrow: 1 }}>
      <Card
        flex={3}
        variant='outlined'
        component={Box}
        display={{ xs: 'none', md: 'block' }}
        sx={{
          borderRadius: 0,
          height: '100vh',
          minWidth: '280px !important',
          maxWidth: '280px !important',
        }}
      >
        {sidebar}
      </Card>
      <Box
        flex={9}
        sx={{
          background: theme.palette.background.default,
          overflow: 'auto',
          // background: 'black',
        }}
      >
        <BurgerDrawer>{sidebar}</BurgerDrawer>
        {page}
      </Box>
    </Box>
  )
}

export default ResponsiveSidebarWrapper
