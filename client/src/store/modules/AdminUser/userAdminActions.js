import * as types from './userAdminTypes'

//@USER LIST - ADMIN
export function userListAdminRequest() {
    return {
        type: types.USER_LIST_REQUEST,
    }
}

export function userListAdminSuccess(payload) {
    return {
        type: types.USER_LIST_SUCCESS,
        payload,
    }
}

export function userListAdminFail(payload) {
    return {
        type: types.USER_LIST_FAIL,
        payload,
    }
}

//@USER DELETE - ADMIN
export function userDeleteAdminRequest(id) {
    return {
        type: types.USER_DELETE_REQUEST,
        id
    }
}

export function userDeleteAdminSuccess() {
    return {
        type: types.USER_DELETE_SUCCESS,
    }
}

export function userDeleteAdminFail(payload) {
    return {
        type: types.USER_DELETE_FAIL,
        payload,
    }
}