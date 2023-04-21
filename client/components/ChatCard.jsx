/* eslint-disable react/prop-types */
import React from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'

export default function ChatCard (props) {
  const { username, message, self } = props
  return (
    <>
      <Card sx={{ margin: 2, width: '50%', float: (self === true ? 'right' : 'left') }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              {username?.charAt(0)}
            </Avatar>
          }
          title={
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {username}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {message}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Reply</Button>
        </CardActions>
      </Card>
    </>
  )
}
