import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from "@mui/material"
// eslint-disable-next-line react/display-name
const Togglable = forwardRef( (props,refs) => {
  const [showForm, setShowForm] = useState(false)
  const onButtonClick = () => {
    setShowForm(!showForm)
  }
  useImperativeHandle(refs, () => {
    return {
      onButtonClick
    }
  })
  if (showForm) {
    return (
      <div>
        {props.children}
        <Button variant="contained" onClick={onButtonClick}>{props.altmessage}</Button>
      </div>
    )
  }
  else {
    return (
      <div><Button variant="contained" onClick={onButtonClick}>{props.message}</Button></div>
    )
  }
})

Togglable.propTypes = {
  message: PropTypes.string.isRequired,
  altmessage: PropTypes.string.isRequired
}

export default Togglable