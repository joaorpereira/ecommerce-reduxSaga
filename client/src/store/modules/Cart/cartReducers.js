import * as types from './cartTypes'

const initialState = {
  cart: [],
  shippingAddress: {},
  paymentMethod: '',
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    //@ADD_ITEM
    case types.CART_ADD_ITEM_SUCCESS: {
      const newState = { ...state }
      const item = action.payload
      const existItem = newState.cart.find((x) => x.product === item.product)

      if (existItem) {
        newState.cart = newState.cart.map((x) =>
          x.product === existItem.product ? item : x
        )
      } else {
        newState.cart.push(item)
      }
      return newState
    }
    
    case types.CART_RESET: {
      const newState = {...state}
      newState.cart = initialState.cart
      return newState
    }

    //@REMOVE_ITEM
    case types.CART_REMOVE_ITEM: {
      const newState = { ...state }
      newState.cart = newState.cart.filter((x) => x.product !== action.payload)
      return newState
    }

    //@SHIPPING
    case types.CART_SAVE_SHIPPING_ADDRESS: {
      const newState = { ...state }
      newState.shippingAddress = action.payload
      return newState
    }

    //@PAYMENT
    case types.CART_SAVE_PAYMENT_METHOD: {
      const newState = { ...state }
      newState.paymentMethod = action.payload
      return newState
    }
    default:
      return state
  }
}
