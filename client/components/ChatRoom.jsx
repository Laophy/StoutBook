import React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'

// Client socket connection
import { Manager } from 'socket.io-client'
import ChatCard from './ChatCard'

const manager = new Manager('https://laophy.com:3001', {
  autoConnect: true
})

const socket = manager.socket('/')

socket.on('connect', () => {
  const engine = socket.io.engine
  console.log(engine.transport.name) // in most cases, prints "polling"

  engine.once('upgrade', () => {
    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
    console.log(engine.transport.name) // in most cases, prints "websocket"
  })

  engine.on('packet', ({ type, data }) => {
    // called for each packet received
  })

  engine.on('packetCreate', ({ type, data }) => {
    // called for each packet sent
  })

  engine.on('drain', () => {
    // called when the write buffer is drained
  })

  engine.on('close', (reason) => {
    // called when the underlying connection is closed
  })
})

export default function ChatRoom (props) {
  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const messageContainer = React.useRef(null)

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
  }, [socket, messages])

  return (
    <>
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
    </>
  )
}
