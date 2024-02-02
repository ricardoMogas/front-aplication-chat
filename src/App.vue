<template>
  <LoginView v-if="loggedIn == false" />
  <router-view v-else="loggedIn == true"/>
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
.simpleButton svg {
  display: flex;
  padding: 5px;
  height: 100%;
}

.simpleInput {
  background: #6F6D73;
  border: none;
  padding: 5px 5px 5px;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  font-size: 1em;
  width: 85%;
}
.simpleInput:focus {
  outline: 3px #7355A4 solid;
  background: #000 !important; /* CORREGIR, NO USAR SIEMPRE !important */
}
</style>

