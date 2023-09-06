import React, { useMemo, useState } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Collapse, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import TrashButton from '../../TrashButton'
import Link from 'next/link'
import { ListItemType } from '../../../types'
import theme from '../../../theme'
import { useRouter } from 'next/router'
import { Pulse, Fade } from '../../../animations'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import DescriptionIcon from '@mui/icons-material/Description'
import { AddListItem } from '@common/dynamicList/elements'

type ComponentType = {
  item: ListItemType
  list: ListItemType[]
  onUpdate: (value: string) => void
  onDelete: () => void
  staticMode?: boolean
}

export const DynamicListItem: React.FC<ComponentType> = ({
  item,
  list = [],
  onUpdate = () => {},
  onDelete = () => {},
  staticMode,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false)
  const router = useRouter()

  const visibleOnHover = (selected: boolean) => ({
    '& .hidden-button': {
      transition: '.2s ease',
      display: selected ? 'block' : 'none',
    },
  })

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
          paddingLeft: '1.2rem !important',
          paddingRight: '0 !important',
          minHeight: 32,
          color: selected ? `${theme.palette.primary.main} !important` : 'auto',
          '& .hidden-button': {
            display: selected ? 'block' : 'none',
            opacity: 0,
            transition: '.2s ease',
          },
          '&:hover .hidden-button': {
            opacity: 1,
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
            {selected ? <DescriptionIcon /> : <DescriptionOutlinedIcon />}
          </ListItemIcon>
        </Pulse>
        <ListItemText
          primary={item?.title}
          primaryTypographyProps={{
            // fontWeight: '100',
            fontSize: '0.95rem',
          }}
        />
        {!staticMode && (
          <Fade when={selected}>
            <IconButton
              className='hidden-button'
              edge='end'
              aria-label='edit'
              size='small'
              color='inherit'
              sx={{
                mr: 0.2,
                py: 0,
              }}
              onClick={() => setEditMode(true)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
            <TrashButton
              className='hidden-button'
              onDelete={onDelete}
              sx={{
                // color: selected ? 'inherit' : 'primary.main',
                color: 'text.danger',
                py: 0,
              }}
            />
          </Fade>
        )}
      </ListItemButton>
    </Link>
  )
}
