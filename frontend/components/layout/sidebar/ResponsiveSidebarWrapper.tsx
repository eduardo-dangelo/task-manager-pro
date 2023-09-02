import React from 'react'
import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import BurgerDrawer from './BurgerDrawer'
import Sidebar from './Sidebar'
import theme from "../../../src/theme";

type ComponentType = {
  page: React.ReactNode
  sidebar: React.ReactNode
}

const ResponsiveSidebarWrapper: React.FC<ComponentType> = ({ page, sidebar }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', flexGrow: 1 }}>
      <Paper
        flex={3}
        component={Box}
        // elevation={24}
        variant='elevation'
        display={{ xs: 'none', md: 'block' }}
        sx={{
          borderRadius: 0,
          height: '100vh',
          minWidth: '280px !important',
          maxWidth: '280px !important',
        }}
      >
        {sidebar}
      </Paper>
      <Box flex={9} sx={{
          background: theme.palette.background.default,
          // background: 'black',
      }}>
        <BurgerDrawer>{sidebar}</BurgerDrawer>
        {page}
      </Box>
    </Box>
  )
}

export default ResponsiveSidebarWrapper
