import * as React from 'react'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Logo from './Logo'
import CollapsableList from './CollapsableList/CollapsableList'
import Link from 'next/link'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { ListItemType } from '../src/types'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import HouseIcon from '@mui/icons-material/House'
import useProject from '../src/hooks/useProjects'
import useProjects from '../src/hooks/useProjects'
import { useEffect, useMemo, useState } from 'react'

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
})

const homeLinks: ListItemType[] = [
  { id: 1, title: 'Home', icon: <HouseIcon />, route: '/' },
  {
    id: 2,
    title: 'Dashboard',
    icon: <DashboardIcon />,
    route: '/dashboard',
  },
]

const Sidebar = () => {
  const { projects, createProject, updateProject, deleteProject } = useProjects()

  return (
    <Paper
      elevation={24}
      variant='elevation'
      sx={{
        borderRadius: 0,
        height: '100vh',
        p: 2,
      }}
    >
      <FireNav disablePadding>
        <Link href='/'>
          <Logo />
        </Link>
        <CollapsableList list={homeLinks} staticMode />
        <CollapsableList
          list={projects?.map((project) => ({
            id: project?.id,
            title: project?.title,
            icon: <DescriptionOutlinedIcon />,
            route: `/project/${project?.id}`,
          }))}
          title='PROJECTS'
          newItemIcon={<DescriptionOutlinedIcon />}
          onAdd={createProject}
          onUpdate={updateProject}
          onDelete={deleteProject}
        />
      </FireNav>
    </Paper>
  )
}

export default Sidebar
