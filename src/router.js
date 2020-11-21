/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth/authService'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      meta: {
        authRequired: true
      },
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          meta: {
            authRequired: true
          },
          component: () => import('./views/Home.vue')
        },
        {
          path: '/page2',
          name: 'page-2',
          meta: {
            authRequired: true
          },
          component: () => import('./views/Page2.vue')
        },
        {
          path: '/todo',
          name: 'todo',
          redirect: '/todo/all',
          meta: {
            authRequired: true
          },
          component: () => import('./views/todo/Todo.vue')
        },
        {
          path: '/todo/:filter',
          component: () => import('./views/todo/Todo.vue'),
          meta: {
            parent: 'todo',
            authRequired: true,
            no_scroll: true
          }
        },
        {
          path: '/projects',
          name: 'projects',
          component: () => import('./views/projects/ProjectListView.vue'),
          meta: {
            breadcrumb: [
              {title: 'Home', url: '/'},
              {title: 'Projects', active: true}
            ],
            authRequired: true
          }
        },
        {
          path: '/timer-tasks',
          name: 'timer-tasks',
          component: () => import('./views/timer-tasks/TimerTaskListView'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Timer Tasks', active: true }
            ],
            authRequired: true
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'login',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/register',
          name: 'register',
          component: () => import('@/views/pages/Register.vue')
        },
        {
          path: '/pages/forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/pages/ForgotPassword')
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue')
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  // ...
  const isAuthenticated = auth.isAuthenticated()
  if (to.meta.authRequired && !isAuthenticated) {
    router.push({ path: '/pages/login', query: { to: to.path } })
  } else {
    next()
  }
})

export default router
