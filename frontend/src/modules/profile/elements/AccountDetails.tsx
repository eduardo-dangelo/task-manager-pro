import React from 'react'
import { Avatar, Badge, Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { PhotoCamera } from '@mui/icons-material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { MaterialUISwitch } from '../../../common/MaterialUISwitch'
import Button from '@mui/material/Button'
import useAuth from '../../../hooks/useAuth'
import { useFormik } from 'formik'

export const AccountDetails = () => {
  const { user } = useAuth()
  const { values, setFieldValue } = useFormik({
    initialValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <Box component='form' noValidate onSubmit={() => {}}>
      <Grid container spacing={2} xs={12} sm={12} mb={0}>
        <Grid item xs={12} sm={6}>
          <TextField
            id='firstName'
            name='firstName'
            label='First Name'
            value={values.firstName}
            autoComplete='given-name'
            required
            fullWidth
            autoFocus
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='lastName'
            name='lastName'
            label='Last Name'
            value={values.lastName}
            autoComplete='family-name'
            required
            fullWidth
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='email'
            name='email'
            label='Email Address'
            value={values.email}
            autoComplete='email'
            required
            fullWidth
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
