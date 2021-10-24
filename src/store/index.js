import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import yards from './yards'
import payment from './payment'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {

  const Store = new Vuex.Store({
    modules: {
      users,
      yards,
      payment
    },
    plugins: [
    ],
    strict: process.env.DEBUGGING,

  })

  return Store
}
