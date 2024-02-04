<template>
    <div class="chat-list-container">
      <!-- Barra de búsqueda -->
      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Buscar..." />
        <i class="fas fa-search"></i>
      </div>
  
      <!-- Lista de chats -->
      <div v-for="(chat, index) in filteredChats" :key="index" class="chat-item">
        <!-- Botones del lado derecho para abrir el chat -->
        <button class="open-chat-button" @click="openChat(chat)">
          <i class="fas fa-comment"></i>
        </button>
        
        <!-- Ovalo de icono de perfil -->
        <div class="profile-icon"></div>
        
        <!-- Nombre del usuario y mensajes -->
        <div class="chat-info">
          <h3>{{ chat.username }}</h3>
          <p>{{ chat.lastMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChatList',
    data() {
      return {
        chats: [
          { username: 'Santiago Vela', lastMessage: 'Hola, ¿cómo estás?' },
          { username: 'Miguel Dzbi', lastMessage: '¡Hola! Estoy bien, gracias.' },
          { username: 'Ricardo Moo', lastMessage: 'Otro mensaje de ejemplo.' },
          { username: 'Kevin Chan', lastMessage: 'Mensaje del Usuario 4.' },
          { username: 'Pedro Sola', lastMessage: 'Mensaje del Usuario 5.' },
          { username: 'Rosa Mel', lastMessage: 'Mensaje del Usuario 6.' },
        ],
        searchQuery: '',
      };
    },
    computed: {
      filteredChats() {
        // Filtrar los chats basados en la barra de búsqueda
        return this.chats.filter(chat =>
          chat.username.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      openChat(chat) {
        // Lógica para abrir el chat con el usuario seleccionado
        console.log('Abriendo chat con', chat.username);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente aquí CSS */
  
  .chat-list-container {
    display: flex;
    flex-direction: column;
    margin-top: 16px; /* Distancia entre la barra de búsqueda y la lista de usuarios */
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #e0e0e0; /* Gris bajo */
    color: #c8a2c8; /* Morado lila */
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
  
  .open-chat-button {
    margin-right: 10px;
    background-color: #25d366; /* Verde de WhatsApp */
    color: #fff;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
  }
  
  .profile-icon {
    width: 40px;
    height: 40px;
    background-color: #c8a2c8; /* Morado lila */
    border-radius: 50%;
    margin-right: 10px;
  }

  .chat-info {
    flex-grow: 1;
  }
  
  h3, p {
    margin: 0;
  }
  
  </style>
  