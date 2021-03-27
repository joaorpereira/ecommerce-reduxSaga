import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import axios from '../../../services/axios'

import * as actions from './productActions'
import * as types from './productTypes'

function* productsRequest() {
  try {
    const { data } = yield call(axios.get, '/api/products')
    yield put(actions.productsSuccess(data))
  } catch (error) {
    toast.error('Os produtos não foram encontrados')
    yield put(actions.productsFail(error))
  }
}

function* productRequest({ id }) {
  try {
    const { data } = yield call(axios.get, `/api/products/${id}`)
    yield put(actions.productSuccess(data))
  } catch (error) {
    toast.error('Os produtos não foram encontrados')
    yield put(actions.productsFail(error))
  }
}

function* productDeleteAdminRequest({ id }) {
  try {
    yield call(axios.delete, `/api/products/${id}`)
    yield put(actions.deleteProductSuccess())
    toast.success('O produto foi deletado com sucesso')
  } catch (error) {
    toast.error('O produto não foi deletado')
    yield put(actions.deleteProductFail(error))
  }
}

function* createProductAdminRequest() {
  try {
    const { data } = yield call(axios.post, '/api/products', {})
    yield put(actions.createProductSuccess(data))
    toast.success('O produto foi criado com sucesso')
  } catch (error) {
    toast.error('O produto não foi criado')
    yield put(actions.createProductFail(error))
  }
}

function* updateProductAdminRequest({ payload }) {
  try {
    const product = payload
    const { data } = yield call(
      axios.put,
      `/api/products/${payload._id}`,
      product
    )
    yield put(actions.updateProductSuccess(data))
    toast.success('Produto atualizado com sucesso')
  } catch (error) {
    toast.error('Produto não atualizado')
    yield put(actions.updateProductFail(error))
  }
}

function* reviewProductRequest({ payload }) {
  try {
    yield call(
      axios.post,
      `/api/products/${payload.id}/reviews`,
      payload.review
    )
    yield put(actions.reviewProductSuccess(payload))
    toast.success('Comentário adicionado com sucesso')
  } catch (error) {
    toast.error('Comentário não foi adicionado')
    yield put(actions.reviewProductFail(error))
  }
}

export default all([
  takeLatest(types.PRODUCT_LIST_REQUEST, productsRequest),
  takeLatest(types.PRODUCT_ITEM_REQUEST, productRequest),
  takeLatest(types.PRODUCT_DELETE_REQUEST, productDeleteAdminRequest),
  takeLatest(types.PRODUCT_CREATE_REQUEST, createProductAdminRequest),
  takeLatest(types.PRODUCT_UPDATE_REQUEST, updateProductAdminRequest),
  takeLatest(types.PRODUCT_REVIEW_REQUEST, reviewProductRequest),
])
