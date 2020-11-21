import axios from '../../axios/index.js'

export default {
  getTasks (payload) {
    return axios.get('/tasks', { params: {filter: payload.filter} })
  },
  addTask (task) {
    return axios.post('/tasks', task)
  },
  updateTask (task) {
    return axios.patch(`/tasks/${task._id}`, task)
  }
}
