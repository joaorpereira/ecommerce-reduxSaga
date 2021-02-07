import React, { useEffect, useState } from 'react'
import Table from '../../../components/Table/Table'
import { Grid, makeStyles } from '@material-ui/core'
import { columns } from './columns'

import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { userListAdminRequest, userDeleteAdminRequest } from '../../../store/modules/AdminUser/userAdminActions'

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
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {row.original.isAdmin === true ? (
            <CheckBoxIcon style={{ fill: '#4caf50' }} />
          ) : (
            <CheckBoxIcon style={{ fill: '#d92027' }} />
          )}
        </div>
      )
    } else if (i.accessor === 'button') {
      i.Cell = ({ row }) => (
        <div>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            style={{ marginRight: '10px' }}
            onClick={() => history.push(`/admin/user/${row.original._id}/edit`)}
          >
            Edit
          </Button>
          <Button 
            className={classes.button}
            variant='contained' 
            style={{backgroundColor: '#d92027'}}
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
  button: {
    color:'#fff',
    boxShadow: 'none',
    fontWeight: 900,
  }
}))
