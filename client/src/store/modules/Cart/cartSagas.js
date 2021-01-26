import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import axios from '../../../services/axios'

import * as actions from './cartActions'
import * as types from './cartTypes'

function* addToCartRequest({ payload }) {
  try {
    const { id, quantity } = payload
    const { data } = yield call(axios.get, `/api/products/${id}`)
    yield put(
      actions.addToCartSuccess({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      })
    )
    toast.success('Os produtos foram adicionados ao seu carrinho')
  } catch (error) {
    toast.error('Os produtos não foram encontrados')
    yield put(actions.addToCartFail(error))
  }
}

export default all([
  takeLatest(types.CART_ADD_ITEM_REQUEST, addToCartRequest,
)])