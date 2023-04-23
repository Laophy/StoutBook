import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function Nav (props) {
  const { setMode, updateName } = props
  const [lightmode, setLightmode] = React.useState(false)

  const handleChange = (event) => {
    setLightmode(event.target.checked)
    setMode(lightmode)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <FormControlLabel
              control={
                <Switch
                  checked={lightmode}
                  onChange={handleChange}
                  aria-label="login switch"
                />
              }
              label={lightmode ? 'Dark Mode' : 'Light Mode'}
            />
            <IconButton
              size="large"
              edge="start"
              color="warning"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              StoutBook
            </Typography>
            <TextField autoComplete='false' id="standard-basic" label="Edit Name" variant="standard" onChange={(e) => { updateName(e.target.value) }} onKeyDown={() => {}} defaultValue={'Anonymous'}/>
            {/* <Button color="inherit">LOGIN</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
