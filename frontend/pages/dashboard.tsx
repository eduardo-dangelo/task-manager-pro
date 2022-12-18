import React, { useEffect } from 'react'
import PageLayout from '../components/PageLayout'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.token) {
      router.push('/login')
    }
  }, [])
  return <div>Dashboard</div>
}

Dashboard.getLayout = (page: React.ReactNode) => {
  return <PageLayout page={page} />
}

export default Dashboard
