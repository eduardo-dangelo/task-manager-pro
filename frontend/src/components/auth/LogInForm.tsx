import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Container, CssBaseline } from '@mui/material'
import Copyright from '../Copyright'
import Link from 'next/link'
import useAuth, { LoginFormType } from '../../hooks/useAuth'
// @ts-ignore
import LoadingButton from '@mui/lab/LoadingButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const LogInForm = () => {
  const router = useRouter()
  const { login, isLoading, error, isAuthenticated, loadUser } = useAuth()
  const [localError, setLocalError] = useState<Partial<LoginFormType>>({})

  function validateForm(formData: LoginFormType) {
    const errors: Partial<LoginFormType> = {}
    let isValid = true

    if (!formData.username) {
      isValid = false
      errors.username = 'Username is required'
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
      password: data.get('password') as string,
    }
    validateForm(formData) && login(formData)
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
          flex: 1,
        }}
      >
        <Avatar sx={{ m: 1, mt: 8, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h3' variant='h6'>
          Log In
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!localError?.username || !!error?.username}
            helperText={localError?.username || error?.username?.join()}
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            error={!!localError?.password || !!error?.password}
            helperText={localError?.password || error?.password?.join()}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
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
            logIn
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href='forgot-password'>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href='register'>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Copyright mt={5} />
        </Box>
      </Box>
    </Container>
  )
}

export default LogInForm
