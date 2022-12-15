import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Box } from '@mui/system'
import Head from 'next/head'
import SidebarGrid from './Sidebar/SidebarGrid'

type ComponentType = {
  page: React.ReactNode
}

const PageLayout: React.FC<ComponentType> = ({ page }) => {
  return (
    <>
      <Head>
        <title>Task Manager Pro</title>
        <meta name='description' content='best project manager software.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SidebarGrid sidebar={<Sidebar />}>{page}</SidebarGrid>
    </>
  )
}

export default PageLayout
