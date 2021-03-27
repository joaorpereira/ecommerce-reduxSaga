import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/index.js'
import Template from './template/Template'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <ThemeProvider theme={theme}>
            <Template />
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
