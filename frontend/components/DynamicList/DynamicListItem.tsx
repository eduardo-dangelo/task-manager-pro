import React, { useMemo, useState } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Collapse, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddListItem from './AddListItem'
import TrashButton from '../TrashButton'
import Link from 'next/link'
import { ListItemType } from '../../src/types'
import theme from '../../src/theme'
import { useRouter } from 'next/router'
import { HeadShake, Jump, Pulse, Reveal, Slide } from '../../src/animations'

type ComponentType = {
  item: ListItemType
  list: ListItemType[]
  onUpdate: (value: string) => void
  onDelete: () => void
  staticMode?: boolean
}

const DynamicListItem: React.FC<ComponentType> = ({
  item,
  list = [],
  onUpdate = () => {},
  onDelete = () => {},
  staticMode,
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
          icon={item.icon}
        />
      </Collapse>
    )
  }

  return (
    <Link href={item.route} {...props}>
      <ListItemButton
        sx={{
          py: 0.5,
          mb: 0.5,
          paddingLeft: '1rem !important',
          paddingRight: '0 !important',
          minHeight: 32,
          borderRadius: 2,
          background: selected ? `${theme.palette.primary.main} !important` : 'auto',
          color: selected ? 'white' : 'auto',
          ...visibleOnHover,
          '&:hover svg': {
            color: selected ? 'inherit' : 'secondary.main',
          },
        }}
      >
        <Pulse when={selected} spy={editMode}>
          <ListItemIcon
            sx={{
              color: selected ? 'inherit' : 'primary',
              paddingLeft: 0,
            }}
          >
            {item?.icon}
          </ListItemIcon>
        </Pulse>
        <ListItemText
          primary={item?.title}
          primaryTypographyProps={{
            fontWeight: '100',
            fontSize: '0.95rem',
          }}
        />
        {!staticMode && (
          <Pulse when={selected}>
            <IconButton
              className='hidden-button'
              edge='end'
              aria-label='edit'
              size='small'
              color='inherit'
              sx={{ mr: 0.2, color: selected ? 'inherit' : 'primary.main' }}
              onClick={() => setEditMode(true)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
            <TrashButton
              className='hidden-button'
              onDelete={onDelete}
              sx={{ color: selected ? 'inherit' : 'primary.main' }}
            />
          </Pulse>
        )}
      </ListItemButton>
    </Link>
  )
}

export default DynamicListItem
