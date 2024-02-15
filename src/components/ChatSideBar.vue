<template>
  <div class="chat-list-container">
    <div class="search-bar">
      <div class="profile-icon-large"></div>
      <input class="simpleInput" placeholder="search" />
      <i class="fas fa-search"></i>
    </div>

    <div class="groupList">
      <div v-for="group in groups" :key="group.idIssue" class="chat-item">
        <button class="open-chat-button" @click="openChat(chat)">
          <i class="fas fa-comment"></i>
        </button>
        <div class="chat-info">
          <h3>{{ group.nameGroup }}</h3>
        </div>
        <div class="chat-sidebar">
          <button @click="enterTheChat(group.nameGroup, group.idGroup)">Entrar</button>
        </div>
      </div>
      <Loader :showLoader="loading" :typeLoader="1" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue'
export default {
  name: 'ChatSideBar',
  components: {
    Loader
  },
  data() {
    return {
      loading: false,
      groups: [],
      dataAddGroup: {
        email: '',
        idGroup: '',
        joinedDate: '',
        rol: ''
      },
    };
  },
  mounted() {
    this.getIssues();
  },
  methods: {
    openChat(chat) {
      this.$emit('chat-opened', chat.name);
    },
    enterTheChat(chat, idIssue) {
      console.log(chat)
      //converitr de json a objeto normal
      const name = JSON.stringify(chat);
      //quitar comillas al inicio y final
      console.log(name.replace(/^"(.*)"$/, '$1'))
      const group = {
        name: name.replace(/^"(.*)"$/, '$1'),
        enterGroup: true,
        id: idIssue
      }
      this.$store.commit('changeGroup', group);
    },
    async getIssues() {
      this.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/Issues`);
        // Asigna directamente los datos de respuesta a this.Groups
        this.loading = false;
        this.groups = response.data.data;
        console.log(this.groups); // Comprueba que los datos se hayan asignado correctamente
      } catch (error) {
        this.loading = false;
        console.error('Error al obtener los issues:', error);
      }
    },

    convertDate() {
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
};
</script>


<style scoped>
.groupList {
  overflow-y: auto;
  height: auto;
}

.profile-icon-large {
  width: 50px;
  height: 50px;
  background-color: #c8a2c8;
  border-radius: 50%;
  margin-right: 15px;
}

.chat-list-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 90%;
  height: 100vh;
  background: repeating-linear-gradient(#332638, #6d5391, #332638);
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #222;
  color: #c8a2c8;
  border-right: 1px solid #ffffff15;
}

.search-bar input {
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
}

.search-bar i {
  font-size: 20px;
  cursor: pointer;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.profile-icon {
  width: 40px;
  height: 40px;
  background-color: #c8a2c8;
  border-radius: 50%;
  margin-right: 15px;
}

.open-chat-button {
  margin-right: 10px;
  background-color: #25d366;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
}

.chat-info {
  flex-grow: 1;
}

h3, p {
  margin: 0;
}
</style>
