import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Container, CssBaseline } from '@mui/material'
import Copyright from '../Copyright'
import Link from 'next/link'
import useAuth, {
  RegisterFormType,
  ResetPasswordRequestFormType,
} from '../../hooks/useAuth'
import { useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const ForgotPasswordForm = () => {
  const { resetPasswordRequest, error, hasRequestedPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [localError, setLocalError] = useState<Partial<ResetPasswordRequestFormType>>({})

  function validateForm(formData: ResetPasswordRequestFormType) {
    const errors: Partial<ResetPasswordRequestFormType> = {}
    let isValid = true

    if (!formData.email) {
      isValid = false
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false
      errors.email = 'Email is invalid'
    }

    setLocalError(errors)
    return isValid
  }

  const handleSubmit = (event: {
    preventDefault: () => void
    currentTarget: HTMLFormElement | undefined
  }) => {
    event.preventDefault()
    validateForm({ email }) &&
      resetPasswordRequest({
        email,
      })
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
          flex: 1,
        }}
      >
        <Avatar sx={{ m: 1, mt: 8, bgcolor: 'secondary.main' }}>
          {!hasRequestedPasswordReset && <LockOutlinedIcon />}
          {hasRequestedPasswordReset && <ThumbUpIcon />}
        </Avatar>
        <Typography component='h3' variant='h6'>
          Forgot Password
        </Typography>
        {hasRequestedPasswordReset && (
          <Typography component='p' textAlign='center' mt={2}>
            An email was sent to <b>{email}</b> with instructions on how to reset your
            password. Please check your email and follow the instructions.
          </Typography>
        )}
        {!hasRequestedPasswordReset && (
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!localError || !!error?.email}
              helperText={localError?.email || error?.email?.join()}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='login'>Login</Link>
              </Grid>
            </Grid>

            <Copyright mt={5} />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default ForgotPasswordForm
