import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index-page',
      component: require('@/components/Index').default
    },
    {
      path: '/charge',
      name: 'charge-page',
      component: require('@/components/Charge').default
    },
    {
      path: '/AddCard',
      name: 'index-page',
      component: require('@/components/AddCard').default
    },
    {
      path: '/Buy',
      name: 'index-page',
      component: require('@/components/Buy').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
