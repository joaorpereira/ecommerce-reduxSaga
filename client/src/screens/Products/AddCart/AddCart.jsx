import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
  CardContent,
  Card,
} from '@material-ui/core'

import Button from '../../../components/Button/Button'
import { StyledCardActions } from './styled'

const AddCart = ({ product, addToCartHandler, setQuantity, quantity }) => {
  const classes = useStyles()

  const { countInStock, price } = product

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography style={{ margin: '10px 0px' }}>
          <strong>Price:</strong>&nbsp;${price}
        </Typography>
        <Divider />
        <Typography style={{ margin: '10px 0px' }}>
          <strong>Status:</strong>&nbsp;
          {countInStock > 0 ? 'In stock' : 'Out of stock'}
        </Typography>
        <Divider />
        {countInStock > 0 ? (
          <div className={classes.quantity}>
            <Typography>
              <strong>Quantity:</strong>&nbsp;
            </Typography>
            <FormControl
              size='small'
              variant='outlined'
              className={classes.formControl}
            >
              <Select
                labelId='quantity'
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              >
                {[...Array(countInStock).keys()].map(x => (
                  <MenuItem key={x + 1} value={x + 1}>
                    {x + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider />
          </div>
        ) : (
          <div style={{ height: '60px' }} />
        )}
      </CardContent>
      <StyledCardActions>
        <Button
          className={classes.button}
          fullWidth
          variant='contained'
          size='medium'
          color='secondary'
          disabled={countInStock === 0}
          onClick={addToCartHandler}
        >
          Add to Cart
        </Button>
      </StyledCardActions>
    </Card>
  )
}

export default AddCart

const useStyles = makeStyles({
  root: {
    width: 275,
    maxHeight: 240,
    borderRadius: '10px',
  },
  title: {
    fontSize: 14,
  },
  formControl: {
    width: '70px',
    margin: '10px 00px 10px 5px',
  },
  label: {
    backgroundColor: '#fff',
    padding: '0px 5px',
    color: '#000',
  },
  button: {
    marginTop: '-10px',
    width: '220px',
    boxShadow: 'none',
    color: '#fff',
    fontWeight: 900,
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
  },
})
