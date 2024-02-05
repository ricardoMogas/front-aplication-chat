<template>
  <div class="home">
    <main class="grid">
      <section class="sideBar">
        <ChatSideBar></ChatSideBar>
      </section>
      <section class="chat">
        <ChatArea></ChatArea>
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
    ChatSideBar
  },
  data() {
    return {
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.logged;
    },
  },
}
</script>

<style scoped>
.grid {
  display: grid;
  height: auto;
  grid-template-columns: 1fr 2fr; /* determina el tamaño de las columnas */
  height: 100vh;
}

.home .grid .sideBar {
  border: .1px solid #ddd; /* Borde para visualización */
}

.home .grid .chat {
  /* border: .1px solid #ddd;  Borde para visualización */
}

</style>    
