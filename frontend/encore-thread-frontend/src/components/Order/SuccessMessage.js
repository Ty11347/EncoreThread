import React from 'react'
import './Order.css'

function SuccessMessage(props) {
  const { message } = props

  return (
    <div className='success-message'>{message}</div>
  )
}

export default SuccessMessage