import React from 'react'
import { MaterialUISwitch } from './MaterialUISwitch'
import useAuth from '../hooks/useAuth'
import FormControlLabel from '@mui/material/FormControlLabel'

const ThemeSwitch = () => {
  const { profile, updateProfile } = useAuth()
  return (
    <FormControlLabel
      control={
        <MaterialUISwitch
          sx={{ m: 1, ml: 0.5 }}
          checked={!!(profile?.theme === 'Dark')}
          onChange={(e) => {
            console.log(e.target.checked)
            const value = e.target.checked ? 'Dark' : 'Light'
            console.log(value)
            updateProfile({ ...profile, theme: value })
            // submit form
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={`Theme | ${profile?.theme}`}
    />
  )
}

export default ThemeSwitch
