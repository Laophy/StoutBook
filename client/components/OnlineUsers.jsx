import React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Client socket connection
import { io } from 'socket.io-client'

// const domain = 'https://laophy.com'
const domain = 'http://localhost:3000'
const socket = io(domain)

export default function OnlineUsers (props) {
  const [users, setUsers] = React.useState([])
  React.useEffect(() => {
    socket.on('join_room', (data, socketid) => {
      setUsers([...users, { username: data.username, id: socketid }])
    })
    socket.on('leave_room', (socketid) => {
      setUsers([...users.filter((plr) => { return plr.id !== socketid })])
    })
  }, [socket, users])
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, marginTop: 10, marginLeft: 1, marginRight: 5, boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;', width: '15%', height: '75vh', float: 'left', overflow: 'auto', overflowX: 'hidden', padding: 2, minWidth: '250' }}>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Online Users
          </Typography>
          <ul>
            {users.map((user, i) => (
              <li key={i}>{i} - {user.username}</li>
            ))}
          </ul>
      </Box>
    </React.Fragment>
  )
}
