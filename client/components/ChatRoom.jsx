import React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'

// Client socket connection
import { io } from 'socket.io-client'
import ChatCard from './ChatCard'

const domain = 'wss://laophy.com:3001'
const socket = io(domain, { transports: ['websocket'] })

export default function ChatRoom (props) {
  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const messageContainer = React.useRef(null)
  const [time, setTime] = React.useState('fetching')

  React.useEffect(() => {
    socket.on('connect', () => console.log(socket.id))
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 3001)
    })
    socket.on('time', (data) => setTime(data))
    socket.on('disconnect', () => setTime('server disconnected'))
  }, [])

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      socket.emit('send_message', { message })
      setMessages([...messages, { message, title: 'YOU', self: true }])
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
      setMessages([...messages, { message: data.message, title: 'OTHER', self: false }])
    })
  }, [messages])

  return (
    <React.Fragment>
      <h2 style={{ fontSize: 35, margin: 25 }}>Chat Room 1</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} columns={12}>
          <Grid xs={16} padding={3}>
            <div className='messages-container' style={{ height: '100%' }} ref={messageContainer}>
              {
                messages.map((msgg, i) =>
                  (<ChatCard key={i} title={msgg.title} message={msgg.message} self={msgg.self}/>)
                )
              }
            </div>
          </Grid>
          <Grid xs={16} padding={3} style={{ width: '100%', bottom: 0 }}></Grid>
          <Grid xs={10} padding={3} style={{ width: '100%', position: 'fixed', bottom: 0, float: 'left' }}>
            <TextField autoComplete='false' id="outlined-basic" label="Message" variant="outlined" fullWidth onChange={(e) => { setMessage(e.target.value) }} onKeyDown={sendMessage}/>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}
