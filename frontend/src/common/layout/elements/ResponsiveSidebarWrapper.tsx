import React from 'react'
import { Card } from '@mui/material'
import { Box } from '@mui/system'
import theme from '../../../theme'
import { BurgerDrawer } from '@common/layout'

type ComponentType = {
  page: React.ReactNode
  sidebar: React.ReactNode
}

export const ResponsiveSidebarWrapper: React.FC<ComponentType> = ({ page, sidebar }) => {
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
        }}
      >
        <BurgerDrawer>{sidebar}</BurgerDrawer>
        {page}
      </Box>
    </Box>
  )
}
