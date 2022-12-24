import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '../Copyright'
import useAuth, { UpdateUserFormType } from '../../src/hooks/useAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRouter } from 'next/router'

export default function TellUsMoreForm() {
  const { isLoading, updateUser, user, loadUser, isAuthenticated } = useAuth()
  const [localError, setLocalError] = useState<Partial<UpdateUserFormType>>({})

  function validateForm(formData: UpdateUserFormType) {
    const errors: Partial<UpdateUserFormType> = {}
    let isValid = true

    if (!formData.firstName) {
      isValid = false
      errors.firstName = 'Username is required'
    }

    if (!formData.lastName) {
      isValid = false
      errors.lastName = 'Username is required'
    }

    setLocalError(errors)
    return isValid
  }

  const handleSubmit = (event: {
    preventDefault: () => void
    currentTarget: HTMLFormElement | undefined
  }) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
    }
    validateForm(formData) && updateUser(formData)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, mt: 8, bgcolor: 'secondary.main' }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h6'>
          Tell us more about yourself
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                error={!!localError?.firstName}
                helperText={localError?.firstName}
                onChange={() => {
                  setLocalError({
                    ...localError,
                    firstName: undefined,
                  })
                }}
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
                error={!!localError?.lastName}
                helperText={localError?.lastName}
                onChange={() => {
                  setLocalError({
                    ...localError,
                    lastName: undefined,
                  })
                }}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            loading={!!isLoading}
            loadingPosition='start'
          >
            Confirm
          </LoadingButton>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
