import React from 'react'
import { ToastContainer } from 'react-toastify'
import Routes from '../routes/routes'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from '../components/Header/Header'
import 'react-toastify/dist/ReactToastify.css'
import '../theme/styles.css'

const Template = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <main style={{ minHeight: '80%' }}>
        <Routes />
      </main>
      <ToastContainer
        progressClassName='toastProgress'
        bodyClassName='toastBody'
        autoClose={3000}
        className='toast-container'
      />
    </>
  )
}

export default Template
