import React from 'react'
import Sidebar from './Sidebar'
import { Grid, Slide } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import theme from '../src/theme'
import BurgerDrawer from './BurgerDrawer'

type ComponentType = {
  page: React.ReactNode
}

const PageLayout: React.FC<ComponentType> = ({ page }) => {
  const sideBar = <Sidebar />

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          background: theme.palette.background.default,
          height: '100vh',
        }}
      >
        <Grid container spacing={0}>
          <Box
            component={Grid}
            item
            display={{ xs: 'none', md: 'block' }}
            sx={{
              width: '280px !important',
              height: '100hv',
            }}
          >
            <Slide direction='left'>{sideBar}</Slide>
          </Box>
          <Grid item xs={12} md={9} lg={9.5}>
            <BurgerDrawer>{sideBar}</BurgerDrawer>
            {page}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PageLayout
