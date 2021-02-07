import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'

import Table from '../../../components/Table/Table'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import { useDispatch, useSelector } from 'react-redux'
import { columns } from './columns'
import { useHistory } from 'react-router'
import * as actions from '../../../store/modules/Product/productActions'
import { PRODUCT_CREATE_RESET } from '../../../store/modules/Product/productTypes'
import { createProductRequest, deleteProductRequest } from '../../../store/modules/Product/productActions'

function ProductList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const [col, setCol] = useState([])

  useEffect(() => {
    setCol(columns)
  }, [])

  const { loading, products: productsList } = useSelector((state) => state.products)

  const { user } = useSelector((state) => state.user)

  const { loading: loadingDelete,  success: successDelete } = useSelector((state) => state.deleteProduct)

  const { loading: loadingCreate,  success: successCreate, product: createdProduct } = useSelector((state) => state.createProduct)

  useLayoutEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!user.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(actions.productsRequest())
    }
  }, [dispatch, history, user, successDelete, successCreate, createdProduct])

  const deleteProductHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProductRequest(id))
    }
  }

  const handleCreateProduct = () => {
    dispatch(createProductRequest())
  }

  columns.forEach((i) => {
    if (i.accessor === 'id') {
      i.Cell = ({ row }) => <div>{row.original._id}</div>
    } else if (i.accessor === 'Name') {
      i.Cell = ({ row }) => <div>{row.original.name}</div>
    } else if (i.accessor === 'price') {
      i.Cell = ({ row }) => <div>${row.original.price}</div>
    } else if (i.accessor === 'category') {
      i.Cell = ({ row }) => <div>{row.original.category}</div>
    } else if (i.accessor === 'brand') {
      i.Cell = ({ row }) => <div>{row.original.brand}</div>
    } else if (i.accessor === 'button') {
      i.Cell = ({ row }) => (
        <div>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            style={{ marginRight: '10px' }}
            onClick={() => history.push(`/admin/product/${row.original._id}/edit`)}
          >
            Edit
          </Button>
          <Button 
            className={classes.button}
            variant='contained' 
            style={{backgroundColor: '#d92027'}}
            onClick={() => deleteProductHandler(row.original._id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  })

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ margin: '5px 0px', width: '100%' }}>
        {loadingDelete && <Loading/>}
        {loadingCreate && <Loading/>}
        {loading ? ( <Loading/> ) : 
        (
          <>
            <Grid item xs={12} sm={12} lg={12} style={{ margin: 0, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 50px' }}>
                <Button
                  style={{ marginLeft: "40px" }}
                  onClick={() => history.goBack()}
                >
                  <ArrowBackIcon style={{ marginRight: "5px" }} /> Return
                </Button>
                <h2>Products</h2>
                <Button
                  className={classes.button}
                  style={{ marginRight: '40px' }}
                  onClick={handleCreateProduct}
                  variant='contained'
                  color='secondary' 
                >
                  <NoteAddIcon style={{ marginRight: "5px", fill:'#fff' }} /> Create Product
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Table columns={col} data={productsList} />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  )
}

export default ProductList

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    margin: '0px',
    padding: '15px',
    marginBottom: '50px',
  },
  product: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    color:'#fff',
    boxShadow: 'none',
    fontWeight: 900,
  }
}))