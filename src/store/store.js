/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import moduleAuth from './auth/moduleAuth'
import moduleTodo from './todo/moduleTodo'
import moduleProject from './project/moduleProject'
import moduleUser from './user/moduleUser'

Vue.use(Vuex)


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    todo: moduleTodo,
    project: moduleProject,
    user: moduleUser
  },
  strict: process.env.NODE_ENV !== 'production'
})
