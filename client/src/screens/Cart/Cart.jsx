import React, { useEffect, useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import AlertModal from '../../components/Alert/Alert'
import CartItem from './CartItem/CartItem'
import CartTotal from './CartTotal/CardTotal'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { addToCartRequest, removeFromCart } from '../../store/modules/Cart/cartActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    margin: '0px',
    minHeight: '75vh',
  },
  product: {
    flexGrow: 1,
  },
}))

const Cart = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const [ id, setId ] = useState('')
  const [ quantity, setQuantity ] = useState('')

  const cart = useSelector((state) => state.cart)
  const { cart: cartItems } = cart

  const checkOutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  useEffect(() => {
    if(id && quantity){
      dispatch(addToCartRequest({ id, quantity }))
    }
  },[id, quantity, dispatch])
  
  return (
    <div className={classes.root}>
      <h2 style={{ marginLeft: '45px' }}>Shopping Cart</h2>
      <Grid container spacing={3} style={{ margin: '20px 0px', width: '100%' }}>
        <div className={classes.product}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={7} lg={8}>
              {cartItems.length === 0 ? (
                <AlertModal />
              ) : (
                <div>
                  {cartItems.map((cart) => (
                    <CartItem 
                      key={cart.product}
                      cart={cart}
                      quantity={quantity}
                      setId={setId}
                      setQuantity={setQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={5} lg={4}>
              <CartTotal 
                cartItems={cartItems} 
                checkOutHandler={checkOutHandler} 
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  )
}

export default Cart
