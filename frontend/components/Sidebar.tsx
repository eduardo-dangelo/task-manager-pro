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
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import HouseIcon from '@mui/icons-material/House'

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
  { id: 1, title: 'Home', icon: <HouseIcon />, active: true, route: '/' },
  {
    id: 2,
    title: 'Dashboard',
    icon: <DashboardIcon />,
    active: true,
    route: '/dashboard',
  },
]

const data: ProjectItem[] = [
  {
    id: 1,
    title: '2023 Year goals',
    icon: <DescriptionOutlinedIcon />,
    active: false,
    route: '/project/1',
  },
  {
    id: 2,
    title: '2022 Year Goals',
    icon: <DescriptionOutlinedIcon />,
    active: false,
    route: '/project/2',
  },
  {
    id: 3,
    title: 'Move House',
    icon: <DescriptionOutlinedIcon />,
    active: false,
    route: '/project/3',
  },
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
