import * as React from 'react'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Logo from './Logo'
import UserLinks from './UserLinks'
import CollapsableList from './CollapsableList/CollapsableList'
import { ListItemButton, Typography } from '@mui/material'
import Link from 'next/link'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { ProjectItem } from '../src/types'

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

const homeLinks: ProjectItem[] = [
  { id: 1, title: 'Dashboard', icon: <DashboardIcon />, active: true },
]

const data: ProjectItem[] = [
  { id: 1, title: '2023 Year goals', icon: <DashboardIcon />, active: false },
  { id: 2, title: '2022 Year Goals', icon: <DashboardIcon />, active: false },
  { id: 3, title: 'Move House', icon: <DashboardIcon />, active: false },
]

const Sidebar = () => {
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
        <CollapsableList list={data} title='PROJECTS' />
      </FireNav>
    </Paper>
  )
}

export default Sidebar
