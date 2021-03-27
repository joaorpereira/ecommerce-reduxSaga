import axios from 'axios'

export default axios.create({
  baseURL: process.env.PORT || 'http://localhost:5000/',
})
