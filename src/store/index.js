import { createStore } from 'vuex'
import loginModule from './login';
import registerModule from './register';
import dashboardModule from './dashboard';
import deckModule from './deck';
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
    dashboard: dashboardModule,
    deck: deckModule
  }
})
