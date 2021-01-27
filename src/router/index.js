import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/coupons'
  },
  {
    path: '/coupons',
    name: 'To Do',
    component: () => import( /* webpackChunkName: "coupon" */ '../pages/Coupon.vue'),
    meta: {
      layout: 'default'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router