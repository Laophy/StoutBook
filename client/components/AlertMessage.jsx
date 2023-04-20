import React from 'react'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export default function AlertMessage (props) {
  const { type, title, description } = props

  return (
    <>
      <Alert severity={type} variant="outlined">
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </>
  )
}
