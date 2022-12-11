import React, { useState } from 'react'
import { InputAdornment, SxProps, TextField, Theme, Tooltip } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { AddItemScopeTypes } from '../../src/types'
import { HeadShake } from '../../src/animations'
import SaveIcon from '@mui/icons-material/Save'

const rotate90IconStyle = {
  '& svg': {
    transition: '0.2s',
    transform: 'translateX(0) rotate(0)',
  },
  '&:hover, &:focus': {
    '& svg:first-of-type': {
      transform: 'rotate(-90deg)',
    },
    '& svg:last-of-type': {
      right: 0,
      opacity: 1,
    },
  },
}

const escapeKeyCode = 27

type ComponentType = {
  initialValue?: string
  scope?: AddItemScopeTypes
  onCancel: () => void
  onBlur: () => void
  error: string
  onSubmit: (value: string) => void
  onChange: (value: string) => void
  sx?: SxProps<Theme> | undefined
}

const AddListItemForm: React.FC<ComponentType> = ({
  initialValue = '',
  scope,
  onCancel,
  onBlur,
  error,
  onSubmit,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState<string>(initialValue)

  const handleAddItem = () => {
    onSubmit(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(value)
    }

    if (e.keyCode === escapeKeyCode) {
      onCancel()
    }
  }

  return (
    <HeadShake when={error}>
      <TextField
        {...props}
        error={!!error}
        autoFocus
        size='small'
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        helperText={error}
        FormHelperTextProps={{
          sx: {
            fontSize: 10,
            mb: -1,
            position: 'absolute',
            bottom: -10,
          },
        }}
        InputProps={{
          onBlur,
          endAdornment: (
            <InputAdornment position='end'>
              <Tooltip title={scope === 'create' ? 'Add' : 'Save'}>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleAddItem}
                  edge='end'
                  sx={scope === 'create' ? rotate90IconStyle : {}}
                  size='small'
                  color='primary'
                >
                  {scope === 'create' && <AddIcon />}
                  {scope === 'update' && <SaveIcon />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </HeadShake>
  )
}

export default AddListItemForm
