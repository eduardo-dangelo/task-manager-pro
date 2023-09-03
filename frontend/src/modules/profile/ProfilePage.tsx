import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateAccountDetails from './UpdateAccountDetails'
import ThemeSwitch from '../../components/ThemeSwitch'
import MarketingPreferenceSwitch from '../../components/MarketingPreferenceSwitch'
import ProfilePictureEdit from '../../components/ProfilePictureEdit'

const ProfilePage = () => {
  return (
    <Grid container spacing={3} xs={12} ml={0} mt={0} pr={3}>
      <Grid item sm={12} md={6}>
        <Card variant='outlined' sx={{ p: 3 }}>
          <Typography mb={2}>Profile Details</Typography>
          <ProfilePictureEdit />
          <ThemeSwitch />
          {/*<MarketingPreferenceSwitch />*/}

          <Typography mt={5} mb={3}>
            Account Info
          </Typography>
          <UpdateAccountDetails />
        </Card>
      </Grid>

      <Grid item sm={12} md={6}>
        <Card variant='outlined' sx={{ p: 3 }}>
          <UpdatePasswordForm />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfilePage
