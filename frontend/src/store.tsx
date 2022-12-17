import projectsReducer from '../src/reducers/projects'
import authReducer from '../src/reducers/auth'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    auth: authReducer,
  },
})
