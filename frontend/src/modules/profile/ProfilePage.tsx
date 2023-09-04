import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import useAuth from '../../hooks/useAuth'
import {
  useCreateProfile,
  useGetProfile,
  useUpdateProfile,
} from '../../react-query/profile'
import {
  AccountDetails,
  MarketingPreferenceSwitch,
  ThemeSwitch,
  UpdatePassword,
  ProfilePicture,
} from './elements'

const ProfilePage = () => {
  const { user, loadUser } = useAuth()
  const { data } = useGetProfile({ id: user?.profile })
  const updateProfile = useUpdateProfile()
  const createProfile = useCreateProfile()

  return (
    <Grid container spacing={3} xs={12} ml={0} mt={0} pr={3}>
      <Grid item sm={12} md={6}>
        <Card variant='outlined' sx={{ p: 3 }}>
          <Typography mb={2}>Profile Details</Typography>
          <ProfilePicture />
          <ThemeSwitch
            theme={data?.theme}
            onSwitch={(theme) => {
              if (data) {
                updateProfile.mutate({ ...data, theme })
              } else {
                createProfile.mutate(
                  {
                    theme,
                  },
                  {
                    onSuccess: (data) => {
                      loadUser(undefined)
                    },
                  },
                )
              }
            }}
          />
          <MarketingPreferenceSwitch
            marketingPreference={data?.marketingPreference}
            onSwitch={(marketingPreference) => {
              if (data) {
                updateProfile.mutate({ ...data, marketingPreference })
              } else {
                createProfile.mutate({ marketingPreference })
              }
            }}
          />

          <Typography mt={5} mb={3}>
            Account Info
          </Typography>
          <AccountDetails />
        </Card>
      </Grid>

      <Grid item sm={12} md={6}>
        <Card variant='outlined' sx={{ p: 3 }}>
          <UpdatePassword />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfilePage
