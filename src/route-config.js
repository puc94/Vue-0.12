export function configRouter (router) {

  // normal routes
  router.map({
    '/schools': {
      component: require('./pages/school-list/index.vue')
    },

    // nested example
    '/schools/:id': {
      component: require('./pages/group-list/index.vue'),
    },

    // not found handler
    '*': {
      component: require('./components/not-found.vue')
    },
  })

  // redirect
  router.redirect({
    '/': '/schools'
  })
}
