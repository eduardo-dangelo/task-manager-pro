import React, { useState } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem } from '@mui/material'
import { AddItemScopeTypes, ListItemType } from '../../../types'
import { Pulse, Fade } from '../../../animations'
import theme from '../../../theme'
import { AddListItemForm } from '@common/dynamicList/elements'

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

export const AddListItem: React.FC<ComponentType> = ({
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
    <Fade>
      <ListItem
        sx={{
          pt: PADDING_Y,
          pb: error ? 2 : PADDING_Y,
          paddingLeft: '1rem !important',
          minHeight: 32,
          maxWidth: '100%',
          alignItems: 'center',
          borderRadius: 2,
          background: theme.palette.grey.A200,
          color: 'white',
          ['& fieldset']: {
            borderRadius: 1.5,
            fontWeight: '100',
            boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.1)',
            fontFamily: 'inherit',
          },
        }}
      >
        {icon && (
          <Pulse>
            <ListItemIcon
              sx={{
                paddingLeft: 0,
                marginRight: 0,
              }}
            >
              {icon}
            </ListItemIcon>
          </Pulse>
        )}
        <AddListItemForm
          initialValue={initialValue}
          onBlur={onBlur}
          onCancel={onCancel}
          onChange={() => error && setError('')}
          onSubmit={submit}
          error={error}
          scope={scope}
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
    </Fade>
  )
}
