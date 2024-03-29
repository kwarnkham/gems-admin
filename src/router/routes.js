
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
        path: 'add-pre-order', component: () => import('pages/AddPreOrderPage.vue'),
        name: 'add-pre-order',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'pre-order/:id', component: () => import('pages/PreOrderDetailsPage.vue'),
        name: 'pre-order-details',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'update-pre-order/:id', component: () => import('pages/UpdatePreOrderPage.vue'),
        name: 'update-pre-order',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'pre-order-list', component: () => import('pages/PreOrderListPage.vue'),
        name: 'pre-order-list',
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
        path: 'settings', component: () => import('pages/SettingPage.vue'),
        name: 'settings',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'contact/:id', component: () => import('pages/ContactDetailsPage.vue'),
        name: 'contact-details',
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
        path: 'tool', component: () => import('pages/ToolPage.vue'),
        name: 'tool',
      },
      {
        path: 'contact', component: () => import('pages/ContactPage.vue'),
        name: 'contact',
      },
      {
        path: 'client-home', component: () => import('pages/ClientHomePage.vue'),
        name: 'client-home',
      },
      {
        path: '4cs', component: () => import('pages/4CsPage.vue'),
        name: '4cs',
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
