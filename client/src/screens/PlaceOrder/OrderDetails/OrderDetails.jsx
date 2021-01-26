import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import * as S from './styled'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80%',
    margin: '0 auto',
    minHeight: '60vh',
  },
  text: {
    margin: '10px 0px 0px 0px',
  },
  itemAddress: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 0px 10px 20px',
  },
}))

function OrderDetails({ shippingAddress, paymentMethod, cartItems }) {
  const classes = useStyles()
  const history = useHistory()
  const { address, city, country, postalCode } = shippingAddress

  return (
    <div className={classes.root} variant='outlined'>
      <div className={classes.itemAddress}>
        <S.StyledTypography variant='h6'>
          <strong>SHIPPING</strong>
        </S.StyledTypography>
        <Typography className={classes.text} variant='body1'>
          <strong>Address:</strong> {address}, {city}, {postalCode} - {country}
        </Typography>
      </div>
      <S.StyledDivider />
      <S.ItemContainer>
        <S.StyledTypography variant='h6'>
          <strong>PAYMENT METHOD</strong>
        </S.StyledTypography>
        <Typography className={classes.text} variant='body1'>
          <strong>Method:</strong> {paymentMethod}
        </Typography>
      </S.ItemContainer>
      <S.StyledDivider />
      <S.ItemContainer>
        <S.StyledTypography variant='h6' style={{ marginBottom: '10px' }}>
          <strong>ORDER ITEMS</strong>
        </S.StyledTypography>
        {cartItems.length !== 0 ? (
          cartItems.map((item) => (
            <S.OrderContainer key={item}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <S.Image src={item.image} alt={item.name} />
                <S.Button onClick={() => history.push(`/product/${item.product}`)}>
                  <Typography variant='body1'>{item.name}</Typography>
                </S.Button>
              </div>
              <Typography variant='body1' style={{ marginRight: '20px' }}>
                {item.quantity} x ${Number(item.price).toFixed(2)} = <strong>${Number(item.quantity * item.price).toFixed(2)}</strong>
              </Typography>
            </S.OrderContainer>
          ))
        ) : (
          <Typography variant='body1'>Your cart is empty!</Typography>
        )}
      </S.ItemContainer>
    </div>
  )
}

export default OrderDetails
