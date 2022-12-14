import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Collapse, ListItem, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { TransitionGroup } from 'react-transition-group'
import AddListItem from './AddListItem'
import { ListItemType, ProjectType } from '../../src/types'
import DynamicListItem from './DynamicListItem'
import { Pulse } from '../../src/animations'

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

const DynamicList: React.FC<ComponentType> = ({
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
    <Box sx={{ pb: open ? 2 : 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 5,
          mb: 1,
          position: 'relative',
        }}
      >
        {title && (
          <Typography
            onClick={handleToggleList}
            sx={{
              fontSize: '0.9rem',
              cursor: 'pointer',
              opacity: 0.5,
            }}
          >
            {title}
          </Typography>
        )}
        {!staticMode && (
          <Tooltip title='New Project'>
            <IconButton onClick={handleAddIconClick} size='large' sx={rotate90IconStyle}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
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

export default DynamicList
