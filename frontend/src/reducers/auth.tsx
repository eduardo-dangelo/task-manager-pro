const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export type actionTypes =
  | 'USER_LOADING'
  | 'USER_LOADED'
  | 'AUTH_ERROR'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAIL'
  | 'REGISTER_SUCCESS'
  | 'REGISTER_FAIL'
  | 'LOGOUT_SUCCESS'
  | 'LOGOUT_FAIL'
  | 'UPDATE_USER_SUCCESS'

export default function (
  state = initialState,
  action: { payload?: any; type: actionTypes },
) {
  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      }
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      }
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
      }
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      }
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('token')
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }
    default:
      return state
  }
}
