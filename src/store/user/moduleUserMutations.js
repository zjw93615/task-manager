export default {

  SET_USERS (state, users) {
    state.users = users
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_USER (state, user) {
    const userIndex = state.users.findIndex((p) => p._id === user._id)
    Object.assign(state.users[userIndex], user)
  },
  REMOVE_USER (state, userId) {
    const userIndex = state.users.findIndex((p) => p._id === userId)
    state.users.splice(userIndex, 1)
  }
}
