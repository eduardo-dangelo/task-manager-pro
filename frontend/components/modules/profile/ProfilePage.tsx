import React from 'react'
import { Card } from '@mui/material'
import Grid from '@mui/material/Grid'
import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateAccountDetails from './UpdateAccountDetails'
const ProfilePage = () => {
  return (
    <Grid container spacing={3} xs={12} ml={0} mt={0} pr={3}>
      <Grid item sm={12} md={6}>
        <Card variant='outlined' sx={{ p: 3 }}>
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
