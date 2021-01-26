import React from 'react'
import Header from './components/Header/Header'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import Routes from './routes/routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/index.js'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <main style={{ minHeight: '80%' }}>
              <Routes />
            </main>
            <ToastContainer autoClose={3000} className='toast-container' />
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
