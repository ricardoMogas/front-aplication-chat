import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    logged: {
      status: false,
      userName: ''
    },
    currentGroup: {
      name: '',
      id: '',
      enterGroup: false
    },
    token: null
  },
  getters: {
    getCurrentGroup: state => {
      return state.currentGroup;
    }
  },
  mutations: {
    //metodo para cambiar el valor
    login(state, newValue) {
      state.logged.status = newValue.status;
      state.logged.userName = newValue.userName;
    },
    changeGroup(state, newValue) {
      state.currentGroup.name = newValue.name;
      state.currentGroup.enterGroup = newValue.enterGroup;
      state.currentGroup.id = newValue.id;
    },
    setToken(state, newValue) {
      state.token = newValue;
    }
  },
  actions: {
  },
  modules: {
  }
})
axios.interceptors.request.use(config => {
  const token = store.state.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
});

export default store; 