import { createStore } from 'vuex'
import loginModule from './login';
import registerModule from './register';
import dashboardModule from './dashboard';
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login: loginModule,
    register: registerModule,
    dashboard: dashboardModule
  }
})
