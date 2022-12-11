import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Collapse, ListItem, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { TransitionGroup } from 'react-transition-group'
import AddListItem from './AddListItem'
import { ProjectItem } from '../../src/types'
import CollapsableListItem from './CollapsableListItem'

const rotate90IconStyle = {
  '& svg': {
    // color: 'rgba(255,255,255,0.8)',
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
  list: ProjectItem[]
  staticMode?: boolean
  newItemIcon?: React.ReactNode
}

const CollapsableList: React.FC<ComponentType> = ({
  title,
  list = [],
  staticMode = false,
  newItemIcon,
}) => {
  const [collapsableList, setCollapsableList] = useState(list)
  const [open, setOpen] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  const handleToggleList = () => {
    setOpen(!open)
    open && setIsAdding(false)
  }

  const handleAddIconClick = () => {
    setIsAdding(true)
  }

  const handleAddItem = (item: string, index: number) => {
    // @ts-ignore
    setCollapsableList([...collapsableList, { title: item, id: index + 1 }])
    !open && setOpen(true)
    setIsAdding(false)
  }

  const handleCancelAddItem = () => {
    setIsAdding(false)
  }

  const handleUpdateItem = (value: string, index: number) => {
    const listClone = JSON.parse(JSON.stringify(collapsableList))
    listClone[index].label = value
    setCollapsableList(listClone)
  }

  const handleDeleteItem = (index: number) => {
    const listClone: ProjectItem[] = JSON.parse(JSON.stringify(collapsableList))
    const newList = listClone.filter((item, i) => i !== index && item)
    setCollapsableList(newList)
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
          collapsableList.map((item, index) => (
            <Collapse key={item.id}>
              <CollapsableListItem
                item={item}
                list={collapsableList}
                onUpdate={(value) => handleUpdateItem(value, index)}
                onDelete={() => handleDeleteItem(index)}
                staticMode={staticMode}
              />
            </Collapse>
          ))}
        {isAdding && !staticMode && (
          <Collapse>
            <AddListItem
              icon={newItemIcon}
              onAdd={(v) => handleAddItem(v, collapsableList.length)}
              onCancel={handleCancelAddItem}
              onBlur={handleCancelAddItem}
              list={collapsableList}
            />
          </Collapse>
        )}
      </TransitionGroup>
    </Box>
  )
}

export default CollapsableList
