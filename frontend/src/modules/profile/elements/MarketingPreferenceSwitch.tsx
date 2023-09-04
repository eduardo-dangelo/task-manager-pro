import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

type ComponentType = {
  marketingPreference?: boolean
  onSwitch: (marketingPreference: boolean) => void
}

export const MarketingPreferenceSwitch: React.FC<ComponentType> = ({
  marketingPreference,
  onSwitch,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          value='allowExtraEmails'
          color='primary'
          checked={marketingPreference}
          onChange={(e) => {
            const value = e.target.checked
            onSwitch(value)
          }}
        />
      }
      label='Marketing preferences.'
    />
  )
}
