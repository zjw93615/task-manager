/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Project from '../../http/requests/project/index'

export default {
  addProject ({ commit }, project) {
    const saved_members = project.members;
    let temp_members = []
    project.members.forEach(member => {
      temp_members.push(member['value'])
    })
    project.members = temp_members
    return new Promise((resolve, reject) => {
      Project.addProject(project)
        .then((response) => {
          project.members = saved_members;
          project['_id'] = response.data._id
          commit('ADD_PROJECT', project)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchAllProjects ({ commit }) {
    return new Promise((resolve, reject) => {
      Project.getProjects()
        .then((response) => {
          response.data.forEach(project => {
            if(Array.isArray(project.members)) {
              let members = project.members
              let temp_members = []
              members.forEach(member => {
                temp_members.push({label: member.displayName, value: member._id})
              })
              project.members = temp_members
            }
          })

          console.log(response.data)

          commit('SET_PROJECTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchProjects ({ commit }) {
    return new Promise((resolve, reject) => {
      Project.getMyProjects()
        .then((response) => {
          commit('SET_PROJECTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateProject ({ commit }, project) {
    const saved_members = project.members;
    let temp_members = []
    project.members.forEach(member => {
      temp_members.push(member['value'])
    })
    project.members = temp_members
    return new Promise((resolve, reject) => {
      Project.updateProject(project)
        .then((response) => {
          project.members = saved_members;
          commit('UPDATE_PROJECT', project)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeProject ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      Project.deleteProject(itemId)
        .then((response) => {
          commit('REMOVE_PROJECT', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
