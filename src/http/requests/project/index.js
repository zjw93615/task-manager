import axios from '../../axios/index.js'

export default {
  getProjects () {
    return axios.get('/projects')
  },
  getMyProjects () {
    return axios.get('/myProjects')
  },
  addProject (project) {
    return axios.post('/projects', project)
  },
  updateProject (project) {
    return axios.patch(`/projects/${project._id}`, project)
  },
  deleteProject (itemId) {
    return axios.delete(`/projects/${itemId}`)
  }
}
