import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import * as S from './styled'
import { PayPalButton } from 'react-paypal-button-v2'
import Loading from '../../../components/Loading/Loading'

const useStyles = makeStyles({
  root: {
    width: 275,
  },
})

const OrderSummary = ({ order, sdkReady, loadingPay, successPaymentHandler }) => {
  const classes = useStyles()

  const { totalPrice, shippingPrice, taxPrice, orderItems } = order

  return (
    <Card className={classes.root} variant='outlined'>
      <S.StyledTypography variant='h6'>
        <strong>ORDER SUMMARY</strong>
      </S.StyledTypography>
      <S.StyledCardContent>
        <S.StyledDivider />
        <Typography variant='body1'>
          <strong>Items:</strong>
          <span>{orderItems.length}</span>
        </Typography>
        <S.StyledDivider />
        <Typography variant='body1'>
          <strong>Shipping:</strong>
          <span>$ {shippingPrice}</span>
        </Typography>
        <S.StyledDivider />
        <Typography variant='body1'>
          <strong>Tax:</strong>
          <span>$ {taxPrice}</span>
        </Typography>
        <S.StyledDivider />
        <Typography variant='body1'>
          <strong>Total:</strong>
          <span>$ {totalPrice}</span>
        </Typography>
        <S.StyledDivider />
        {!order.isPaid && (
          <div style={{ marginTop: '10px' }}>
            {loadingPay && <Loading/>}
            {sdkReady && <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
          </div>
        )}
      </S.StyledCardContent>
    </Card>
  )
}

export default OrderSummary
