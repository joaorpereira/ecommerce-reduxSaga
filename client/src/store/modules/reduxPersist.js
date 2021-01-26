import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

// eslint-disable-next-line
export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'eccomerce',
      storage,
      whitelist: ['user','cart',],
    },
    reducers
  )
  return persistedReducers
}
