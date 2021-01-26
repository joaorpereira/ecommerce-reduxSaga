import * as types from './productTypes'

// @FETCH List of Products
export function productsRequest() {
  return {
    type: types.PRODUCT_LIST_REQUEST,
  }
}

export function productsSuccess(payload) {
  return {
    type: types.PRODUCT_LIST_SUCCESS,
    payload,
  }
}

export function productsFail() {
  return {
    type: types.PRODUCT_LIST_FAIL,
  }
}

// @FETCH Single Product
export function productRequest(id) {
  return {
    type: types.PRODUCT_ITEM_REQUEST,
    id,
  }
}

export function productSuccess(payload) {
  return {
    type: types.PRODUCT_ITEM_SUCCESS,
    payload,
  }
}

export function productFail(payload) {
  return {
    type: types.PRODUCT_ITEM_FAIL,
    payload
  }
}

// @DELETE  Product

export function deleteProductRequest(id) {
    return {
        type: types.PRODUCT_DELETE_REQUEST,
        id
    }
}

export function deleteProductSuccess() {
    console.log('success')
    return {
        type: types.PRODUCT_DELETE_SUCCESS,
    }
}
  
export function deleteProductFail(payload) {
    return {
        type: types.PRODUCT_DELETE_FAIL,
        payload,
    }
}
  
  // @CREATE  Product
export function createProductRequest() {
    return {
        type: types.PRODUCT_CREATE_REQUEST,
    }
}
  
export function createProductSuccess(payload) {
    console.log('success_product', payload)
    return {
        type: types.PRODUCT_CREATE_SUCCESS,
        payload,
    }
}
  
export function createProductFail(payload) {
    return {
        type: types.PRODUCT_CREATE_FAIL,
        payload,
    }
}
  
export function createProductReset(payload) {
    return {
        type: types.PRODUCT_CREATE_RESET,
        payload,
    }
}
  
  // @UPDATE  Product
export function updateProductRequest(payload) {
    console.log('request',payload)
    return {
        type: types.PRODUCT_UPDATE_REQUEST,
        payload,
    }
}
  
export function updateProductSuccess(payload) {
    console.log('success',payload)
    return {
        type: types.PRODUCT_UPDATE_SUCCESS,
        payload,
    }
}

export function updateProductFail(payload) {
    return {
        type: types.PRODUCT_UPDATE_FAIL,
        payload,
    }
}
  