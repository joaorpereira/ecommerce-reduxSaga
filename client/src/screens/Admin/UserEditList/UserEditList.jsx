import React, { useEffect, useState } from 'react'
import {
  CssBaseline,
  TextField,
  Container,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'

import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { USER_UPDATE_RESET } from '../../../store/modules/User/userTypes'
import * as actions from '../../../store/modules/User/userActions'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
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
}))

const UserEditList = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  let { id } = useParams()
  const userId = id

  const { loading, user }  = useSelector((state) => state.user)

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    const { name, _id, email, isAdmin } = user

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/users')
    } else {
      if (!name || _id !== userId) {
        dispatch(actions.getUserDetailsRequest(userId))
      } else {
        setName(name)
        setEmail(email)
        setIsAdmin(isAdmin)
      }
    }
  }, [dispatch, user, userId, successUpdate, history])

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(actions.updateUserProfileRequest({ _id: userId, name, email, isAdmin }))
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      {loading && <Loading/>}
      {loadingUpdate && <Loading/>}
      <div className={classes.paper}>
        <h2>Edit User</h2>
        <Button
          onClick={() => history.push('/admin/users')}
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Go Back
        </Button>
        <form className={classes.form} onSubmit={updateHandler}>
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
          <FormControlLabel
            control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} color='primary' />}
            label='Is Admin'
          />
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Update
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default UserEditList
