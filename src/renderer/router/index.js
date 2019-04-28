import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

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
