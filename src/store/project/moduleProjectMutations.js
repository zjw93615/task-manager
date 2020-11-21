/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  ADD_PROJECT (state, project) {
    state.projects.unshift(project)
  },
  SET_PROJECTS (state, projects) {
    state.projects = projects
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PROJECT (state, project) {
    const projectIndex = state.projects.findIndex((p) => p._id === project._id)
    Object.assign(state.projects[projectIndex], project)
  },
  REMOVE_PROJECT (state, projectId) {
    const ItemIndex = state.projects.findIndex((p) => p._id === projectId)
    state.projects.splice(ItemIndex, 1)
  }
}
