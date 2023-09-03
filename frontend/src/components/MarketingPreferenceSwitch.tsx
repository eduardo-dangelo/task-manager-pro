import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const MarketingPreferenceSwitch = () => {
  return (
    <FormControlLabel
      control={<Checkbox value='allowExtraEmails' color='primary' />}
      label='Marketing preferences.'
    />
  )
}

export default MarketingPreferenceSwitch
