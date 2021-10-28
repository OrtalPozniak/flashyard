import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import yards from './yards'
import payment from './payment'
import order from './order'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      users,
      yards,
      payment,
      order
    },
    plugins: [
    ],
    strict: process.env.DEBUGGING,

  })

  return Store
}
