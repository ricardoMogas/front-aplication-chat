import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false
  },
  getters: {
  },
  mutations: {
    //metodo para cambiar el valor
    login(state, newValue) {
      state.logged = newValue;
    }
  },
  actions: {
  },
  modules: {
  }
})
