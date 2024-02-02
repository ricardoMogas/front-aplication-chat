<template>
  <LoginView v-if="loggedIn == false" />
  <router-view v-else="loggedIn == true"/>
{{ nombre }}
</template>

<script>
import LoginView from './views/LoginView.vue';
export default {
  name: 'HomeView',
  components: {
    LoginView,
  },
  data() {
    return {
      nombre: 'asdf'
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.logged;
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

body {
  justify-content: center;
  align-items: center;
  background: #000;
  color: #fff;
}

/* Agregar aqui estilos generales */

.simpleButton {
  padding: 5px;
  background: #7355A4;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1em;
  letter-spacing: 0.05em;
  cursor: pointer;
  margin: 10px;
}
</style>

