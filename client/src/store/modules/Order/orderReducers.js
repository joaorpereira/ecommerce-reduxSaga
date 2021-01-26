import * as types from './orderTypes'

const initialState = {
  order: {
    createdAt: null,
    isDelivered: null,
    isPaid: null,
    orderItems: [],
    paymentMethod: '',
    shippingAddress: {},
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    updatedAt: null, 
    _id: null,    
    user: null,
  },
  loading: false,
  success: false,
  orders: [],
}

export const orderCreateReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.ORDER_CREATE_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }

    case types.ORDER_CREATE_SUCCESS: {
        const {
          createdAt,
          isDelivered,
          isPaid,
          orderItems, 
          shippingAddress, 
          paymentMethod, 
          shippingPrice, 
          taxPrice, 
          totalPrice,
          updatedAt,
          _id,
          user,
        } = action.payload

        const newState = { ...state }
        newState.order.createdAt = createdAt        
        newState.order.isDelivered = isDelivered
        newState.order.isPaid = isPaid
        newState.order.orderItems = orderItems
        newState.order.paymentMethod = paymentMethod
        newState.order.shippingAddress = shippingAddress
        newState.order.shippingPrice = shippingPrice
        newState.order.taxPrice = taxPrice
        newState.order.totalPrice = totalPrice
        newState.order.updatedAt =  updatedAt
        newState.order._id = _id
        newState.order.user = user
        newState.loading = false
        newState.success = true

        return newState
    }

    case types.ORDER_CREATE_FAIL: {
        const newState = initialState
        newState.loading = false
        return newState
    }

    default:
      return state
  }
}

export const orderGetDetailsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.ORDER_DETAILS_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }

    case types.ORDER_DETAILS_SUCCESS: {
        const {
          createdAt,
          isDelivered,
          isPaid,
          orderItems, 
          shippingAddress, 
          paymentMethod, 
          shippingPrice, 
          taxPrice, 
          totalPrice,
          updatedAt,
          _id,
          user,
        } = action.payload

        const newState = { ...state }
        newState.order.createdAt = createdAt        
        newState.order.isDelivered = isDelivered
        newState.order.isPaid = isPaid
        newState.order.orderItems = orderItems
        newState.order.paymentMethod = paymentMethod
        newState.order.shippingAddress = shippingAddress
        newState.order.shippingPrice = shippingPrice
        newState.order.taxPrice = taxPrice
        newState.order.totalPrice = totalPrice
        newState.order.updatedAt = updatedAt
        newState.order._id = _id
        newState.order.user = user
        newState.loading = false
        newState.success = true
        return newState
    }

    case types.ORDER_DETAILS_FAIL: {
        const newState = initialState
        newState.loading = false
        return newState
    }

    default:
      return state
  }
}

export const orderPayReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.ORDER_PAY_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }

    case types.ORDER_PAY_SUCCESS: {
      const newState = { ...state }
      newState.loading = false
      newState.success = true
      return newState
    }

    case types.ORDER_PAY_FAIL: {
      const newState = initialState
      newState.loading = false
      newState.success = false
      return newState
    }

    default:
      return state
  }
}

export const getMyOrdersReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.ORDER_LIST_PROFILE_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }

    case types.ORDER_LIST_PROFILE_SUCCESS: {
      const newState = { ...state }
      newState.orders = action.payload
      newState.loading = false
      return newState
    }

    case types.ORDER_LIST_PROFILE_FAIL: {
      const newState = initialState
      newState.loading = false
      return newState
    }

    case types.ORDER_LIST_PROFILE_RESET: {
      const newState = initialState
      return newState
    }

    default:
      return state
  }
}