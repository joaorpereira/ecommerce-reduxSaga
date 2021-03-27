import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Card, CardActions, CardContent, Typography} from '@material-ui/core'
import Button from '../../../components/Button/Button'
import * as S from './styled'

const OrderSummary = ({ cartItems, placeOrderHandler, orderSummary }) => {
  const classes = useStyles()

  const { totalPrice, quantityItems, shippingPrice, taxPrice } = orderSummary

  return (
    <Card className={classes.root} variant='outlined'>
      <S.StyledTypography variant='h6'>
        <strong>ORDER SUMMARY</strong>
      </S.StyledTypography>
      <CardContent className={classes.content} >
        <S.StyledDivider />
        <Typography variant='body1'>
          <strong>Items:</strong>
          <span style={{ float: 'right' }}>{quantityItems}</span>
        </Typography>
        <S.StyledDivider />
        <Typography variant='body1'>
          <strong>Shipping:</strong>
          <span style={{ float: 'right' }}>$ {shippingPrice}</span>
        </Typography>
        <S.StyledDivider />
        <Typography variant='body1'>
          <strong>Tax:</strong>
          <span style={{ float: 'right' }}>$ {taxPrice}</span>
        </Typography>
        <S.StyledDivider />
        <Typography variant='body1'>
          <strong>Total:</strong>
          <span style={{ float: 'right' }}>$ {totalPrice}</span>
        </Typography>
        <S.StyledDivider />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          className={classes.button}
          fullWidth
          variant='contained'
          color='secondary'
          size='medium'
          disabled={cartItems === 0}
          onClick={placeOrderHandler}
        >
          Place Order
        </Button>
      </CardActions>
    </Card>
  )
}

export default OrderSummary

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  button: {
    width: '220px',
    fontWeight: 900,
    boxShadow: "none",
    color: '#fff',
    marginTop: '-10px', 
    marginBottom: '10px'
  },
  content: {
    display: 'flex', 
    flexDirection: 'column', 
    marginTop: '-10px'
  },
  actions:{
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  }
})
