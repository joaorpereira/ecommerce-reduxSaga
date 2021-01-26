import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Card, CardActions, CardContent, Typography} from '@material-ui/core'
import Button from '../../../components/Button/Button'
import * as S from './styled'

const useStyles = makeStyles({
  root: {
    width: 275,
  },
})

const OrderSummary = ({ cartItems, placeOrderHandler, orderSummary }) => {
  const classes = useStyles()

  const { totalPrice, quantityItems, shippingPrice, taxPrice } = orderSummary

  return (
    <Card className={classes.root} variant='outlined'>
      <S.StyledTypography variant='h6'>
        <strong>ORDER SUMMARY</strong>
      </S.StyledTypography>
      <CardContent style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
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
      <CardActions>
        <Button
          style={{ marginTop: '-10px', marginBottom: '10px' }}
          fullWidth
          variant='contained'
          size='big'
          disable={cartItems === 0}
          onClick={placeOrderHandler}
        >
          Place Order
        </Button>
      </CardActions>
    </Card>
  )
}

export default OrderSummary
