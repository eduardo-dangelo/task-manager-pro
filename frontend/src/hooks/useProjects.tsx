import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../reducers/projects'

type ProjectType = {
  title: string
  id: number
  create_at: string
}

export default function useProjects() {
  const [projectsError, setProjectsError] = useState(null)
  const { projects } = useSelector(
    (state: {
      projects: {
        projects: ProjectType[]
      }
    }) => ({
      projects: state?.projects?.projects,
    }),
  )
  const dispatch = useDispatch()

  const getProjects = () => {
    axios
      .get('http://localhost:8000/api/projects/')
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
      .post('http://localhost:8000/api/projects/', project)
      .then((res) => getProjects())
      .catch((err) => setProjectsError(err))
  }

  const updateProject = (project: Partial<ProjectType>) => {
    axios
      .put(`http://localhost:8000/api/projects/${project.id}/`, project)
      .then((res) => getProjects())
      .catch((err) => setProjectsError(err))
  }

  const deleteProject = (project: Partial<ProjectType>) => {
    axios
      .delete(`http://localhost:8000/api/projects/${project.id}/`)
      .then((res) => getProjects())
  }

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
