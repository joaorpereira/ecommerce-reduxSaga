import React, { useEffect, useLayoutEffect, useState } from 'react'
import * as S from './styled'
import { Grid, makeStyles } from '@material-ui/core'
import { columns } from './columns'
import format from 'date-fns/format'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { orderListAdminRequest } from '../../../store/modules/AdminOrder/orderAdminActions'

function OrderList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const [col, setCol] = useState([])

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy')
  }

  const { loading, orders } = useSelector((state) => state.ordersList)
  const {user} = useSelector((state) => state.user)

  useEffect(() => {
    setCol(columns)
  }, [])

  useLayoutEffect(() => {
    if (user && user.isAdmin) {
      dispatch(orderListAdminRequest())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, user])

  columns.forEach((i) => {
    if (i.accessor === 'id') {
      i.Cell = ({ row }) => <div>{row.original._id}</div>
    } else if (i.accessor === 'userName') {
      i.Cell = ({ row }) => <div>{row.original.user.name}</div>
    } else if (i.accessor === 'createdAt') {
      i.Cell = ({ row }) => <div style={{display: 'flex', justifyContent: 'center'}}>{formatDate(row.original.createdAt)}</div>
    } else if (i.accessor === 'deliveredAt') {
      i.Cell = ({ row }) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>{row.original.deliveredAt ? formatDate(row.original.deliveredAt) : 'Not yet'}</div>
      )
    } else if (i.accessor === 'totalPrice') {
      i.Cell = ({ row }) => <div style={{display: 'flex', justifyContent: 'flex-end'}}>{`$${row.original.totalPrice}`}</div>
    } else if (i.accessor === 'isPaid') {
      i.Cell = ({ row }) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {row.original.isPaid === true ? (
            <CheckBoxIcon style={{ fill: '#4caf50' }} />
          ) : (
            <CheckBoxIcon style={{ fill: '#d92027' }} />
          )}
        </div>
      )
    } else if (i.accessor === 'isDelivered') {
      i.Cell = ({ row }) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {row.original.isDelivered === true ? (
            <CheckBoxIcon style={{ fill: '#4caf50' }} />
          ) : (
            <CheckBoxIcon style={{ fill: '#d92027' }} />
          )}
        </div>
      )
    }
  })

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ margin: '5px 0px', width: '100%' }}>
        {loading ? ( <Loading/> ) :  
        (
          <>
            <Grid item xs={12} sm={12} lg={12} style={{ margin: 0, width: '100%' }}>
              <S.Box>
                <Button
                  style={{ marginLeft: "40px" }}
                  onClick={() => history.goBack()}
                >
                  <ArrowBackIcon style={{ marginRight: "5px" }} /> Return
                </Button>
                <h2>Orders</h2>
              </S.Box>
            </Grid>
            <Grid item xs={12} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Table columns={col} data={orders} />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  )
}

export default OrderList

const useStyles = makeStyles(() => ({
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