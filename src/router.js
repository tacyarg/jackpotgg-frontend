import Vue from 'vue'
import Router from 'vue-router'
import Jackpot from './views/Jackpot.vue'
import Coinflip from './views/Coinflip.vue'
import Referals from './views/Referals.vue'
import Settings from './views/Settings.vue'
import CoinflipGame from './views/CoinflipGame.vue'
import Admin from './views/Admin.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'jackpot',
      component: Jackpot
    },
    {
      path: '/referals',
      name: 'referals',
      component: Referals
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/coinflip',
      name: 'coinflip',
      component: Coinflip
    },
    {
      path: '/coinflip/:id',
      name: 'coinflipgame',
      component: CoinflipGame
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
