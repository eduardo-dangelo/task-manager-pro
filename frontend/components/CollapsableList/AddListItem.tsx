import React, { useState } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem } from '@mui/material'
import AddItem from '../AddItem'
import { AddItemScopeTypes, ListItemType } from '../../src/types'

type ComponentType = {
  onAdd: (value: string) => void
  onCancel: () => void
  list: ListItemType[]
  initialValue?: string
  onBlur?: () => void
  scope?: AddItemScopeTypes
  selected?: boolean
  icon?: React.ReactNode
}

const AddListItem: React.FC<ComponentType> = ({
  onAdd = () => {},
  onCancel = () => {},
  list = [],
  initialValue,
  onBlur = () => {},
  scope = 'create',
  selected = false,
  icon,
}) => {
  const [error, setError] = useState<string>('')

  const submit = (fieldValue: string) => {
    const validate = (value: string) => {
      let errorMessage = ''
      if (!value) errorMessage = 'Field cannot be empty.'
      if (value && list.find(({ title }) => title === value)) {
        errorMessage = 'Name already exist.'
      }
      if (errorMessage) {
        setError(errorMessage)
        return false
      } else {
        return true
      }
    }

    validate(fieldValue) && onAdd(fieldValue)
  }

  const PADDING_Y = 0.4
  return (
    <ListItem
      sx={{
        pt: PADDING_Y,
        pb: error ? 2 : PADDING_Y,
        paddingLeft: '1rem !important',
        minHeight: 32,
        maxWidth: '100%',
        alignItems: 'center',
      }}
      selected={selected}
    >
      {icon && (
        <ListItemIcon sx={{ color: 'inherit', paddingLeft: 0, marginRight: '0' }}>
          {icon}
        </ListItemIcon>
      )}
      <AddItem
        initialValue={initialValue}
        onBlur={onBlur}
        onCancel={onCancel}
        onChange={() => error && setError('')}
        onSubmit={submit}
        error={error}
        sx={{
          marginLeft: -1,
          '& input': {
            paddingLeft: 1.2,
            py: 1,
            fontSize: 14,
          },
        }}
      />
    </ListItem>
  )
}

export default AddListItem
