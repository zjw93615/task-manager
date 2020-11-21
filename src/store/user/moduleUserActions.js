import User from '../../http/requests/users/index'

export default {
  fetchUsers ({ commit }) {
    return new Promise((resolve, reject) => {
      User.getUsers()
        .then((response) => {
          commit('SET_USERS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
