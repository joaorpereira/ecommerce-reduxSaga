import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import * as S from './styled'
import { PayPalButton } from 'react-paypal-button-v2'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'

const useStyles = makeStyles({
  root: {
    width: 275,
  },
})

const OrderSummary = ({ order, sdkReady, loadingPay, user, deliverHandler, successPaymentHandler }) => {
  const classes = useStyles()

  const { totalPrice, shippingPrice, taxPrice, orderItems, isPaid, isDelivered } = order

  console.log(user)

  return (
    <Card className={classes.root} variant='outlined'>
      <S.StyledTypography variant='h6'>
        <strong>ORDER SUMMARY</strong>
      </S.StyledTypography>
      <S.StyledCardContent>
        <S.StyledDivider />
        <Typography>
          <strong>Items:</strong>
          <span>{orderItems.length}</span>
        </Typography>
        <S.StyledDivider />
        <Typography>
          <strong>Shipping:</strong>
          <span>$ {shippingPrice}</span>
        </Typography>
        <S.StyledDivider />
        <Typography>
          <strong>Tax:</strong>
          <span>$ {taxPrice}</span>
        </Typography>
        <S.StyledDivider />
        <Typography>
          <strong>Total:</strong>
          <span>$ {totalPrice}</span>
        </Typography>
        <S.StyledDivider />
        {!isPaid && (
          <div style={{ marginTop: '10px' }}>
            {loadingPay && <Loading/>}
            {sdkReady && <PayPalButton amount={totalPrice} onSuccess={successPaymentHandler} />}
          </div>
        )}
        {user.isAdmin && isPaid && !isDelivered && (
          <Button 
            onClick={deliverHandler} 
            fullWidth 
            variant='contained' 
            color='primary' 
          >
            Mark as Delivered
          </Button>          
        )}
      </S.StyledCardContent>
    </Card>
  )
}

export default OrderSummary
