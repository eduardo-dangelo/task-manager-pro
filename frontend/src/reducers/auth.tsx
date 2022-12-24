const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  hasRequestedPasswordReset: false,
  hasResetPassword: false,
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
  | 'REQUEST_PASSWORD_RESET_SUCCESS'
  | 'REQUEST_PASSWORD_RESET_FAIL'
  | 'CONFIRM_PASSWORD_RESET_SUCCESS'
  | 'CONFIRM_PASSWORD_RESET_FAIL'

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
        hasResetPassword: false,
        hasRequestedPasswordReset: false,
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
        hasRequestedPasswordReset: false,
        hasResetPassword: false,
      }
    case 'REQUEST_PASSWORD_RESET_SUCCESS':
      return {
        ...state,
        hasRequestedPasswordReset: true,
        error: null,
      }
    case 'REQUEST_PASSWORD_RESET_FAIL':
      return {
        ...state,
        hasRequestedPasswordReset: false,
        error: action.payload,
      }
    case 'CONFIRM_PASSWORD_RESET_SUCCESS':
      return {
        ...state,
        hasRequestedPasswordReset: false,
        hasResetPassword: true,
      }
    case 'CONFIRM_PASSWORD_RESET_FAIL':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
