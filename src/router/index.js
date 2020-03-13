import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [

  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/pages/Home'),
  },
  {
    path: '/adIframe',
    name: 'adIframe',
    component: () => import('@/pages/adIframe'),
  },
  {
    path: '/adWall',
    name: 'adWall',
    component: () => import('@/pages/AdWall'),
  },
  {
    path: '/customer/:customerName/:type',
    name: 'news',
    component: () => import('@/pages/TaoNews')
  },

  {
    path: '/content/:customerName/:snowFlakeid',
    name: 'content',
    component: () => import('@/pages/Content'),
  },
  {
    path: '/customer/:customerName',
    name: 'customer',
    component: () => import('@/pages/customer')
  },
  {
    path: '/yueliang',
    name: 'yueliang',
    component: () => import('@/pages/yueliang')
  },

  {
    path: '/yueliang/:type',
    name: 'yueliang',
    component: () => import('@/pages/yueliang')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/components/ad/tengcentAd.vue')
  },

  {
    path: '*',
    redirect: '/customer/100'
  }
];

const router = new Router({
  routes,
  mode: 'history'
});
export default router
