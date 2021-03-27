import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import axios from '../../../services/axios'

import * as actions from './orderAdminActions'
import * as types from './orderAdminTypes'

function* orderListAdminRequest() {
  try {
    const { data } = yield call(axios.get, '/api/orders')
    yield put(actions.orderListAdminSuccess(data))
    toast.success('Lista de ordens obtidas com sucesso')
  } catch (error) {
    toast.error('Lista de ordens não foi encontrada')
    yield put(actions.orderListAdminFail(error))
  }
}

export default all([
  takeLatest(types.ORDER_GET_ALL_ORDERS_REQUEST, orderListAdminRequest),
])
