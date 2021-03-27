import * as types from './userTypes'

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  loading: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    //@LOGIN_USER
    case types.LOGIN_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.LOGIN_SUCCESS: {
      const newState = { ...state }
      const { _id, name, email, isAdmin, token } = action.payload

      newState.isLoggedIn = true
      newState.token = token
      newState.user = { _id, name, email, isAdmin }
      newState.loading = false

      return newState
    }
    case types.LOGIN_FAIL: {
      const newState = { ...initialState }
      return newState
    }

    //@CREATE USER
    case types.USER_CREATE_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.USER_CREATE_SUCCESS: {
      const newState = { ...state }
      const { _id, name, email, isAdmin, token } = action.payload

      newState.isLoggedIn = true
      newState.token = token
      newState.user = { _id, name, email, isAdmin }
      newState.loading = false
      
      return newState
    }
    case types.USER_CREATE_FAIL: {
      const newState = { ...initialState }
      return newState
    }

    //@LOGOUT_USER
    case types.LOGOUT: {
      const newState = { ...initialState }
      return newState
    }
    default:
      return state
  }
}

export const userDetailReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.USER_DETAILS_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.USER_DETAILS_SUCCESS: {
      const newState = { ...state }
      newState.loading = false
      return newState
    }
    case types.USER_DETAILS_FAIL: {
      const newState = { ...initialState }
      return newState
    }
    case types.USER_DETAILS_RESET:
      const newState = { ...initialState }
      return newState
   
    default:
      return state
  }
}

export const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.USER_UPDATE_PROFILE_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      newState.success = false
      return newState
    }
    case types.USER_UPDATE_PROFILE_SUCCESS: {
      const newState = { ...state }
      const { name, email, password } = action.payload
      newState.user = { ...state, name, email, password }
      newState.loading = false
      newState.success = true            
      return newState
    }
    case types.USER_UPDATE_PROFILE_FAIL: {
      const newState = { ...initialState }
      return newState
    }
   
    default:
      return state
  }
}