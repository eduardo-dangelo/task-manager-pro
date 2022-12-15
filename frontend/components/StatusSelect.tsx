import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Chip } from '@mui/material'
import { StatusType } from '../src/types'

const statusOptions = [
  { label: 'Initiated', value: 'IN' },
  { label: 'In progress', value: 'IP' },
  { label: 'Parked', value: 'PK' },
  { label: 'Blocked', value: 'BK' },
  { label: 'Completed', value: 'CP' },
  { label: 'Canceled', value: 'CC' },
]

type ComponentType = {
  value: StatusType
}

const StatusSelect: React.FC<ComponentType> = ({ value }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [statusValue, setStatusValue] = React.useState(value)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (s) => {
    setAnchorEl(null)
    setStatusValue(s)
  }

  const statusColor = {
    'IN': '#aaaaaa',
    'IP': '#aaaaaa',
    'PK': '#aaaaaa',
    'BK': '#aaaaaa',
    'CP': '#aaaaaa',
    'CC': '#aaaaaa',
  }

  return (
    <div>
      <Chip
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        label={statusValue}
        size='small'
        sx={{ ml: 2, background: statusColor[statusValue] }}
      />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {statusOptions.map((status, key) => (
          <MenuItem key={key} onClick={() => handleClose(status.value)}>
            {status.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default StatusSelect
