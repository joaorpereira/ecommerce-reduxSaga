import React, { useEffect, useState } from 'react'
import { TextField, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'
import MyOrders from './MyOrders/MyOrders'

import { updateUserProfileRequest } from '../../store/modules/User/userActions'
import { orderListProfileRequest } from '../../store/modules/Order/orderActions'
import { toast } from 'react-toastify'

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
    margin: theme.spacing(2, 0, 2),
    color:'#fff',
    boxShadow: 'none',
    fontWeight: 900,
  },
}))

const Profile = () => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  const { user, loading, isLoggedIn } = useSelector((state) => state.user)
  const { orders, loading: loadingOrders } = useSelector((state) => state.myOrders)

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    } else {
      if (user.name) {
        setName(user.name)
        setEmail(user.email)
        dispatch(orderListProfileRequest(user))
      }
    }
  }, [history, isLoggedIn, dispatch, user])

  const updateProfileHandler = (e) => {
    e.preventDefault()

    if (password !== password2) {
      setMessage('Passwords do not match!')
    } else {
      dispatch(updateUserProfileRequest({ id: user._id, name, email, password }))
      toast.success('Seus dados foram alterados com sucesso')
    }
  }

  return (
    <Grid container style={{ padding: '10px 45px', display: 'flex', alignItems: 'flex-start' }}>
      <Grid item xs={12} sm={3} lg={3}>
        <h2>User Profile</h2>
        {message && (
          <Alert style={{ position: 'absolute', marginTop: '-35px' }} severity='error'>
            {message}
          </Alert>
        )}
        {loading ? ( <Loading /> ) : (
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={updateProfileHandler}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Name'
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Confirm Password'
                type='password'
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <Button 
                type='submit' 
                fullWidth 
                variant='contained' 
                color='primary' 
                className={classes.submit}
                size='large'
              >
                Update
              </Button>
            </form>
          </div>
        )}
      </Grid>
      <Grid item xs={12} sm={9} lg={9}>
        <MyOrders loading={loadingOrders} orders={orders} />
      </Grid>
    </Grid>
  )
}

export default Profile
