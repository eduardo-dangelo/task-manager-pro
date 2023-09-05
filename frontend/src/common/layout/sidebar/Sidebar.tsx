import * as React from 'react'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import DynamicList from '../../dynamicList/DynamicList'
import Link from 'next/link'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import useProjects from '../../../hooks/useProjects'
import { Divider } from '@mui/material'
import { UserLinks, Logo } from '@common/layout'

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
  paddingTop: 0,
  paddingBottom: 0,
})

export const Sidebar = () => {
  const { projects, createProject, updateProject, deleteProject } = useProjects()

  return (
    <FireNav>
      <Link href='/'>
        <Logo />
      </Link>
      <Divider />

      <UserLinks />
      <Divider />

      <DynamicList
        list={projects?.map((project) => ({
          id: project?.id,
          title: project?.title,
          icon: <DescriptionOutlinedIcon />,
          route: `/project/${project?.id}`,
        }))}
        title='Projects'
        newItemIcon={<DescriptionOutlinedIcon />}
        onAdd={createProject}
        onUpdate={updateProject}
        onDelete={deleteProject}
      />
    </FireNav>
  )
}
