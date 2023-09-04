import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export const UpdatePassword = () => {
  return (
    <Box component='form' noValidate onSubmit={() => {}}>
      <Typography mb={2}>Update Password</Typography>
      <Grid container spacing={2} xs={12}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name='password'
            label='Current Password'
            type='password'
            id='password'
            autoComplete='new-password'
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name='password'
            label='New Password'
            type='password'
            id='password'
            autoComplete='new-password'
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant='contained' sx={{ mb: 2, width: '100%' }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
