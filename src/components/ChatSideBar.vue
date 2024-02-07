<template>
  <div class="chat-list-container">
    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <!-- Icono de perfil grande -->
      <div class="profile-icon-large"></div>
      <!-- Campo de búsqueda -->
      <input v-model="searchQuery" placeholder="Buscar..." />
      <!-- Icono de búsqueda -->
      <i class="fas fa-search"></i>
    </div>

    <!-- Lista de chats -->
    <div class="groupList">
      <!-- Iterar a través de los chats filtrados -->
      <div v-for="(chat, index) in filteredChats" :key="index" class="chat-item">
        <!-- Ovalo de icono de perfil pequeño en cada chat -->
        <div class="profile-icon"></div>

        <!-- Botón del lado derecho para abrir el chat -->
        <button class="open-chat-button" @click="openChat(chat)">
          <!-- Icono de comentario -->
          <i class="fas fa-comment"></i>
        </button>

        <!-- Nombre del usuario y mensajes -->
        <div class="chat-info">
          <!-- Encabezado con el nombre del usuario -->
          <h3>{{ chat.username }}</h3>
          <!-- Párrafo con el último mensaje -->
          <p>{{ chat.lastMessage }}</p>
        </div>

        <!-- Botón de entrada con estilo personalizado -->
        <div class="chat-sidebar">
          <button @click="entrarAlChat">Entrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  data() {
    return {
      // Lista de chats con nombres de usuario y últimos mensajes
      chats: [
        { username: 'Santiago Vela', lastMessage: 'Hola, ¿cómo estás?' },
        { username: 'Miguel Dzib', lastMessage: '¡Hola! Estoy bien, gracias.' },
        { username: 'Ricardo Moo', lastMessage: 'Otro mensaje de ejemplo.' },
        { username: 'Kevin Chan', lastMessage: 'Hola, ¿cómo estás?' },
        { username: 'Rosa Mela', lastMessage: '¡Hola! Estoy bien, gracias.' },
        { username: 'Tela Compro', lastMessage: 'Otro mensaje de ejemplo.' },
        { username: 'Carlos Mena', lastMessage: 'Hola, ¿cómo estás?' },
        { username: 'Gabriela Cadena', lastMessage: '¡Hola! Estoy bien, gracias.' },
        { username: 'Manuel Estrella', lastMessage: 'Otro mensaje de ejemplo.' },
        // ... (otros chats)
      ],
      // Consulta de búsqueda
      searchQuery: '',
    };
  },
  computed: {
    // Computada para filtrar los chats basados en la barra de búsqueda
    filteredChats() {
      return this.chats.filter(chat =>
        chat.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    // Método para abrir un chat con el usuario seleccionado
    openChat(chat) {
      console.log('Abriendo chat con', chat.username);
    },
    // Método para emitir el evento de entrar al chat
    entrarAlChat() {
      this.$emit('entrar-al-chat');
    },
  },
};
</script>

<style scoped>
/* Estilos específicos del componente aquí CSS */

.groupList {
  overflow-y: auto;
  height: 537px; /* Ajusta esto a la altura deseada */
}

.profile-icon-large {
  width: 50px;
  height: 50px;
  background-color: #c8a2c8; /* Morado lila */
  border-radius: 50%;
  margin-right: 15px;
}

.chat-list-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 90%; /* Updated row sizes */
  height: 100vh; /* determina el alto de la pantalla para que se adapten las columnas */
  background: repeating-linear-gradient(#332638, #6d5391, #332638);
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #222;
  color: #c8a2c8; /* Morado lila */
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
  background-color: #c8a2c8; /* Morado lila */
  border-radius: 50%;
  margin-right: 15px;
}

.open-chat-button {
  margin-right: 10px;
  background-color: #25d366; /* Verde de WhatsApp */
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
