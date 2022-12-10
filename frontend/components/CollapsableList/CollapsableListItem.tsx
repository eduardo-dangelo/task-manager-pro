import React, { useMemo, useState } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Collapse, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddListItem from './AddListItem'
import TrashButton from '../TrashButton'
import Link from 'next/link'
import { ProjectItem } from '../../src/types'
import theme from '../../src/theme'
import { useRouter } from 'next/router'

type ComponentType = {
  item: ProjectItem
  list: ProjectItem[]
  onUpdate: (value: string) => void
  onDelete: () => void
  onSelect: (id: number) => void
  selected: boolean
  staticMode?: boolean
}

const CollapsableListItem: React.FC<ComponentType> = ({
  item,
  list = [],
  onUpdate = () => {},
  onDelete = () => {},
  // selected,
  staticMode,
  onSelect,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false)
  const router = useRouter()

  const visibleOnHover = {
    '& .hidden-button': {
      opacity: 0,
      transition: '.2s ease',
    },
    '&:hover': {
      '.hidden-button': {
        opacity: 1,
      },
    },
  }

  const handleDismissClick = () => {
    setEditMode(false)
  }

  const handleUpdate = (value: string) => {
    onUpdate(value)
    setEditMode(false)
  }

  const selected = useMemo(() => {
    return item.route === router.asPath
  }, [item, router.asPath])

  if (editMode && !staticMode) {
    return (
      <Collapse in={editMode}>
        <AddListItem
          initialValue={item?.title}
          onBlur={handleDismissClick}
          onCancel={handleDismissClick}
          onAdd={handleUpdate}
          scope='update'
          list={list}
          selected={selected}
        />
      </Collapse>
    )
  }

  return (
    <Link href={item.route} onClick={() => onSelect(item.id)} {...props}>
      <ListItemButton
        selected={selected}
        sx={{
          py: 1.2,
          mb: 1,
          paddingRight: '0 !important',
          minHeight: 32,
          borderRadius: 2,
          background: selected ? `${theme.palette.primary.main} !important` : 'auto',
          color: selected ? 'white' : 'auto',
          ...visibleOnHover,
        }}
      >
        <ListItemIcon sx={{ color: 'inherit', paddingLeft: 0 }}>
          {item?.icon}
        </ListItemIcon>
        <ListItemText
          primary={item?.title}
          primaryTypographyProps={{ fontWeight: 'medium' }}
        />
        {!staticMode && (
          <>
            <IconButton
              className='hidden-button'
              edge='end'
              aria-label='edit'
              size='small'
              sx={{ mr: 0.2 }}
              onClick={() => setEditMode(true)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
            <TrashButton className='hidden-button' onDelete={onDelete} />
          </>
        )}
      </ListItemButton>
    </Link>
  )
}

export default CollapsableListItem
