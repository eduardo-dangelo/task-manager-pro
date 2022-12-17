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

export default function (
  state = initialState,
  action: { payload?: any; type: actionTypes },
) {
  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        isLoading: action.payload,
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
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      }
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}