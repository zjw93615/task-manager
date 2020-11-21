// axios
import axios from 'axios'
import auth from './auth/authService'

const baseURL = 'https://task-manager-nodejs-dv.herokuapp.com'



const instance = axios.create({
  baseURL,
  // You can add your headers here
  headers: {'Access-Control-Allow-Origin': 'localhost'}
})

if (auth.isAuthenticated()) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${auth.getAccessToken()}`
}

export default instance
