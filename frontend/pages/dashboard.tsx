import React, { useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import { useRouter } from 'next/router'
import Chess from '../components/Chess'

const Dashboard = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.token) {
      router.push('/login')
    }
  }, [])
  return (
    <div>
      <Chess />
    </div>
  )
}

Dashboard.getLayout = (page: React.ReactNode) => {
  return <PageLayout page={page} />
}

export default Dashboard
