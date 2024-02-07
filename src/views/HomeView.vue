<template>
  <div class="home">
    <main class="grid">
      <section class="sideBar">
        <ChatSideBar @entrar-al-chat="entrarAlChat"></ChatSideBar>
      </section>
      <section class="chat">
        <ChatArea :groupNameProp="groupName" :historialChat="historialChat"></ChatArea>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatArea from '@/components/ChatArea.vue';
import ChatSideBar from '@/components/ChatSideBar.vue';

export default {
  name: 'HomeView',
  components: {
    ChatSideBar,
    ChatArea,
  },
  data() {
    return {
      groupName: 'forumGroup',
      historialChat: []  // Agrega un array para almacenar el historial del chat
    };
  },
  methods: {
    entrarAlChat() {
      // Lógica para cargar el historial de chat cuando se hace clic en "Entrar"
      // Puedes hacer una llamada a la API o realizar cualquier acción necesaria.
      // Por ahora, solo actualizaremos el historial de chat con un ejemplo.
      this.historialChat = [
        { usuario: 'Usuario1', mensaje: 'Hola' },
        { usuario: 'Usuario2', mensaje: 'Hola también' }
        // Agrega más mensajes según sea necesario
      ];
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  height: auto;
  grid-template-columns: 1fr 2fr; /* determina el tamaño de las columnas */
  height: 100vh;
}
</style>
