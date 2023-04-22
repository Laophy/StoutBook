import React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'

// Client socket connection
import { io } from 'socket.io-client'
import ChatCard from './ChatCard'

const domain = 'https://laophy.com'
// const domain = 'http://localhost:3000'
const socket = io(domain)

export default function ChatRoom (props) {
  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const [username, setUsername] = React.useState('Anonymous')
  const messageContainer = React.useRef(null)
  const [time, setTime] = React.useState('fetching')

  React.useEffect(() => {
    socket.on('connect', async () => await setUsername(prompt('Enter a Username')))
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 3001)
    })
    socket.on('time', (data) => setTime(data))
    socket.on('disconnect', () => setTime('server disconnected'))

    socket.emit('set_username', { username })
  }, [username])

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      socket.emit('send_message', { message, username })
      setMessages([...messages, { message, username, self: true }])
      e.target.value = ''
    }
  }

  React.useEffect(() => {
    if (messageContainer) {
      messageContainer.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
        window.scrollTo(0, target.scrollHeight)
      })
    }
  }, [messages])

  React.useEffect(() => {
    socket.on('receive_message', (data) => {
      // alert(data.message)
      setMessages([...messages, { message: data.message, username: data.username, self: false }])
    })
    socket.on('join_room', (data) => {
      // alert(data.message)
      setMessages([...messages, { message: `${data.username} has joined the room.`, username: '', self: false, joined: true }])
    })
    // Not working
    socket.on('leave_room', (socketid) => {
      // alert(data.message)
      setMessages([...messages, { message: `${socketid} has left the room.`, username: '', self: false, joined: true }])
    })
  }, [socket, messages])

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, marginTop: 10, boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;', width: '75%', height: '75vh', float: 'left', overflow: 'auto', overflowX: 'hidden' }} ref={messageContainer}>
        <Grid container spacing={3} columns={16}>
          <Grid xs={16} padding={3}>
            <div className='messages-container' style={{ height: '100%' }}>
              {
                messages.map((msgg, i) =>
                  (msgg.joined
                    ? <ChatCard key={i} username={msgg.username} message={msgg.message} self={msgg.self} joined={msgg.joined}/>
                    : <ChatCard key={i} username={msgg.username} message={msgg.message} self={msgg.self} />)
                )
              }
            </div>
          </Grid>
          <Grid xs={16} padding={3} style={{ width: '100%', bottom: 0 }}></Grid>
        </Grid>
      </Box>
      <Grid xs={10} padding={3} style={{ width: '100%', position: 'fixed', bottom: 0, float: 'left' }}>
        <TextField autoComplete='false' id="outlined-basic" label="Send Message" variant="outlined" fullWidth onChange={(e) => { setMessage(e.target.value) }} onKeyDown={sendMessage} />
      </Grid>
    </React.Fragment>
  )
}
