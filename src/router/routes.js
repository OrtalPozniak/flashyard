const routes = [
  {
    path: '/',
    component: () => import('pages/Login')
  },
  {
    path: '/', component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/feed', component: () => import('pages/Feed')},
      {path: 'order', component: () => import('pages/order')},
      {path: 'yardPage:id', component: () => import('pages/YardPage')},
      {path: 'addYard:id', component: () => import('pages/AddYard')},
      {path: 'addYard', component: () => import('pages/AddYard')},
      {path: 'sumOrder', component: () => import('pages/sumOrder')},
      {path: 'payment', component: () => import('pages/payment')},
      { path: 'MyProfile', component: () => import('pages/MyProfile')},
      {path: 'addChef', component: () => import('pages/addChef')},
      {path: '/about' , component: () => import('pages/About')}
    ]
  },
  // {
  //   path: '/calendar',
  //   component: () => import('components/MyProfile/Calendar')
  // },
  {
    path: '/test',
    component: () => import('pages/Test.vue')
  },
  {
    path: '/reset',
    component: () => import('pages/ResetPassword')
  },
  // {
  //   path: '/test',
  //   component: () => import('pages/test')
  // },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }

]

export default routes
