import { useDispatch, useSelector } from 'react-redux'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { tokenConfig } from '../utils'

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

const getRoute = (res: AxiosResponse<any>) => {
  let route = '/dashboard'
  if (!res.data?.user?.first_name || !res.data?.user?.last_name) {
    route = '/tell-us-more'
  }
  return route
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
        router.push(getRoute(res))
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
        router.push('/login')
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

        router.push(getRoute(res))
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
    const body = JSON.stringify({ first_name: firstName, last_name: lastName })

    console.log('token', token)
    axios
      .patch(`http://localhost:8000/api/auth/users`, body, tokenConfig(token))
      .then((res) => {
        dispatch({
          type: 'UPDATE_USER_SUCCESS',
          payload: res.data,
        })
        router.push('/dashboard')
        console.log('res', res)
      })
      .catch((error) => {
        // dispatch({
        //   type: 'LOGIN_FAIL',
        //   payload: error?.response?.data,
        // })
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
