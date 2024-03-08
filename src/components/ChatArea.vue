<template>
  <div class="gridChat">
    <nav class="navbar">
      <dialog id="v-dialog" class="simpleDialog">
        <section>
          <h3 style="color: #fff;">Email</h3>
          <input class="simpleInput" v-model="dataAddGroup.email" type="text">
          <h3 style="color: #fff;">Rol</h3>
          <input class="simpleInput" v-model="dataAddGroup.rol" type="text">
        </section>
        <section v-if="loadingAddToGroup === false">
          <button class="simpleButton" @click="AddUserToGroup">registrar</button>
          <button class="simpleButton" @click="statusModal">Cerrar</button>
        </section>
        <Loader :showLoader="loadingAddToGroup" :typeLoader="1"></Loader>
      </dialog>
      <button class="simpleButton" @click="logOut">LogOut</button>
      <button class="simpleButton" @click="statusModal">add to group {{ groupNameProp }}</button>
    </nav>

    <main class="mainChat">
      <div v-if="messagesData.length != 0" class="messages">
        <div :class="typeOfMessage(item.user)" v-for="(item, index) in messagesData" :key="index">
          <h3>{{ item.user }}</h3>
          <small style="color: rgba(255, 255, 255, 0.763); margin-bottom: 10px;">{{ item.hour }}</small>
          <p class="bodyMessage">{{ item.bodyMessage }}</p>
        </div>
      </div>
      <div v-else style="text-align: center; padding: 50px;">
        <Loader :showLoader="loading" :typeLoader="2"></Loader>
        <p v-if="loading === false">No hay mensajes</p>
      </div>
    </main>

    <footer class="inputChat">
      <div class="conversationPanel">
        <button class="simpleButton" @click="">
          <svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </button>
        <input @keyup.enter="sendMessage()" v-model="messageUser.bodyMessage" class="simpleInput"
          placeholder="Type a message..." />
        <button @click="sendMessage()" class="simpleButton">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
            data-reactid="1036">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import * as signalR from '@microsoft/signalr';
import axios from 'axios'; // Agrega la importación de axios si no está presente
import Loader from '@/components/Loader.vue';
//import EmojiPicker from '@/components/EmojiPicker.vue';

