/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/timer-tasks",
    name: "Timer Tasks",
    slug: "timer-tasks",
    icon: "ClockIcon",
    i18n: "Timer Tasks"
  },
  {
    url: '/todo/all',
    name: 'Todo',
    slug: 'todo',
    icon: 'CheckSquareIcon',
    i18n: 'Todo'
  },
  {
    url: '/projects',
    name: 'Projects',
    slug: 'projects',
    icon: 'ListIcon',
    i18n: 'Projects'
  }
]
