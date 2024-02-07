import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: {
      status: false,
      userName: ''
    },
    currentGroup: ""
  },
  getters: {
  },
  mutations: {
    //metodo para cambiar el valor
    login(state, newValue) {
      state.logged.status = newValue.status;
      state.logged.userName = newValue.userName;
    },
    changeGroup(state, newValue) {
      state.currentGroup = newValue;
    }
  },
  actions: {
  },
  modules: {
  }
})
