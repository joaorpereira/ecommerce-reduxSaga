import React, { useEffect, useLayoutEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Product from '../../components/Cart/Cart'
import Loading from '../../components/Loading/Loading'

import {
  Grid,
  Fade,
  FormControlLabel,
  Slider,
  Switch,
  TextField,
} from '@material-ui/core'
import {
  StyledWrap,
  StyledFilter,
  StyledFilterItem,
  StyledButton,
} from './styled'

import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/modules/Product/productActions'
import { addToCartRequest } from '../../store/modules/Cart/cartActions'
import { useHistory } from 'react-router'
import CarouselSlide from '../../components/CarouselSlide/CarouselSlide'

const Home = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState([0, 10000])
  const [productName, setProductName] = useState('')
  const [orderBy, setOrderBy] = useState(null)

  const [newList, setNewList] = useState(null)

  const products = useSelector(state => state.products)
  const { isLoggedIn } = useSelector(state => state.user)
  const { loading, products: productsList } = products

  useLayoutEffect(() => {
    dispatch(actions.productsRequest())
  }, [dispatch])

  useEffect(() => {
    setNewList(productsList)
  }, [productsList])

  const chipData = [
    { key: 0, label: 'Crescente' },
    { key: 1, label: 'Descrescente' },
  ]

  const handleFilter = () => {
    setChecked(!checked)
    setValue([0, 10000])
    setProductName('')
    setOrderBy(null)
  }

  const handleSlider = (event, newValue) => {
    setValue(newValue)
  }

  const addToCartHandler = id => {
    if (isLoggedIn && id) {
      dispatch(addToCartRequest({ id: id, quantity: 1 }))
      history.push('/cart')
    } else {
      history.push('/login')
    }
  }

  const body =
    newList &&
    newList
      .sort((a, b) => (orderBy === 0 ? a.price - b.price : null))
      .sort((a, b) => (orderBy === 1 ? b.price - a.price : null))
      .filter(product =>
        product.name.toLowerCase().includes(productName.toLowerCase())
      )
      .filter(product => Math.ceil(product.price) > value[0] && product)
      .filter(product => Math.ceil(product.price) < value[1] && product)
      .map(product => (
        <Grid
          item
          xs={12}
          sm={4}
          lg={3}
          className={classes.control}
          key={product._id}
        >
          <Product
            id={product._id}
            addToCartHandler={addToCartHandler}
            product={product}
          />
        </Grid>
      ))

  const sortedProductsByRating = products.products.sort((a, b) => a.rating - b.rating)
      
  const lastThreeProducts = sortedProductsByRating.slice(Math.max(sortedProductsByRating.length - 3, 1))

  return (
    <div className={classes.root}>
      <CarouselSlide products={lastThreeProducts}/>
      <FormControlLabel
        style={{ marginLeft: '70px' }}
        control={<Switch checked={checked} onChange={handleFilter} />}
        label='Filters'
      />
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={3} style={{ width: '100%', margin: 0 }}>
          {checked && (
            <Fade in={checked}>
              <Grid item xs={2}>
                <StyledFilter>
                  <StyledFilterItem>
                    <TextField
                      variant='outlined'
                      margin='dense'
                      fullWidth
                      label='Product Name'
                      InputLabelProps={{ shrink: true }}
                      value={productName}
                      onChange={e => setProductName(e.target.value)}
                    />
                  </StyledFilterItem>
                  <StyledFilterItem
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '45px',
                    }}
                  >
                    <Slider
                      style={{ width: 150 }}
                      color='secondary'
                      value={value}
                      onChange={handleSlider}
                      valueLabelDisplay='on'
                      max={1000}
                      min={0}
                    />
                  </StyledFilterItem>
                  <StyledFilterItem>
                    <StyledWrap>
                      {chipData.map(data => (
                        <StyledButton
                          key={data.key}
                          onClick={() => setOrderBy(data.key)}
                          backGround={orderBy}
                        >
                          {data.label}
                        </StyledButton>
                      ))}
                    </StyledWrap>
                  </StyledFilterItem>
                </StyledFilter>
              </Grid>
            </Fade>
          )}
          <Grid item xs={checked ? 10 : 12} style={{ width: '100%' }}>
            <Grid container spacing={3}>
              {body}
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Home

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    margin: '0px',
    minHeight: '80vh',
  },
  control: {
    padding: theme.spacing(2),
    textAlign: 'center',
    maxWidth: '100%',
    margin: '0px',
    display: 'flex',
    justifyContent: 'center',
  },
}))
