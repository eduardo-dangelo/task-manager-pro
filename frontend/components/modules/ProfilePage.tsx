import React from 'react'
import { Avatar, Badge, Box, Card, Switch, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { PhotoCamera } from '@mui/icons-material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { MaterialUISwitch } from '../MaterialUISwitch'
const ProfilePage = () => {
  return (
    <Grid container spacing={3} xs={12} ml={0} mt={0} pr={3}>
      <Grid item sm={12} md={6}>
        <Card variant='outlined' sx={{ p: 3 }}>
          <Box component='form' noValidate onSubmit={() => {}}>
            <Box mb={5}>
              <Typography mb={2}>Profile Picture</Typography>

              <Badge
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Avatar sx={{ width: 30, height: 30 }}>
                    <IconButton
                      color='primary'
                      aria-label='upload picture'
                      component='label'
                    >
                      <input hidden accept='image/*' type='file' />
                      <PhotoCamera fontSize='small' />
                    </IconButton>
                  </Avatar>
                }
              >
                <Avatar
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                  sx={{ width: 80, height: 80 }}
                />
              </Badge>
            </Box>

            <Typography mb={2}>Account Info</Typography>
            <Grid container spacing={2} xs={12} sm={12} mb={0}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  size='small'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  size='small'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  size='small'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='allowExtraEmails' color='primary' />}
                  label='Marketing preferences.'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                  label='Theme | Dark'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant='contained' sx={{ mb: 2, width: '100%' }}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>

      <Grid item sm={12} md={6}>
        <Card variant='outlined' sx={{ p: 3 }}>
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
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfilePage
