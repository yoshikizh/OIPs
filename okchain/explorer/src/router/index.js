import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/txs',
    name: 'Transactions',
    component: () => import('../views/Transactions.vue')
  },
  {
    path: '/validators',
    name: 'Validators',
    component: () => import('../views/Validators.vue')
  },
  {
    path: '/tokens',
    name: 'Tokens',
    component: () => import('../views/Tokens.vue')
  },
  {
    path: '/block/:height',
    name: 'Block',
    component: () => import('../views/Block.vue')
  },
  {
    path: '/tradePairs',
    name: 'TradePairs',
    component: () => import('../views/TradePairs.vue')
  },
  {
    path: '/tradePair/:name',
    name: 'TradePair',
    component: () => import('../views/TradePair.vue')
  },
  {
    path: '/token/:name',
    name: 'Token',
    component: () => import('../views/Token.vue')
  },
  {
    path: '/address/:id',
    name: 'Address',
    component: () => import('../views/Address.vue')
  },
  {
    path: '/Transaction/:hash',
    name: 'Transaction',
    component: () => import('../views/Transaction.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
