import React, { useEffect } from 'react'
import { PageLayout } from '@common/layout'
import { useRouter } from 'next/router'

const Dashboard = () => {
  return <div>dashboard</div>
}

Dashboard.getLayout = (page: React.ReactNode) => {
  return <PageLayout page={page} />
}

export default Dashboard
