<template>
  <!-- partial:index.partial.html -->
    <body>
      <section>
      <div class="signin">
        <div class="content">
          <img src="../assets/logoChat.png" alt="Uachat" :style="{ width: '100px', height: 'auto'}">
          <h2>Sign In</h2>
          <div class="form">

            <div class="inputBox">

              <input v-model="userName" type="text" required> <i>Username</i>

            </div>

            <div class="inputBox">
              <input :type="showPassword  ? 'text' : 'password'" v-model="password" required> <i>contraseña</i>
              <button id="whachPassword" class="simpleButton" @click="toggleShowPassword">{{ showPassword ? 'Ocultar' : 'Mostrar' }}</button>
            </div>

            <div class="links"> 
              <a href="#">Forgot Password</a> 
              <a href="#">Signup</a>
            </div>

            <div class="inputBox">

              <input @click="login" type="submit" value="Login">

            </div>

          </div>
        </div>  
      </div>
    </section> <!-- partial -->
    </body>
  <!-- partial -->
</template>
<script>
export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      userName: '',
      password: '',
      showPassword: false
    }
  },
  computed: {},
  methods: {
    login(){
      const newValues = {
        userName: this.userName,
        status: true
      }
      this.$store.commit('login', newValues)
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    }
  }
}
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

section::before { /* Efecto de fondo de ondulacion */
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

section .signin .content h2 { /* Titulos del login */
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
  padding: 25px 10px 7.5px;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  font-size: 1em;
}

section .signin .content .form .inputBox i {
  position: absolute;
  left: 0;
  padding: 15px 10px;
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
  background: #000 !important; /* CORREGIR, NO USAR SIEMPRE !important */
}

.signin .content .form .links { /* Contenedor de olvidar contraseña y regitrarse */
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
  padding: 10px;
  background: #7355A4;
  color: #fff;
  font-weight: 600;
  font-size: 1.35em;
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
