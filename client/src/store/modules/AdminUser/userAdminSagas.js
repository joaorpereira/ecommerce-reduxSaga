import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import axios from '../../../services/axios'

import * as actions from './userAdminActions'
import * as types from './userAdminTypes'

function* userListAdminRequest() {
  try {
    const { data } = yield call(axios.get, '/api/users')
    yield put(actions.userListAdminSuccess(data))
    toast.success('Lista de usuários obtida com sucesso')
  } catch (error) {
    toast.error('Lista de usuários não foi encontrada')
    yield put(actions.userListAdminFail(error))
  }
}

function* userDeleteAdminRequest({id}) {
  try {
    yield call(axios.delete, `/api/users/${id}`)
    yield put(actions.userListAdminSuccess())
    toast.success('Usuário removido com sucesso')
  } catch (error) {
    toast.error('Usuário não foi removido')
    yield put(actions.userListAdminFail(error))
  }
}

export default all([
  takeLatest(types.USER_LIST_REQUEST, userListAdminRequest),
  takeLatest(types.USER_DELETE_REQUEST, userDeleteAdminRequest),
])
