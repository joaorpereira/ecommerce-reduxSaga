import React, { useState } from 'react'
import { TextField, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../store/modules/Cart/cartActions'
import StepperComponent from '../../components/Stepper/Stepper'
import Button from '../../components/Button/Button'

const Shipping = () => {
  const classes = useStyles()

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  const history = useHistory()

  const shippingHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <StepperComponent activeStep={1} />
        <h2>Shipping</h2>
        <form className={classes.form} onSubmit={shippingHandler}>
          <Grid style={{ margin: '0' }} container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Address'
                autoFocus
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='City'
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Postal Code'
                type='text'
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Country'
                type='text'
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            size='medium'
            color='primary'
            className={classes.submit}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Shipping

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    fontWeight: 900,
    boxShadow: 'none',
    color: '#fff',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
