import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../reducers/projects'
import { ProjectType } from '../types'
import { tokenConfig } from '../utils'

export default function useProjects() {
  const [projectsError, setProjectsError] = useState(null)
  const { projects, token } = useSelector(
    (state: {
      auth: {
        token: string
      }
      projects: {
        projects: ProjectType[]
      }
    }) => ({
      projects: state?.projects?.projects,
      token: state?.auth?.token,
    }),
  )
  const dispatch = useDispatch()

  const getProjects = () => {
    axios
      .get('http://localhost:8000/api/projects/', tokenConfig(token))
      .then((res) => {
        dispatch({
          type: actionTypes.GET_PROJECTS,
          payload: res.data,
        })
      })
      .catch((err) => setProjectsError(err))
  }

  const createProject = (project: Partial<ProjectType>) => {
    axios
      .post('http://localhost:8000/api/projects/', project, tokenConfig(token))
      .then((res) => getProjects())
      .catch((err) => setProjectsError(err))
  }

  const updateProject = (project: Partial<ProjectType>) => {
    axios
      .put(
        `http://localhost:8000/api/projects/${project.id}/`,
        project,
        tokenConfig(token),
      )
      .then((res) => getProjects())
      .catch((err) => setProjectsError(err))
  }

  const deleteProject = (project: Partial<ProjectType>) => {
    axios
      .delete(`http://localhost:8000/api/projects/${project.id}/`, tokenConfig(token))
      .then((res) => getProjects())
  }

  // will fetch projects whenever you invoke useProjects()
  useEffect(() => {
    getProjects()
  }, [])

  return {
    projects,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    projectsError,
  }
}
