import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { CssBaseline, TextField, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'

import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { productRequest } from '../../../store/modules/Product/productActions'
import { PRODUCT_UPDATE_RESET } from '../../../store/modules/Product/productTypes'
import { updateProductRequest } from '../../../store/modules/Product/productActions'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: 725,
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  submit: {
    color: '#fff',
    boxShadow: 'none',
    fontWeight: 900,
  },
}))

const ProductEdit = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const { loading, product } = useSelector(state => state.product)

  const { loading: loadingUpdate, success: successUpdate } = useSelector(
    state => state.updateProduct
  )

  let { id } = useParams()
  const productId = id

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/products')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productRequest(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, product, productId, successUpdate, history])

  const updateHandler = e => {
    e.preventDefault()
    dispatch(
      updateProductRequest({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  const uploadImageHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }
  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      {loading && <Loading />}
      {loadingUpdate && <Loading />}
      {uploading && <Loading />}
      <div className={classes.paper}>
        <h2>Edit Product</h2>
        <form className={classes.form} onSubmit={updateHandler}>
          <Grid container spacing={2} style={{ width: '100%' }}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                variant='outlined'
                style={{ padding: '0' }}
                required
                fullWidth
                label='Name'
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <TextField
                variant='outlined'
                style={{ padding: '0' }}
                required
                fullWidth
                label='Price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <TextField
                variant='outlined'
                style={{ padding: '0' }}
                required
                fullWidth
                label='Count In Stock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                variant='outlined'
                style={{ padding: '0' }}
                required
                fullWidth
                label='Brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                variant='outlined'
                style={{ padding: '0' }}
                required
                fullWidth
                label='Category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                variant='outlined'
                style={{ padding: '0' }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                label='Image URL'
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                variant='outlined'
                style={{ padding: '0' }}
                InputLabelProps={{ shrink: true }}
                required
                type='file'
                fullWidth
                label='Image File'
                onChange={uploadImageHandler}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                variant='outlined'
                style={{ padding: '0' }}
                required
                fullWidth
                multiline
                rows={4}
                label='Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Button
                onClick={() => history.push('/admin/products')}
                fullWidth
                type='large'
                color='secondary'
                variant='contained'
                className={classes.submit}
              >
                Return
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                size='large'
                color='primary'
                className={classes.submit}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default ProductEdit
