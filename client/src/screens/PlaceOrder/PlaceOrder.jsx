import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import StepperComponent from '../../components/Stepper/Stepper'
import OrderSummary from './OrderSummary/OrderSummary'
import OrderDetails from './OrderDetails/OrderDetails'

import { useDispatch, useSelector } from 'react-redux'
import { createOrderRequest } from '../../store/modules/Order/orderActions'
import { cartReset } from '../../store/modules/Cart/cartActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}))

const PlaceOrder = () => {
  const classes = useStyles()

  const {shippingAddress, paymentMethod, cart : cartItems } = useSelector((state) => state.cart)

  const subTotal = Number(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)
  const quantityItems = Number(cartItems.reduce((acc, item) => acc + item.quantity, 0))
  const shippingPrice = Number(subTotal > 1000 ? 10 : 20).toFixed(2)
  const taxPrice = Number(subTotal * 0.11).toFixed(2)
  const totalPrice = (Number(subTotal) + Number(taxPrice) + Number(shippingPrice)).toFixed(2)

  const orderSummary = {
    totalPrice,
    quantityItems,
    shippingPrice,
    taxPrice,
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const { order, success } = useSelector((state) => state.orderCreate)

  const { _id } = order
  
  useEffect(() => {
    if (success) {
      history.push(`order/${_id}`)
    }
  }, [history, success, _id])

  const placeOrderHandler = () => {
    dispatch(
      createOrderRequest({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: subTotal,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    )
    dispatch(cartReset())
  }

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <StepperComponent activeStep={3} />
      </div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={8} lg={8}>
          <OrderDetails 
            shippingAddress={shippingAddress} 
            paymentMethod={paymentMethod} 
            cartItems={cartItems} />
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>
          <OrderSummary
            placeOrderHandler={placeOrderHandler}
            cartItems={cartItems}
            orderSummary={orderSummary}
          />
        </Grid> 
      </Grid>
    </div>
  )
}

export default PlaceOrder
