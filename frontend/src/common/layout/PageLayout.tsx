import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ResponsiveSidebarWrapper, Sidebar } from '@common/layout'

type ComponentType = {
  page: React.ReactNode
}

export const PageLayout: React.FC<ComponentType> = ({ page }) => {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.token) {
      router.push('/login')
    }
  }, [])

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
