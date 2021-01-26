import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import axios from '../../../services/axios'

import * as actions from './userActions'
import * as types from './userTypes'

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/api/users/login', payload)
    yield put(actions.loginSuccess({ ...response.data }))
    toast.success('Você realizou login com sucesso')
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
  } catch (error) {
    toast.error('Usuário ou senha inválidos')
    yield put(actions.loginFail(error))
  }
}

function* singUpRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/api/users', payload)
    yield put(actions.signUpSuccess({ ...response.data }))
    toast.success('Usuário criado com sucesso')
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
  } catch (error) {
    toast.error('Usuário não foi criado')
    yield put(actions.signUpFail(error))
  }
}

function* userDetailRequest({ id }) {
  try {
    const {data} = yield call(axios.get, `/api/users/${id}`)
    yield put(actions.getUserDetailsSuccess(data))
    toast.success('Detalhes das ordens do usuário foram encontrados com sucesso')
  } catch (error) {
    toast.error('Detalhes das ordens do usuário não foram encontrados')
    yield put(actions.getUserDetailsFail(error))
  }
}

function* updateUserProfileRequest({payload}) {
  try {
    const response = yield call(axios.put, `/api/users/profile`, payload)
    yield put(actions.updateUserProfileSuccess({ ...response.data }))
    toast.success('Dados do usuário foram atualizados')

  } catch (error) {
    toast.error('Dados do usuário não foram atualizados')
    yield put(actions.updateUserProfileFail(error))
  }
}

function persistRehydrate({ payload }) {
  const token = payload.user.token
  if (!token) return

  axios.defaults.headers.Authorization = `Bearer ${token}`
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.USER_CREATE_REQUEST, singUpRequest),
  takeLatest(types.USER_DETAILS_REQUEST, userDetailRequest),
  takeLatest(types.USER_UPDATE_PROFILE_REQUEST, updateUserProfileRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
])
