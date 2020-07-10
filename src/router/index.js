import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [


  {
    path: '/adIframe',
    name: 'adIframe',
    component: (reolve) => require(['../pages/adIframe'],reolve)
  },
 

  {
    path: '/content/:customerName/:snowFlakeid',
    name: 'content',
    component: (reolve) => require(['../pages/Content'],reolve)
  },
  {
    path: '/customer/:customerName',
    name: 'customer',
    // redirect:"/customer/:customerName/1",
    component: (reolve) => require(['../pages/customer'],reolve),
    children:[
      {
        path: '/customer/:customerName/:type',
        name: 'news',
        component: (reolve) => require(['../pages/TaoNews'],reolve)
      },
    ]
  },
  {
    path: '/adTestWall',
    name: 'adTestWall',

    component: (reolve) => require(['../pages/adTestWall'],reolve)
  },
  // {
  //   path: '*',
  //   redirect: '/customer/100/1'
  // }
];

const router = new Router({
  routes,
  mode: 'history'
});


export default router;
