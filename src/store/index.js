import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import judgment from './modules/judgment'
import sourceType from './modules/sourceType'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    judgment,
    sourceType
  },
  state,
  mutations,
  getters,
  actions
})
