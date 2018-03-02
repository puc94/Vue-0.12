export function configRouter (router) {

  // normal routes
  router.map({
    '/school': {
      component: require('./pages/school-list/index.vue')
    },

    // nested example
    '/school/:id': {
      component: require('./pages/school/index.vue'),
    },

    // not found handler
    '*': {
      component: require('./components/not-found.vue')
    },
  })

  // redirect
  router.redirect({
    '/': '/school'
  })
}
