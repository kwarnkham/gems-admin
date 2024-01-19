
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
        path: 'contacts', component: () => import('pages/ContactListPage.vue'),
        name: 'contacts',
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
        path: 'update-item/:id',
        component: () => import('pages/UpdateItemPage.vue'),
        name: 'update-item',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'update-item-spec/:itemId',
        component: () => import('pages/UpdateItemSpecPage.vue'),
        name: 'update-item-spec',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'items',
        component: () => import('pages/ItemListPage.vue'),
        name: 'items',
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/client',
    component: () => import('layouts/ClientLayout.vue'),
    children: [
      {
        path: 'item-list', component: () => import('pages/ClientItemListPage.vue'),
        name: 'client-item-list',
      },
      {
        path: 'contact', component: () => import('pages/ContactPage.vue'),
        name: 'contact',
      },
      {
        path: 'item-details/:id', component: () => import('pages/ClientItemDetailsPage.vue'),
        name: 'client-item-details',
      }
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
