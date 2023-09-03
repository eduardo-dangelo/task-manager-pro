import React from 'react'
import { MaterialUISwitch } from './MaterialUISwitch'
import useAuth from '../hooks/useAuth'
import FormControlLabel from '@mui/material/FormControlLabel'

const ThemeSwitch = () => {
  const { profile } = useAuth()
  return (
    <FormControlLabel
      control={
        <MaterialUISwitch
          sx={{ m: 1, ml: 0.5 }}
          checked={!!(profile?.theme === 'dark')}
          onChange={(e) => {
            console.log(e.target.checked)
            const value = e.target.checked ? 'dark' : 'light'
            // submit form
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label='Theme | Dark'
    />
  )
}

export default ThemeSwitch
