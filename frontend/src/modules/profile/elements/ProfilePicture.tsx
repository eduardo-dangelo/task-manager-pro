import React from 'react'
import { Avatar, Badge, Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { PhotoCamera } from '@mui/icons-material'

export const ProfilePicture = () => {
  return (
    <Box mb={3}>
      <Badge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Avatar sx={{ width: 30, height: 30 }}>
            <IconButton color='primary' aria-label='upload picture' component='label'>
              <input hidden accept='image/*' type='file' />
              <PhotoCamera fontSize='small' />
            </IconButton>
          </Avatar>
        }
      >
        <Avatar
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
          sx={{ width: 80, height: 80 }}
        />
      </Badge>
    </Box>
  )
}
