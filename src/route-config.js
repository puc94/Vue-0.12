export function configRouter (router) {

  // normal routes
  router.map({
    '/schools': {
      component: require('./pages/school-list/index.vue'),
      subRoutes: {
        '/': {
          component: require('./pages/school-list/list.vue')
        },
        'create': {
          component: require('./pages/school-list/create.vue')
        },
        ':id/edit': {
          component: require('./pages/school-list/edit.vue')
        },
        ':school_id/groups': {
          component: require('./pages/group-list/index.vue'),
          subRoutes: {
            '/': {
              component: require('./pages/group-list/list.vue')
            },
            'create': {
              component: require('./pages/group-list/create.vue')
            },
            ':id/edit': {
              component: require('./pages/group-list/edit.vue')
            }
          }
        },
      }
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
