const initialState = {
  projects: [],
  project: null,
}

export const actionTypes = {
  GET_PROJECTS: 'GET_PROJECTS',
  GET_PROJECT: 'GET_PROJECT',
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
    case actionTypes.GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      }
    default:
      return state
  }
}
