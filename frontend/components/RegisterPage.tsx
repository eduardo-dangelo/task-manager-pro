import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from './Copyright'
import Link from 'next/link'
import useAuth, { RegisterFormType } from '../src/hooks/useAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function RegisterPage() {
  const router = useRouter()
  const { register, error, isLoading, isAuthenticated, loadUser } = useAuth()
  const [localError, setLocalError] = useState<Partial<RegisterFormType>>({})
  // todo: on register user should add first and last name

  function validateForm(formData: RegisterFormType) {
    const errors: Partial<RegisterFormType> = {}
    let isValid = true

    if (!formData.username) {
      isValid = false
      errors.username = 'Username is required'
    }

    if (!formData.email) {
      isValid = false
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false
      errors.email = 'Email is invalid'
    }

    if (!formData.password) {
      isValid = false
      errors.password = 'Password is required'
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
      username: data.get('username') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    }
    validateForm(formData) && register(formData)
  }

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } else {
      loadUser()
    }
  }, [])

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h6'>
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                error={!!localError?.username || !!error?.username}
                helperText={localError?.username || error?.username?.join()}
                onChange={() => {
                  setLocalError({
                    ...localError,
                    username: undefined,
                  })
                }}
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
                error={!!localError?.email || !!error?.email}
                helperText={localError?.email || error?.email}
                onChange={() => {
                  setLocalError({
                    ...localError,
                    email: undefined,
                  })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                error={!!localError?.password || !!error?.password}
                helperText={localError?.password || error?.password}
                onChange={() => {
                  setLocalError({
                    ...localError,
                    password: undefined,
                  })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          {error?.non_field_errors && (
            <Typography color='error'>{error?.non_field_errors?.join(', ')}</Typography>
          )}
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            loading={!!isLoading}
            loadingPosition='start'
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login'>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
