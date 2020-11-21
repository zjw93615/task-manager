


import state from './moduleProjectState.js'
import mutations from './moduleProjectMutations.js'
import actions from './moduleProjectActions.js'
import getters from './moduleProjectGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

