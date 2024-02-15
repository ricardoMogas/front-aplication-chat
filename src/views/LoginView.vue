<template>
  <body>
    <section>
      <div class="signin">
        <div class="content">
          <img src="../assets/logoChat.png" alt="Uachat" :style="{ width: '80px', height: 'auto' }">
          <h2 v-if="!isSignup">Sign In</h2>
          <h2 v-else>Sign Up</h2>
          <div class="form">
            <div class="inputBox" v-if="!isSignup">
              <input v-model="userName" type="text" required>
              <i>Username</i>
            </div>
            <div class="inputBox" v-else>
              <input v-model="firstName" type="text" required>
              <i>First Name</i>
            </div>
            <div class="inputBox" v-if="isSignup">
              <input v-model="lastName" type="text" required>
              <i>Last Name</i>
            </div>
            <div class="inputBox">
              <input :type="showPassword ? 'text' : 'password'" v-model="password" required>
              <i>Password</i>
              <button id="whachPassword" class="simpleButton" @click="toggleShowPassword">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <div class="inputBox" v-if="isSignup">
              <input v-model="email" type="email" required>
              <i>Email</i>
            </div>
            <!-- signup button -->
            <div class="links" v-if="!isSignup" style="text-align: right;">
              <a href="#" @click="toggleSignup" style="color: #7355A4; text-align: right;">Signup</a>
            </div>
            <div class="inputBox">
              <input v-if="loading === false" @click="isSignup ? signup() : login()" type="submit" :value="isSignup ? 'Accept' : 'Accept'">
              <Loader :showLoader="loading" :typeLoader="1"></Loader>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue';

export default {
  name: 'LoginView',
  components: {
    Loader
  },
  data() {
    return {
      loading: false,
      showPassword: false,
      isSignup: false,
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
    };
  },
  mounted() {
    const apiBase = process.env.VUE_APP_API_URL
    console.log(apiBase);
  },
  methods: {
    async login() {
      if (!this.userName || !this.password) {
        alert("Please fill in all required fields!");
        return; // Cancel login if required fields are empty
      }
      this.loading = true;
      axios.post(`${process.env.VUE_APP_API_URL}/api/Users/Login`, {
        user: this.userName,
        password: this.password
      })
        .then(response => {
          if (response.data.success) {
            // guardar el token en store
            this.$store.commit('setToken', response.data.data);
            console.log(response.data.data);
            // Ahora el token está disponible globalmente en tu aplicación Vue
            // Puedes acceder a él usando this.$store.state.token
            const newValues = { userName: this.userName, status: true };
            this.$store.commit('login', newValues);
            this.loading = false;
          } else {
            console.log('fallo en el post')
            this.loading = false;
          }
        })
        .catch(error => {
          this.loading = false
          console.error('Error:', error);
          // Manejar errores de red u otros errores
        });
      // Navigate to chat page or perform other actions after login
    },
    async signup() {
      if (!this.firstName || !this.lastName || !this.password || !this.email) {
        alert("Please fill in all required fields!");
        return; // Cancel signup if required fields are empty
      }
      this.loading = true;
      const fullName = `${this.firstName} ${this.lastName}`
      axios.post(`${process.env.VUE_APP_API_URL}/api/Users`, {
        email: this.email,
        password: this.password,
        userName: fullName,
        Image: 'string'
      })
        .then(response => {
          if (response.data.success) {
            this.loading = false;
            this.isSignup = false;
            console.log(response.data.data);
            alert("Registro Completo");
            // Ahora el token está disponible globalmente en tu aplicación Vue
            // Puedes acceder a él usando this.$store.state.token

          } else {
            this.loading = false
            console.log('fallo en el post')
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // Manejar errores de red u otros errores
        });
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleSignup() {
      this.password = '';
      this.isSignup = !this.isSignup;
    },
  },
};
</script>


<style scoped>
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

section {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  overflow: hidden;
}

section::before {
  /* Efecto de fondo de ondulacion */
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(#000, #7355A4, #000);
  animation: animate 5s linear infinite;
}

@keyframes animate {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(100%);
  }
}

section .signin {
  position: absolute;
  width: 400px;
  height: 100%;
  background: #222;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 9);
}

section .signin .content {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
}

section .signin .content h2 {
  /* Titulos del login */
  font-size: 2em;
  color: #7355A4;
  text-transform: uppercase;
}

section .signin .content .form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

section .signin .content .form .inputBox {
  position: relative;
  width: 100%;

}

section .signin .content .form .inputBox input {
  position: relative;
  width: 100%;
  background: #6F6D73;
  border: none;
  padding: 15px 10px;
  /* Reducción del padding en los campos de entrada */
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  font-size: 0.9em;
  /* Reducción del tamaño de la fuente */
}
section .signin .content .form .inputBox div {
  text-align: center;
  /* Reducción del tamaño de la fuente */
}

section .signin .content .form .inputBox i {
  position: absolute;
  left: 0;
  padding: 12px 10px;
  /* Reducción del padding en el ícono */
  font-style: normal;
  color: #aaa;
  transition: 0.5s;
  pointer-events: none;
}

.signin .content .form .inputBox input:focus~i,
.signin .content .form .inputBox input:valid~i {
  transform: translateY(-7.5px);
  font-size: 0.8em;
  color: #fff;
}

.form .inputBox input:focus {
  outline: 3px #7355A4 solid;
  background: #000 !important;
  /* CORREGIR, NO USAR SIEMPRE !important */
}

.signin .content .form .links {
  /* Contenedor de olvidar contraseña y regitrarse */
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.signin .content .form .links a {
  color: #fff;
  text-decoration: none;
}

.signin .content .form .links a:nth-child(2) {
  color: #7355A4;
  font-weight: 600;
}

.signin .content .form .inputBox input[type="submit"] {
  padding: 8px;
  /* Reducción del padding del botón */
  background: #7355A4;
  color: #fff;
  font-weight: 600;
  font-size: 1em;
  /* Reducción del tamaño de la fuente */
  letter-spacing: 0.05em;
  cursor: pointer;
}

input[type="submit"]:active {
  opacity: 0.6;
}

@media (max-width: 900px) {
  section span {
    width: calc(10vw - 2px);
    height: calc(10vw - 2px);
  }
}

@media (max-width: 600px) {
  section span {
    width: calc(20vw - 2px);
    height: calc(20vw - 2px);
  }
}
</style>
