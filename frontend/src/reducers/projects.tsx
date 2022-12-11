const initialState = {
  projects: [],
}

export const actionTypes = {
  GET_PROJECTS: 'GET_PROJECTS',
  CREATE_PROJECT: 'GET_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
}

type actionTypes = 'GET_PROJECTS' | 'GET_PROJECT' | 'UPDATE_PROJECT' | 'DELETE_PROJECT'

export default function (state = initialState, action: any) {
  switch (action.type) {
    case actionTypes.GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      }
    default:
      return state
  }
}
