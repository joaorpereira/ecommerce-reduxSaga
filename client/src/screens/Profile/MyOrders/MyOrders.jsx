import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { columns } from './columns'
import { format } from 'date-fns'
import { useHistory } from 'react-router'
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import Table from '../../../components/Table/Table'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'

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
      i.Cell = ({ row }) => <div style={{display: 'flex', justifyContent: 'center'}}>{formatDate(row.original.createdAt)}</div>
    } else if (i.accessor === 'total') {
      i.Cell = ({ row }) => <div style={{display: 'flex', justifyContent: 'flex-end'}}>{`$${row.original.totalPrice}`}</div>
    } else if (i.accessor === 'paid') {
      i.Cell = ({ row }) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {row.original.isPaid === true ? (
            <CheckBoxIcon style={{ fill: '#4caf50' }} />
          ) : (
            <CheckBoxIcon style={{ fill: '#d92027' }} />
          )}
        </div>
      )
    } else if (i.accessor === 'hour') {
      i.Cell = ({ row }) => <div style={{display: 'flex', justifyContent: 'center'}}>{formatHour(row.original.updatedAt)}</div>
    } else if (i.accessor === 'delivered') {
      i.Cell = ({ row }) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {row.original.isDelivered === true ? (
            <CheckBoxIcon style={{ fill: '#4caf50' }} />
          ) : (
            <CheckBoxIcon style={{ fill: '#d92027' }} />
          )}
        </div>
      )
    } else if (i.accessor === 'button') {
      i.Cell = ({ row }) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button 
            className={classes.button}
            color='secondary' 
            variant='contained' 
            onClick={() => history.push(`/order/${row.original._id}`)}
          >
            Details
          </Button>
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
  button: {
    color:'#fff',
    boxShadow: 'none',
    fontWeight: 900,
  }
}))