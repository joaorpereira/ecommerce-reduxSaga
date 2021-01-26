import * as types from './userTypes'

// @LOGIN
export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  }
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  }
}

export function loginFail(payload) {
  return {
    type: types.LOGIN_FAIL,
    payload,
  }
}

// @LOGOUT
export function logout() {
  return {
    type: types.LOGOUT,
  }
}

// @SIGNUP
export function signUpRequest(payload) {
  return {
    type: types.USER_CREATE_REQUEST,
    payload,
  }
}

export function signUpSuccess(payload) {
  return {
    type: types.USER_CREATE_SUCCESS,
    payload,
  }
}

export function signUpFail(payload) {
  return {
    type: types.USER_CREATE_FAIL,
    payload,
  }
}

//@USER DETAIL
export function getUserDetailsRequest(id) {
  return {
    type: types.USER_DETAILS_REQUEST,
    id,
  }
}

export function getUserDetailsSuccess(payload) {
  return {
    type: types.USER_DETAILS_SUCCESS,
    payload,
  }
}

export function getUserDetailsFail(payload) {
  return {
    type: types.USER_DETAILS_FAIL,
    payload,
  }
}

export function getUserDetailsReset(payload) {
  return {
    type: types.USER_DETAILS_RESET,
    payload,
  }
}

//@USER UPDATE

export function updateUserProfileRequest(payload) {
  return {
    type: types.USER_UPDATE_PROFILE_REQUEST,
    payload,
  }
}

export function updateUserProfileSuccess(payload) {
  return {
    type: types.USER_UPDATE_PROFILE_SUCCESS,
    payload,
  }
}

export function updateUserProfileFail(payload) {
  return {
    type: types.USER_UPDATE_PROFILE_FAIL,
    payload,
  }
}

