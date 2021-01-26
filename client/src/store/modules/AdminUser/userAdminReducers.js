import * as types from './userAdminTypes'

const initialState = {
  users: [],
  loading: false,
  success: false,
}

export const usersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LIST_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.USER_LIST_SUCCESS: {
      const newState = { ...state }
      newState.users = action.payload
      newState.loading = false
      return newState
    }
    case types.USER_LIST_FAIL: {
      const newState = { ...state }
      newState.loading = false
      return newState
    }
    case types.USER_LIST_RESET:
      const newState = { ...initialState }
      return newState
    default:
      return state
  }
}

export const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_DELETE_REQUEST: {
      const newState = { ...state }
      newState.loading = true
      return newState
    }
    case types.USER_DELETE_SUCCESS: {
      const newState = { ...state }
      newState.loading = false
      newState.success = true
      return newState
    }
    case types.USER_DELETE_FAIL: {
      const newState = { ...state }
      newState.loading = false
      newState.success = false
      return newState
    }
    default:
      return state
  }
}