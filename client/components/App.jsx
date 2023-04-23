import React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Nav from './Nav.jsx'
import ChatRoom from './ChatRoom.jsx'
import OnlineUsers from './OnlineUsers.jsx'

export default function App (props) {
  const [theme, setTheme] = React.useState(false)
  const [username, setUsername] = React.useState('Anonymous')
  const [darkTheme, setDarkTheme] = React.useState(createTheme({
    palette: {
      mode: (theme ? 'dark' : 'light')
    }
  }))

  const updateTheme = (theme) => {
    setTheme(!theme)
  }

  const updateName = (name) => {
    setUsername(name)
  }

  React.useEffect(() => {
    setDarkTheme(createTheme({
      palette: {
        mode: (theme ? 'dark' : 'light')
      }
    }))
  }, [theme])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Nav setMode={(theme) => updateTheme(theme)} updateName={updateName}/>
        <OnlineUsers/>
        <ChatRoom newusername={username}/>
    </ThemeProvider>
    </>
  )
}
