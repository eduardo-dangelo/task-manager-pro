import React from 'react'
import { MaterialUISwitch } from '../../../common/MaterialUISwitch'
import useAuth from '../../../hooks/useAuth'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useQueryClient } from '@tanstack/react-query'
import { ThemeType } from '../../../react-query/profile'

type ComponentType = {
  theme?: ThemeType
  onSwitch: (theme: ThemeType) => void
}

export const ThemeSwitch: React.FC<ComponentType> = ({ theme, onSwitch }) => {
  console.log('theme', theme)
  return (
    <FormControlLabel
      control={
        <MaterialUISwitch
          sx={{ m: 1, ml: 0.5 }}
          checked={theme === 'dark'}
          onChange={(e) => {
            const value = e.target.checked ? 'dark' : 'light'
            onSwitch(value)
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={`Theme | ${theme}`}
    />
  )
}
