import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Button, Container, CssBaseline } from '@mui/material'
import Copyright from '../../common/Copyright'
import Link from 'next/link'
import useAuth, { LoginFormType, ResetPasswordConfirmFormType } from '../../hooks/useAuth'
// @ts-ignore
import LoadingButton from '@mui/lab/LoadingButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const ResetPasswordForm = () => {
  const router = useRouter()
  const token = router.query?.token
  console.log('token', token)
  const {
    resetPasswordConfirm,
    isLoading,
    error,
    isAuthenticated,
    loadUser,
    hasResetPassword,
  } = useAuth()
  const [localError, setLocalError] = useState<Partial<ResetPasswordConfirmFormType>>({})

  function validateForm(formData: ResetPasswordConfirmFormType) {
    const errors: Partial<ResetPasswordConfirmFormType> = {}
    let isValid = true

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
      token: token as string,
      password: data.get('password') as string,
    }
    validateForm(formData) && resetPasswordConfirm(formData)
  }
  console.log('error', error)

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
          {!hasResetPassword && <LockOutlinedIcon />}
          {hasResetPassword && <ThumbUpIcon />}
        </Avatar>
        <Typography component='h3' variant='h6'>
          Reset Password
        </Typography>
        {!hasResetPassword && (
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={!!localError?.password || !!error?.password}
              helperText={localError?.password || error?.password?.join()}
              margin='normal'
              required
              fullWidth
              name='password'
              label='New Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {error?.non_field_errors && (
              <Typography color='error'>{error?.non_field_errors?.join()}</Typography>
            )}
            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              loading={!!isLoading}
              loadingPosition='start'
            >
              confirm
            </LoadingButton>
            <Copyright mt={5} />
          </Box>
        )}
        {hasResetPassword && (
          <Box>
            <Typography component='p' textAlign='center' mt={2}>
              Your password reset was successful. Please log in to your account to
              continue.
            </Typography>
            <Button
              onClick={() => router.push('/login')}
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              login
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default ResetPasswordForm
