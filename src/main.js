/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import Offline from './Offline.vue'
import router from './router'
import 'vue2-animate/dist/vue2-animate.min.css'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
Vue.use(SequentialEntrance)

import Notifications from 'vue-notification'
Vue.use(Notifications)
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
import VueDayjs from 'vue-dayjs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.use(VueDayjs, {
  filters: {
    fromNow: time => {
      return dayjs(time).fromNow()
    },
  },
})

import ChipsGG from 'chipsgg-client'

async function init() {
  var props = null
  try {
    props = await ChipsGG(
      // 'http://localhost:9992',
      // 'http://localhost:9993'
    )
  } catch (error) {
    return new Vue({
      el: '#app',
      render: createElement => createElement(Offline),
    })
  }

  console.log({
    state: props.state.get(),
    // userstate: props.userState.get()
  })

  Vue.config.productionTip = false

  new Vue({
    router,
    render: createElement =>
      createElement(App, {
        props,
      }),
  }).$mount('#app')
}

init()
