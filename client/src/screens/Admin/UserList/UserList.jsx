import React, { useEffect, useState } from 'react'
import Table from '../../../components/Table/Table'
import { Grid, makeStyles } from '@material-ui/core'
import { columns } from './columns'

import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CheckCircle from '@material-ui/icons/CheckCircleOutline'

import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { userListAdminRequest, userDeleteAdminRequest } from '../../../store/modules/AdminUser/userAdminActions'

const useStyles = makeStyles(() => ({
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}))

function UserList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  const [col, setCol] = useState([])

  const {user} = useSelector((state) => state.user)

  const { users, loading } = useSelector((state) => state.usersList)

  const { success } = useSelector((state) => state.userDelete)

  const deleteUserHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(userDeleteAdminRequest(id))
    } 
  }

  useEffect(() => {
    setCol(columns)
  }, [])

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(userListAdminRequest())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, user, success])

  columns.forEach((i) => {
    if (i.accessor === 'id') {
      i.Cell = ({ row }) => <div>{row.original._id}</div>
    } else if (i.accessor === 'Name') {
      i.Cell = ({ row }) => <div>{row.original.name}</div>
    } else if (i.accessor === 'total') {
      i.Cell = ({ row }) => <div>{row.original.email}</div>
    } else if (i.accessor === 'admin') {
      i.Cell = ({ row }) => (
        <div>
          {row.original.isAdmin === true ? (
            <CheckCircle style={{ fill: '#4caf50' }} />
          ) : (
            <HighlightOffIcon style={{ fill: '#f44336' }} />
          )}
        </div>
      )
    } else if (i.accessor === 'button') {
      i.Cell = ({ row }) => (
        <div>
          <Button
            variant='contained'
            color='primary'
            style={{ marginRight: '10px' }}
            onClick={() => history.push(`/admin/user/${row.original._id}/edit`)}
          >
            Edit
          </Button>
          <Button 
            variant='contained' 
            color='secondary' 
            onClick={() => deleteUserHandler(row.original._id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  })

  return (
    <Grid className={classes.container} container direction='column'>
      <Grid item lg={12} md={12} xs={12}>
        <h1>Users</h1>
      </Grid>
      {loading ? ( <Loading/> ) : 
      (
        <Grid item lg={12} md={12} xs={12}>
          <Table columns={col} data={users} />
        </Grid>
      )}
    </Grid>
  )
}

export default UserList
