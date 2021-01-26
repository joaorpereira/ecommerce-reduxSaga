import * as types from './cartTypes'

export function addToCartRequest(payload) {
  return {
    type: types.CART_ADD_ITEM_REQUEST,
    payload,
  }
}

export function addToCartSuccess(payload) {
  return {
    type: types.CART_ADD_ITEM_SUCCESS,
    payload,
  }
}

export function addToCartFail(payload) {
  return {
    type: types.CART_ADD_ITEM_FAIL,
    payload,
  }
}

export function cartReset() {
  return {
    type: types.CART_RESET,
  }
}

export function removeFromCart(payload) {
  return {
    type: types.CART_REMOVE_ITEM,
    payload,
  }
}

export function saveShippingAddress(payload) {
  return {
    type: types.CART_SAVE_SHIPPING_ADDRESS,
    payload,
  }
}

export function savePayment(payload) {
  return {
    type: types.CART_SAVE_PAYMENT_METHOD,
    payload,
  }
}
