import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageLayout from '../src/components/layout/PageLayout'
import ProfilePage from '../src/modules/profile/ProfilePage'

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
