import React, { useState } from 'react'
import { FormControlLabel, Radio, RadioGroup} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import StepperComponent from '../../components/Stepper/Stepper'
import Button from '../../components/Button/Button'

import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { savePayment } from '../../store/modules/Cart/cartActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
  },
  form: {
    width: '250px',
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Payment = () => {
  const classes = useStyles()
  const history = useHistory()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [payment, setPayment] = useState('Paypal')

  const dispatch = useDispatch()
  const shippingHandler = (e) => {
    e.preventDefault()
    dispatch(savePayment(payment))
    history.push('/orders')
  }

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <StepperComponent activeStep={2} />
        <h2>Payment Method</h2>
        <form className={classes.form} onSubmit={shippingHandler}>
          <RadioGroup
            aria-label='payment'
            name='payment1'
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <FormControlLabel value='Paypal' control={<Radio />} label='Paypal' />
            <FormControlLabel value='Stripe' control={<Radio />} label='Stripe' />
          </RadioGroup>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Payment
