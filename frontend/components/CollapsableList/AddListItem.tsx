import React, { useState } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem } from '@mui/material'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'
import AddItem from '../AddItem'
import { ScopeType } from '@typescript-eslint/scope-manager'
import { AddItemScopeTypes, ProjectItem } from '../../src/types'

type ComponentType = {
  onAdd: (value: string) => void
  onCancel: () => void
  list: ProjectItem[]
  initialValue?: string
  onBlur?: () => void
  scope?: AddItemScopeTypes
  selected?: boolean
}

const AddListItem: React.FC<ComponentType> = ({
  onAdd = () => {},
  onCancel = () => {},
  list = [],
  initialValue,
  onBlur = () => {},
  scope = 'create',
  selected = false,
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
        pl: 3,
        minHeight: 32,
        color: 'rgba(255,255,255,.8)',
        maxWidth: '100%',
        alignItems: 'center',
      }}
      selected={selected}
    >
      {/*<ListItemIcon sx={{ color: 'inherit', paddingLeft: 1, marginRight: '0' }}>*/}
      {/*  <LibraryAddCheckOutlinedIcon />*/}
      {/*</ListItemIcon>*/}
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
