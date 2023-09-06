import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Collapse, ListItem } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { TransitionGroup } from 'react-transition-group'
import { ListItemType } from '../../types'
import theme from '../../theme'
import {
  AddListItem,
  DynamicListItem,
  DynamicListTitle,
} from '@common/dynamicList/elements'

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

type ComponentType = {
  title?: string
  list: ListItemType[]
  staticMode?: boolean
  newItemIcon?: React.ReactNode
  onAdd?: (project: Partial<ListItemType>) => void
  onUpdate?: (project: Partial<ListItemType>) => void
  onDelete?: (project: Partial<ListItemType>) => void
}

export const DynamicList: React.FC<ComponentType> = ({
  title,
  list = [],
  staticMode = false,
  newItemIcon,
  onAdd = () => {},
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  const [open, setOpen] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  const handleToggleList = () => {
    setOpen(!open)
    open && setIsAdding(false)
  }

  const handleAddIconClick = () => {
    setIsAdding(!isAdding)
    setOpen(true)
  }

  const handleAddItem = (title: string) => {
    onAdd({ title })
    !open && setOpen(true)
    setIsAdding(false)
  }

  const handleCancelAddItem = () => {
    setIsAdding(false)
  }

  const handleUpdateItem = (value: string, id: number) => {
    const updatedValues: Partial<ListItemType> = {
      id,
      title: value,
    }
    onUpdate(updatedValues)
  }

  const handleDeleteItem = (id: number) => {
    onDelete({ id })
  }

  return (
    <Box
      sx={{
        bgcolor: open ? theme.palette.background.default : null,
        color: 'text.secondary',
      }}
    >
      <ListItem component='div' disablePadding>
        {title && (
          <DynamicListTitle onClick={handleToggleList} title={title} open={open} />
        )}
        {!staticMode && (
          <Tooltip arrow title='New Project' placement='right'>
            <IconButton
              onClick={handleAddIconClick}
              size='large'
              sx={{
                mx: 0.5,
                ...rotate90IconStyle,
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </ListItem>
      <TransitionGroup>
        {open &&
          list.map((item, index) => (
            <Collapse key={item.id}>
              <DynamicListItem
                item={item}
                list={list}
                onUpdate={(value) => handleUpdateItem(value, item.id)}
                onDelete={() => handleDeleteItem(item.id)}
                staticMode={staticMode}
              />
            </Collapse>
          ))}
        {isAdding && !staticMode && (
          <Collapse>
            <AddListItem
              icon={newItemIcon}
              onAdd={(v) => handleAddItem(v)}
              onCancel={handleCancelAddItem}
              onBlur={handleCancelAddItem}
              list={list}
            />
          </Collapse>
        )}
      </TransitionGroup>
    </Box>
  )
}
