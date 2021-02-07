import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import * as S from './styled'
import { useHistory } from 'react-router'
import format from 'date-fns/format'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80%',
    margin: '0 auto',
    minHeight: '60vh',
  },
  text: {
    margin: '10px 0px 0px 0px',
    fontSize: '13px'
  },
  alert: {},
}))

function OrderDetails({ order, id, user}) {
  const classes = useStyles()
  const history = useHistory()
  
  const { orderItems, paymentMethod, shippingAddress, isPaid, paidAt, isDelivered, deliveredAt } = order

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy')
  }

  console.log(order)

  return (
    <>
    { user && order && 
      (<div className={classes.root} variant='outlined'>
        <S.OrderTypography variant='h6'>
            <span style={{ letterSpacing: '2px', fontSize: '22px' }}>order </span>
            <span style={{ letterSpacing: '1px', fontSize: '14px' }}>{id}</span>
        </S.OrderTypography>
        <S.ItemAddress style={{ position: 'relative' }}>
          <S.StyledTypography variant='h6'>
            SHIPPING
          </S.StyledTypography>
          <Typography className={classes.text}>
            <strong>Name: </strong>
            {user.name}
          </Typography>
          <Typography className={classes.text}>
            <strong>Email: </strong>
            {user.email}
          </Typography>
          <Typography className={classes.text}>
            <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}{' '}
            - {shippingAddress.country}
          </Typography>
          {isDelivered ? (
            <Alert style={{ position: 'absolute', right: '5px', top: '40px' }} variant='filled' severity='success'>
              Delivered at {formatDate(deliveredAt)}
            </Alert>
          ) : (
            <Alert style={{ position: 'absolute', right: '5px', top: '40px' }} variant='filled' severity='error'>
              Not delivered
            </Alert>
          )}
        </S.ItemAddress>
        <S.StyledDivider />
        <S.ItemContainer style={{ position: 'relative' }}>
          <S.StyledTypography variant='h6'>
            PAYMENT METHOD
          </S.StyledTypography>
          <Typography className={classes.text}>
            <strong>Method:</strong> {paymentMethod}
          </Typography>
          {isPaid ? (
            <Alert style={{ position: 'absolute', right: '5px', top: '10px' }} variant='filled' severity='success'>
              Paid on {formatDate(paidAt)}
            </Alert>
          ) : (
            <Alert style={{ position: 'absolute', right: '5px', top: '10px' }} variant='filled' severity='error'>
              Not paid
            </Alert>
          )}
        </S.ItemContainer>
        <S.StyledDivider />
        <S.ItemContainer>
          <S.StyledTypography variant='h6' style={{ marginBottom: '10px' }}>
            <strong>ORDER ITEMS</strong>
          </S.StyledTypography>
          {orderItems.length !== 0 ? (
            orderItems.map((item) => (
              <S.OrderContainer key={item.name}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.Image src={item.image} alt={item.name} />
                  <S.Button onClick={() => history.push(`/product/${item.product}`)}>
                    <Typography>{item.name}</Typography>
                  </S.Button>
                </div>
                <Typography style={{ marginRight: '20px' }}>
                  {item.quantity} x ${item.price} = <strong>${Number(item.quantity * item.price).toFixed(2)}</strong>
                </Typography>
              </S.OrderContainer>
            ))
          ) : (
            <Typography>Your cart is empty!</Typography>
          )}
        </S.ItemContainer>
      </div>
      )}
    </>
  )
}

export default OrderDetails
