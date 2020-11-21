import axios from '../../axios/index.js'

export default {
  getAllTimerTasks () {
    return axios.get('/timer-tasks')
  },
  getTimerTasks (limit, skip) {
    return axios.get(`/timer-tasks?limit=${limit}&skip=${skip}`)
  },
  addTimerTask (timerTask) {
    return axios.post('/timer-tasks', timerTask)
  },
  updateTimerTask (timerTask) {
    return axios.patch(`/projects/${timerTask._id}`, timerTask)
  },
  deleteTimerTask (itemId) {
    return axios.delete(`/projects/${itemId}`)
  }
}
