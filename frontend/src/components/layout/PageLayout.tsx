import React, { useEffect } from 'react'
import Sidebar from './sidebar/Sidebar'
import Head from 'next/head'
import ResponsiveSidebarWrapper from './sidebar/ResponsiveSidebarWrapper'
import useAuth from '../../hooks/useAuth'

type ComponentType = {
  page: React.ReactNode
}

const PageLayout: React.FC<ComponentType> = ({ page }) => {
  // const { loadUser } = useAuth()
  //
  // useEffect(() => {
  //   loadUser()
  // }, [])

  return (
    <>
      <Head>
        <title>Task Manager Pro</title>
        <meta name='description' content='best project manager software.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ResponsiveSidebarWrapper sidebar={<Sidebar />} page={page} />
    </>
  )
}

export default PageLayout
