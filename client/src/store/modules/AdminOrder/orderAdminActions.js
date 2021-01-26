import * as types from './orderAdminTypes'

//@ORDER LIST - ADMIN
export function orderListAdminRequest() {
    return {
        type: types.ORDER_GET_ALL_ORDERS_REQUEST,
    }
}

export function orderListAdminSuccess(payload) {
    return {
        type: types.ORDER_GET_ALL_ORDERS_SUCCESS,
        payload,
    }
}

export function orderListAdminFail(payload) {
    return {
        type: types.ORDER_GET_ALL_ORDERS_FAIL,
        payload,
    }
}