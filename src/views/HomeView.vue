<template>
  <div class="home">
    <main class="grid">
      <section class="sideBar">
        <ChatSideBar ></ChatSideBar>
      </section>
      <section class="chat">
        <ChatArea :groupNameProp="groupName"></ChatArea>
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
      groupName: 'forumGroup'
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.logged;
    },
  },
  methods: {
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  height: auto;
  grid-template-columns: 1fr 2fr; /* determina el tamaño de las columnas */
  height: 100vh;
}

</style>    