export default {
  name: 'ChatArea',
  props: {
    groupNameProp: String,
    groupIdProp: String,
    historialChat: Array,  // Agrega la propiedad 'historialChat' como prop
  },
  components: {
    Loader,
    //EmojiPicker
  },
  data() {
    return {
      loadingAddToGroup: false,
      loading: false,
      showEmojiPicker: false,
      connection: null,
      messageUser: {
        user: this.$store.state.logged.userName,
        hour: new Date().toLocaleTimeString(),
        bodyMessage: ''
      },
      messagesData: [],
      dayMessage: [],
      showModal: false,
      dataAddGroup: { 
        email: '',
        idGroup: '', 
        joinedDate: '', 
        rol: 'Administrator'
      }
    };
  },
  watch: {
    groupIdProp: function () {
      this.messagesData = [];
      this.getmessages();
    },
    showModal: function (newValue, oldValue) {
      var dialog = document.getElementById("v-dialog");
      if (newValue) {
        dialog.showModal();
      }else{
        dialog.close();
      }
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('token');
      const newValues = {
        userName: '',
        status: false
      }
      this.$store.commit('login', newValues);
    },

    
    typeOfMessage(userName) {
      return this.messageUser.user === userName ? 'ContentMessageUser' : 'ContentMessage';
    },


    statusModal() {
      this.showModal = !this.showModal;
    },


    async AddUserToGroup() {
      this.loadingAddToGroup = true;
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/Issues`, {
          email: this.dataAddGroup.email,
          idGroup: this.groupIdProp,
          joinedDate: this.convertHour(),
          rol: this.dataAddGroup.rol
        });
        this.loadingAddToGroup = false;
        console.log(response.data);
      } catch (error) {
        console.error('Error al agregar usuario al grupo: no existe el usuario');
      }
    },


    async sendMessage() {
      const data = {
        user: this.messageUser.user,
        hour: this.messageUser.hour,
        bodyMessage: this.messageUser.bodyMessage
      }
      console.log(data);
      this.connection.invoke("SendMessage", this.messageUser.user, this.messageUser.bodyMessage, this.groupNameProp)
        .then(() => {
          this.saveMessage();
          this.messagesData.push(data);
          this.messageUser.bodyMessage = '';
        })
        .catch(err => console.log('Error while sending message: ' + err));
    },


    async saveMessage() {
      try {
        const hour = this.convertHour();
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/Messages`, {
          groupId: this.groupIdProp,
          sendDate: hour,
          text: this.messageUser.bodyMessage
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error al guardar el mensaje:', error);
      }
    },


    async getmessages() {
      console.log('Obteniendo mensajes de ' + this.groupNameProp);
      try {
        this.loading = true;
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/Messages/group/${this.groupIdProp}`);
        const data = response.data.data;
        // Obtener la fecha actual sin milisegundos
        const currentDate = this.convertHour().slice(0, -5);
        data.forEach(item => {
          // Comparar las fechas sin milisegundos
          console.log(item.date.slice(0, -5), currentDate);
          if (item.date.slice(0, 10) === currentDate.substring(0, 10)) {
            item.messages.forEach(mess => {
              console.log(mess);
              const message = {
                user: mess.nameUser,
                hour: mess.sendDate,
                bodyMessage: mess.content
              };
              this.messagesData.push(message);
            });
          }
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        alert('error al obtener mensajes');
        console.error('Error al obtener los mensajes:', error);
      }
    },


    convertHour() {
      const fechaHoraActual = new Date();
      const year = fechaHoraActual.getFullYear();
      const month = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
      const day = String(fechaHoraActual.getDate()).padStart(2, '0');
      const hours = String(fechaHoraActual.getHours()).padStart(2, '0');
      const minutes = String(fechaHoraActual.getMinutes()).padStart(2, '0');
      const seconds = String(fechaHoraActual.getSeconds()).padStart(2, '0');

      const fechaHoraFormateada = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

      return fechaHoraFormateada;
    }
  },
  mounted() {
    this.getmessages();
    //https://chat-penguin-api.onrender.com/chat
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.VUE_APP_API_URL}/chat`)
      .build();

    this.connection.start().then(() => {
      console.log('Connection started');
      if (this.connection) {
        this.connection.invoke('AddToGroup', this.groupNameProp);
        console.log('Connected to group', this.groupNameProp);
      }
    }).catch(err => console.log('Error while starting connection: ' + err));

    this.connection.on("ReceiveMessage", (user, message) => {
      if (user != this.messageUser.user) {
        const data = {
          user: user,
          hour: new Date().toLocaleTimeString(),
          bodyMessage: message
        }
        this.messagesData.push(data);
        const receivedMessage = `${user}: ${message}`;
        console.log(receivedMessage);
      }
    });
  },
  updated() {
    this.$nextTick(function () {
      let mainChat = this.$el.querySelector('.mainChat');
      mainChat.scrollTop = mainChat.scrollHeight;
    })
  }
};
</script>

<style scoped>
.gridChat {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 80% 10%;
  height: 100vh;
}

.navbar {
  background-color: #222;
  text-align: end;
}

.navbar button {
  padding: 10px;
  margin: 10px;
}

.mainChat {
  overflow-y: auto;
  height: auto;
}

.messages {
  display: flex;
  flex-direction: column;
  padding: 10px;
  word-wrap: break-word;
}

.mainChat .messages .fechaChat {
  color: #fff;
  text-align: center;
  margin: 10px;
}

.ContentMessageUser {
  background: #371965;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: none;
  align-self: flex-end;
  text-align: end;
  margin-bottom: 10px;
  max-width: 250px;
  word-wrap: break-word;
  box-shadow: 0 0 5px #00000093;
}

.ContentMessageUser .bodyMessage {
  color: #fff;
  font-size: 1em;
  margin: 5px 0;
}

.ContentMessage {
  background: #7355A4;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: none;
  align-self: flex-start;
  margin-bottom: 10px;
  max-width: 250px;
  word-wrap: break-word;
  box-shadow: 0 0 5px #00000093;
}

.inputChat {
  padding: 0px 10px 10px 10px;
}

.inputChat .conversationPanel {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  padding: 0 10px;
  background-color: #222;
  border-radius: 4px;
}

</style>
