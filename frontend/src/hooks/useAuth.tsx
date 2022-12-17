import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function useAuth() {
  const router = useRouter()
  const { user, error, isAuthenticated, isLoading, token } = useSelector(
    (state: {
      auth: {
        user: any
        token: string
        isAuthenticated: boolean
        isLoading: boolean
        error: string | null
      }
    }) => ({
      user: state.auth.user,
      token: state.auth.token,
      isAuthenticated: state.auth.user,
      isLoading: state.auth.user,
      error: state.auth.user,
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
          payload: error,
        })
      })
  }

  const login = ({ username, password }: { username: string, password: string }) => {
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
          payload: error,
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
  }
}
