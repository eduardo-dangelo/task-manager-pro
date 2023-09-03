import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageLayout from '../components/layout/PageLayout'
import Dashboard from './dashboard'
import ProfilePage from '../components/modules/ProfilePage'

const Profile = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.token) {
      router.push('/login')
    }
  }, [])
  return <ProfilePage />
}

Profile.getLayout = (page: React.ReactNode) => {
  return <PageLayout page={page} />
}
export default Profile
