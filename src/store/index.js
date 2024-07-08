import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
  },
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
      storage: window.sessionStorage,
      // 存储的 key 的key值
      key: "store",
      // 只持久化存储user模块的状态
      paths: ['user']
    })
  ]
})
