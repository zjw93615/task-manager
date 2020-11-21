/*=========================================================================================
  File Name: moduleTodoActions.js
  Description: Todo Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '../../http/axios/index'
import Task from '../../http/requests/todo/index'

export default {
  setTodoSearchQuery ({ commit }, query) {
    commit('SET_TODO_SEARCH_QUERY', query)
  },
  fetchTasks ({ commit }, payload) {
    console.log(axios.defaults.headers.common['Authorization'])
    return new Promise((resolve, reject) => {
      Task.getTasks(payload)
        .then((response) => {
          response.data.forEach((task) => {
            task['project'] = {
              label: task['project']['title'],
              value: task['project']['_id']
            }
          })
          commit('SET_TASKS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  addTask ({ commit }, task) {
    return new Promise((resolve, reject) => {
      const project = task['project']
      task['project'] = task['project']['value']
      console.log(task)
      Task.addTask(task)
        .then((response) => {
          task = response.data
          task['project'] = project
          commit('ADD_TASK', task)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  updateTask ({ commit }, task) {
    const project = task['project']
    task['project'] = task['project']['value']
    console.log(task)

    return new Promise((resolve, reject) => {
      Task.updateTask(task)
        .then((response) => {
          task['project'] = project
          commit('UPDATE_TASK', task)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
