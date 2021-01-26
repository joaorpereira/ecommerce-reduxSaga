import * as types from './orderAdminTypes'

const initialState = {
  orders: [],
  loading: false,
}

export const ordersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_GET_ALL_ORDERS_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.ORDER_GET_ALL_ORDERS_SUCCESS: {
      const newState = { ...state }
      newState.orders = action.payload
      newState.loading = false
      return newState
    }
    case types.ORDER_GET_ALL_ORDERS_FAIL: {
      const newState = { ...state }
      newState.loading = false
      return newState
    }
    default:
      return state
  }
}