import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'

export type RegisterFormType = {
  username: string
  email: string
  password: string
}

export type LoginFormType = {
  username: string
  password: string
}

export default function useAuth() {
  const router = useRouter()
  const { user, error, isAuthenticated, isLoading, token } = useSelector(
    (state: {
      auth: {
        user: any
        token: string
        isAuthenticated: boolean
        isLoading: boolean
        error: {
          username?: string[]
          email?: string[]
          password?: string[]
          non_field_errors?: []
        } | null
      }
    }) => ({
      user: state?.auth?.user,
      token: state?.auth?.token,
      isAuthenticated: state?.auth?.isAuthenticated,
      isLoading: state?.auth?.isLoading,
      error: state?.auth?.error,
    }),
  )
  const dispatch = useDispatch()

  const loadUser = () => {
    dispatch({ type: 'USER_LOADING' })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (token) {
      // @ts-ignore
      config.headers['Authorization'] = `Token ${token}`
    }

    axios
      .get('http://localhost:8000/api/auth/user', config)
      .then((res) => {
        dispatch({
          type: 'USER_LOADED',
          payload: res.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: 'AUTH_ERROR',
          payload: error.message,
        })
      })
  }

  const login = ({ username, password }: LoginFormType) => {
    dispatch({ type: 'USER_LOADING' })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ username, password })

    axios
      .post('http://localhost:8000/api/auth/login', body, config)
      .then((res) => {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data,
        })
        router.push('/dashboard')
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: error.response.data,
        })
      })
  }

  const register = ({ username, email, password }: RegisterFormType) => {
    dispatch({ type: 'USER_LOADING' })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ username, email, password })

    axios
      .post('http://localhost:8000/api/auth/register', body, config)
      .then((res) => {
        console.log('res.data', res.data)
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: res.data,
        })
        router.push('/dashboard')
      })
      .catch((error) => {
        dispatch({
          type: 'REGISTER_FAIL',
          payload: error.response.data,
        })
      })
  }

  return {
    user,
    error,
    isAuthenticated,
    isLoading,
    token,
    loadUser,
    login,
    register,
  }
}
