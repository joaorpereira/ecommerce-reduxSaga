import { makeStyles } from '@material-ui/core'
import Button from '../../components/Button/Button'
import Alert from '@material-ui/lab/Alert'
import React from 'react'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '300px',
    marginLeft: '45px',
  },
}))

const AlertModal = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Alert
      className={classes.alert}
      severity='info'
      action={
        <Button color='inherit' size='small' variant='text' onClick={() => history.push('/')}>
          Go Back
        </Button>
      }
    >
      Your cart is empty
    </Alert>
  )
}

export default AlertModal
