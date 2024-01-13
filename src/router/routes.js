
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/IndexPage.vue'),
        name: 'home',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        name: 'login',
        meta: {
          guest: true
        }
      },
      {
        path: 'add-item',
        component: () => import('pages/AddItemPage.vue'),
        name: 'add-item',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'add-item-spec/:itemId',
        component: () => import('pages/AddItemSpecPage.vue'),
        name: 'add-item-spec',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'add-item-picture/:itemId',
        component: () => import('pages/AddItemPicturePage.vue'),
        name: 'add-item-picture',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'item-details/:id',
        component: () => import('pages/ItemDetailsPage.vue'),
        name: 'item-details',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'item-list',
        component: () => import('pages/ItemListPage.vue'),
        name: 'item-list',
        meta: {
          requiresAuth: true
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
