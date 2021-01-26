import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { columns } from './columns'
import { format } from 'date-fns'
import { useHistory } from 'react-router'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CheckCircle from '@material-ui/icons/CheckCircleOutline'

import Table from '../../../components/Table/Table'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    marginLeft: '45px',
  },
}))

const MyOrders = ({ loading, orders }) => {
  const classes = useStyles()
  const history = useHistory()
  const [col, setCol] = useState([])

  useEffect(() => {
    setCol(columns)
  }, [])

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy')
  }

  const formatHour = (hour) => {
    return format(new Date(hour), "HH:mm'h")
  }

  columns.forEach((i) => {
    if (i.accessor === 'id') {
      i.Cell = ({ row }) => <div>{row.original._id}</div>
    } else if (i.accessor === 'date') {
      i.Cell = ({ row }) => <div>{formatDate(row.original.createdAt)}</div>
    } else if (i.accessor === 'total') {
      i.Cell = ({ row }) => <div>{row.original.totalPrice}</div>
    } else if (i.accessor === 'paid') {
      i.Cell = ({ row }) => (
        <div>
          {row.original.isPaid === true ? (
            <CheckCircle style={{ fill: '#4caf50' }} />
          ) : (
            <HighlightOffIcon style={{ fill: '#f44336' }} />
          )}
        </div>
      )
    } else if (i.accessor === 'hour') {
      i.Cell = ({ row }) => <div>{formatHour(row.original.updatedAt)}</div>
    } else if (i.accessor === 'delivered') {
      i.Cell = ({ row }) => (
        <div>
          {row.original.isDelivered === true ? (
            <CheckCircle style={{ fill: '#4caf50' }} />
          ) : (
            <HighlightOffIcon style={{ fill: '#f44336' }} />
          )}
        </div>
      )
    } else if (i.accessor === 'button') {
      i.Cell = ({ row }) => (
        <div>
          <Button onClick={() => history.push(`/order/${row.original._id}`)}>Details</Button>
        </div>
      )
    }
  })

  return (
    <Grid className={classes.container} container direction='column'>
      {loading ? ( <Loading/> ) : 
      (
        <>
          <Grid item lg={12} md={12} xs={12}>
            <h2>My Orders</h2>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Table columns={col} data={orders} />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default MyOrders
