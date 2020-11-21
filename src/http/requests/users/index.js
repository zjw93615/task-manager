import axios from '../../axios/index.js'

export default {
  getUsers () {
    return axios.get('/users')
  },
  updateUser (user) {
    return axios.patch(`/users/${user._id}`, user)
  }
}
