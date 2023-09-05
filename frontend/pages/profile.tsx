import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import ProfilePage from '@modules/profile/ProfilePage'
import { PageLayout } from '@common/layout'

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
