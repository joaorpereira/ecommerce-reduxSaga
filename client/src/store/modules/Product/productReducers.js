import * as types from './productTypes'

const initialState = {
  products: [],
  loading: false,
  success: false,
  product: { reviews: [] },
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_LIST_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.PRODUCT_LIST_SUCCESS: {
      const newState = { ...state }
      newState.loading = false
      newState.products = action.payload
      return newState
    }
    case types.PRODUCT_LIST_FAIL: {
      const newState = { ...initialState }
      newState.loading = false
      return newState
    }
    default:
      return state
  }
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_ITEM_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.PRODUCT_ITEM_SUCCESS: {
      const newState = { ...state }
      newState.loading = false
      newState.product = action.payload
      return newState
    }
    case types.PRODUCT_ITEM_FAIL: {
      const newState = { ...initialState }
      newState.loading = false
      return newState
    }
    default:
      return state
  }
}

export const deleteProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_DELETE_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.PRODUCT_DELETE_SUCCESS: {
      const newState = { ...state }
      newState.loading = false
      newState.success = true
      return newState
    }
    case types.PRODUCT_DELETE_FAIL: {
      const newState = { ...state }
      newState.loading = false
      newState.success = false
      return newState
    }
    default:
      return state
  }
}

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case types.PRODUCT_CREATE_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.PRODUCT_CREATE_SUCCESS: {
      const newState = { ...state }
      newState.loading = false
      newState.success = true
      newState.product = action.payload
      return newState
    }
    case types.PRODUCT_CREATE_FAIL: {
      const newState = { ...state }
      newState.loading = false
      newState.success = false
      return newState
    }
    case types.PRODUCT_CREATE_RESET: {
      return {}
    }
    default:
      return state
  }
}

export const updateProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_UPDATE_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.PRODUCT_UPDATE_SUCCESS: {
      const newState = { ...state }
      const {
        name,
        email,
        password,
        brand,
        category,
        countInStock,
        description,
        image,
        price,
      } = action.payload

      newState.product = {
        ...state,
        name,
        email,
        password,
        brand,
        category,
        countInStock,
        description,
        image,
        price,
      }
      newState.loading = false
      newState.success = true
      return newState
    }
    case types.PRODUCT_UPDATE_FAIL: {
      const newState = { ...initialState }
      newState.loading = false
      newState.success = false
      return newState
    }
    case types.PRODUCT_UPDATE_RESET: {
      const newState = { ...initialState }
      newState.product = {}
      return newState
    }
    default:
      return state
  }
}

export const reviewProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_REVIEW_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.PRODUCT_REVIEW_SUCCESS: {
      const newState = { ...state }
      const { review } = action.payload
      newState.product.reviews = [...newState.product.reviews, { review }]
      newState.loading = false
      newState.success = true
      return newState
    }
    case types.PRODUCT_REVIEW_FAIL: {
      const newState = { ...initialState }
      newState.loading = false
      newState.success = false
      return newState
    }
    case types.PRODUCT_REVIEW_RESET: {
      const newState = { ...initialState }
      newState.product = { reviews: [] }
      return newState
    }
    default:
      return state
  }
}
