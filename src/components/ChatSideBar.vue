<template>
  <div class="chat-list-container">
    <div class="search-bar">
      <div class="profile-icon-large"></div>
      <input v-model="searchQuery" placeholder="Buscar..." />
      <i class="fas fa-search"></i>
    </div>

    <div class="groupList">
      <div v-for="(chat, index) in filteredChats" :key="index" class="chat-item">
        <div class="profile-icon"></div>
        <button class="open-chat-button" @click="openChat(chat)">
          <i class="fas fa-comment"></i>
        </button>
        <div class="chat-info">
          <h3>{{ chat.name }}</h3>
          <p>{{ chat.description }}</p>
        </div>
        <div class="chat-sidebar">
          <button @click="entrarAlChat(chat)">Entrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatList',
  data() {
    return {
      chats: [
        {
          "message": null,
          "success": true,
          "data": [
            {
              "id": "65bc76523b256234fa384ed9",
              "name": "Programación",
              "description": "Grupo para hablar de la tiradera del codigo",
              "image": "string",
              "createdDate": "2024-02-02T04:55:04.766Z",
              "visibility": "Public",
              "owner": null
            },
            {
              "id": "65be8e51e275485a12ac7c2f",
              "name": "UNID",
              "description": "preparatoria",
              "image": "miguel.png",
              "createdDate": "2024-02-03T19:03:52.037Z",
              "visibility": "Private",
              "owner": null
            },
            {
              "id": "65c1770a53262086541744b7",
              "name": "Sistemas distribuidos",
              "description": "Grupo para hablar de programación y más",
              "image": "string",
              "createdDate": "2024-02-05T17:59:12.583Z",
              "visibility": "Public",
              "owner": "65b81bc7d55e802544702eb6"
            },
            {
              "id": "65c17c262a7eb59f9cdebff2",
              "name": "Amigos de distribuidos",
              "description": "Grupo para clase de Sistemas Distribuidos",
              "image": "string",
              "createdDate": "2024-02-06T00:23:32.795Z",
              "visibility": "Public",
              "owner": "65b81bc7d55e802544702eb6"
            }
          ]
        }
      ],
      searchQuery: '',
    };
  },
  computed: {
    filteredChats() {
      return this.chats[0].data.filter(chat =>
        chat.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        chat.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    openChat(chat) {
      this.$emit('chat-opened', chat.name);
    },
    entrarAlChat(chat) {
      if (chat && chat.messages && chat.messages.length > 0) {
        this.$emit('entrar-al-chat', chat);
      } else {
        alert('No hay historial vigente en este chat.');
      }
    },
  },
};
</script>

<style scoped>
.groupList {
  overflow-y: auto;
  height: 537px;
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
