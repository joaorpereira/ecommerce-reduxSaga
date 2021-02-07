import * as types from './orderTypes'

    //@CREATE_ORDER
export function createOrderRequest(payload) {
  return {
    type: types.ORDER_CREATE_REQUEST,
    payload,
  }
}
export function createOrderSuccess(payload) {
  return {
    type: types.ORDER_CREATE_SUCCESS,
    payload,
  }
}
export function createOrderFail(payload) {
    return {
      type: types.ORDER_CREATE_FAIL,
      payload,
    }
  }

  //@GET_ORDER_DETAIL
export function getOrderDetailRequest(id) {
  return {
    type: types.ORDER_DETAILS_REQUEST,
    id,
  }
}
export function getOrderDetailSuccess(payload) {
  return {
    type: types.ORDER_DETAILS_SUCCESS,
    payload,
  }
}
export function getOrderDetailFail(payload) {
  return {
    type: types.ORDER_DETAILS_FAIL,
    payload,
  }
}

    //@PAY_ORDER
export function payOrderRequest(id, paymentResult) {
    return {
      type: types.ORDER_PAY_REQUEST,
      id, 
      paymentResult,
    }
  }
export function payOrderSuccess(payload) {
    return {
      type: types.ORDER_PAY_SUCCESS,
      payload,
    }
  }
export function payOrderFail(payload) {
    return {
      type: types.ORDER_PAY_FAIL,
      payload,
    }
  }

  //@deliver_ORDER
export function deliverOrderRequest(id, order) {
  return {
    type: types.ORDER_DELIVER_REQUEST,
    id, 
    order,
  }
}
export function deliverOrderSuccess(payload) {
  return {
    type: types.ORDER_DELIVER_SUCCESS,
    payload,
  }
}
export function deliverOrderFail(payload) {
  return {
    type: types.ORDER_DELIVER_FAIL,
    payload,
  }
}

    //@GET_MY_ORDERS
export function orderListProfileRequest(user) {
  return {
    type: types.ORDER_LIST_PROFILE_REQUEST,
    user
  }
}
export function orderListProfileSuccess(payload) {
  return {
    type: types.ORDER_LIST_PROFILE_SUCCESS,
    payload,
  }
}
export function orderListProfileFail(payload) {
  return {
    type: types.ORDER_LIST_PROFILE_FAIL,
    payload,
  }
}
export function orderListProfileReset() {
  return {
    type: types.ORDER_LIST_PROFILE_RESET
  }
}


