import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Avatar, ListItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowRight from '@mui/icons-material/ArrowRight'
import Link from 'next/link'
import useAuth from '../src/hooks/useAuth'

const UserLinks = () => {
  const { logout, user } = useAuth()
  return (
    <ListItem
      component='div'
      disablePadding
      sx={{
        alignItems: 'stretch',
        justifyContent: 'space-between',
      }}
    >
      <Tooltip title='View Profile'>
        <Link
          href='/profile'
          style={{
            display: 'flex',
            alignItems: 'stretch',
            flex: 1,
          }}
        >
          <ListItemButton
            sx={{
              padding: 0,
              paddingLeft: '0 !important',
              paddingRight: '0 !important',
            }}
          >
            <ListItemIcon sx={{ pl: 2 }}>
              <Avatar
                component='div'
                sx={{ width: 24, height: 24 }}
                src='/broken-image.jpg'
              />
            </ListItemIcon>
            <ListItemText
              primary={`${user?.first_name} ${user?.last_name}`}
              primaryTypographyProps={{
                color: 'primary',
                fontWeight: 'medium',
                variant: 'body2',
                p: 2,
                pl: 0,
              }}
            />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title='Log Out'>
        <IconButton
          onClick={logout}
          size='large'
          sx={{
            paddingX: 2,
            '& svg': {
              transition: '0.2s',
              transform: 'translateX(0) rotate(0)',
            },
            '&:hover, &:focus': {
              bgcolor: 'unset',
              '& svg:first-of-type': {
                transform: 'translateX(-4px) rotate(-20deg)',
              },
              '& svg:last-of-type': {
                right: 0,
                opacity: 1,
              },
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              height: '80%',
              display: 'block',
              left: 0,
              width: '1px',
              bgcolor: 'divider',
            },
          }}
        >
          <LogoutIcon />
          <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
        </IconButton>
      </Tooltip>
    </ListItem>
  )
}

export default UserLinks
