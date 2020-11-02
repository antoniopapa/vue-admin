import { createStore } from 'vuex'
import UserModule from "@/store/UserModule";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    User: UserModule
  }
})
