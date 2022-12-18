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

export type UpdateUserFormType = {
  firstName: string
  lastName: string
}

const tokenConfig = (token?: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const userToken = localStorage.token || token
  if (userToken) {
    // @ts-ignore
    config.headers['Authorization'] = `Token ${userToken}`
  }
  return config
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

  const loadUser = (route = '/dashboard') => {
    dispatch({ type: 'USER_LOADING' })
    axios
      .get('http://localhost:8000/api/auth/user', tokenConfig(token))
      .then((res) => {
        dispatch({
          type: 'USER_LOADED',
          payload: res.data,
        })
        router.push(route)
      })
      .catch((error) => {
        dispatch({
          type: 'AUTH_ERROR',
          payload: error?.message,
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
        // let route = '/dashboard'
        // if (!res.data?.first_name || !res.data?.last_name) {
        //   route = '/tell-us-more'
        // }
        router.push('/dashboard')
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: error?.response?.data,
        })
      })
  }

  const logout = () => {
    axios
      .post('http://localhost:8000/api/auth/logout', null, tokenConfig(token))
      .then((res) => {
        dispatch({
          type: 'LOGOUT_SUCCESS',
        })
        router.push('/')
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
          payload: error?.response?.data,
        })
      })
  }

  const updateUser = ({ firstName, lastName }: UpdateUserFormType) => {
    dispatch({ type: 'USER_LOADING' })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }

    if (token) {
      // @ts-ignore
      config.headers['Authorization'] = `Token ${token}`
    }

    const body = JSON.stringify({ first_name: firstName, last_name: lastName })

    axios
      .patch(`http://localhost:8000/api/auth/user/${user?.id}`, body, config)
      .then((res) => {
        // dispatch({
        //   type: 'LOGIN_SUCCESS',
        //   payload: res.data,
        // })
        // router.push('/dashboard')
        console.log('res', res)
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: error?.response?.data,
        })
        console.log('error', error)
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
    updateUser,
    logout,
  }
}
