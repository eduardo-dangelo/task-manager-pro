import React, { useEffect } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import { Box, Typography } from '@mui/material'
import useProject from '../../src/hooks/useProject'
import { useRouter } from 'next/router'
import StatusSelect from '../../components/StatusSelect'

const ProjectPage = () => {
  const { query } = useRouter()
  const { project, getProject } = useProject()

  useEffect(() => {
    const parsed = parseInt(query.id as string, 10)
    getProject(parsed)
  }, [query.id])

  return (
    <Box p={3}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h4'>{project?.title}</Typography>
        <StatusSelect value={project?.status} />
      </Box>
    </Box>
  )
}

ProjectPage.getLayout = (page: React.ReactNode) => {
  return <PageLayout page={page} />
}

export default ProjectPage
