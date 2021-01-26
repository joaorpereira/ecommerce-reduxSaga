import { persistStore } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import persistedReducers from './modules/reduxPersist'
import rootReducers from './modules/rootReducers'
import rootSagas from './modules/rootSagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  persistedReducers(rootReducers),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSagas)

export const persistor = persistStore(store)
export default store
