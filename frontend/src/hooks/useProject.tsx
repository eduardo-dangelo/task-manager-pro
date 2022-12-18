import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../reducers/projects'
import { ProjectType } from '../types'
import { tokenConfig } from '../utils'

export default function useProject() {
  const [projectError, setProjectError] = useState(null)
  const { project, token } = useSelector(
    (state: {
      auth: {
        token: string
      }
      projects: {
        project: ProjectType
      }
    }) => ({
      project: state?.projects?.project,
      token: state?.auth?.token,
    }),
  )
  const dispatch = useDispatch()

  const getProject = (id: number) => {
    axios
      .get(`http://localhost:8000/api/projects/${id}/`, tokenConfig(token))
      .then((res) => {
        console.log('res', res)
        dispatch({
          type: actionTypes.GET_PROJECT,
          payload: res.data,
        })
      })
      .catch((err) => setProjectError(err))
  }

  const updateProject = (project: Partial<ProjectType>) => {
    axios
      .put(
        `http://localhost:8000/api/projects/${project.id}/`,
        project,
        tokenConfig(token),
      )
      .then((res) => {
        dispatch({
          type: actionTypes.GET_PROJECT,
          payload: res.data,
        })
      })
      .catch((err) => setProjectError(err))
  }

  const deleteProject = (project: Partial<ProjectType>) => {
    axios
      .delete(`http://localhost:8000/api/projects/${project.id}/`, tokenConfig(token))
      .then((res) => {
        dispatch({
          type: actionTypes.GET_PROJECT,
          payload: res.data,
        })
      })
      .catch((err) => setProjectError(err))
  }

  return {
    project,
    getProject,
    updateProject,
    deleteProject,
    projectError,
  }
}
