import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import axios from '../../../services/axios'

import * as actions from './orderActions'
import * as types from './orderTypes'

function* createOrderRequest({payload}) {
  try {
    const response = yield call(axios.post, `/api/orders`, payload)
    yield put(actions.createOrderSuccess({ ...response.data }))
    toast.success('Ordem efetuada com sucesso')
  } catch (error) {
    toast.error('Ordem não foi efetuada')
    yield put(actions.createOrderFail(error))
  }
}

function* getOrderDetailsRequest({id}) {
    try {
      const { data } = yield call(axios.get, `/api/orders/${id}`)
      console.log('SAGA',data)
      yield put(actions.getOrderDetailSuccess(data))
      toast.success('Detalhes da ordem requisitados com sucesso')
    } catch (error) {
      toast.error('Detalhes da ordem não foram encontrados')
      yield put(actions.getOrderDetailFail(error))
    }
}

function* OrderPayRequest({id, paymentResult}) {
  try {
    const response = yield call(axios.put, `/api/orders/${id}/pay`, paymentResult)
    yield put(actions.payOrderSuccess(response))
    toast.success('Pagamento feito com sucesso')
  } catch (error) {
    toast.error('Falha no pagamento')
    yield put(actions.payOrderFail(error))
  }
}

function* orderListProfileRequest() {
  try {
    const {data} = yield call(axios.get, `/api/orders/myorders`)  
    yield put(actions.orderListProfileSuccess(data))
    toast.success('Ordens requisitadas com sucesso')
  } catch (error) {
    toast.error('Falha ao requisitar as oders')
    yield put(actions.orderListProfileFail(error))
  }
}

export default all([
  takeLatest(types.ORDER_CREATE_REQUEST, createOrderRequest),
  takeLatest(types.ORDER_DETAILS_REQUEST, getOrderDetailsRequest),
  takeLatest(types.ORDER_PAY_REQUEST, OrderPayRequest),
  takeLatest(types.ORDER_LIST_PROFILE_REQUEST, orderListProfileRequest)
])