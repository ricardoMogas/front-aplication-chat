<template>
  <div class="home">
    <main class="grid">
      <section class="sideBar">
        <ChatSideBar></ChatSideBar>
      </section>
      <section class="chat">
        <ChatArea v-if="getCurrentGroup.enterGroup != ''" :groupNameProp="getCurrentGroup.name" :groupIdProp="getCurrentGroup.id" :historialChat="historialChat"></ChatArea>
        <AddGroupCard v-else></AddGroupCard>
      </section>
    </main>
  </div>
</template>

<script>
import ChatArea from '@/components/ChatArea.vue';
import ChatSideBar from '@/components/ChatSideBar.vue';
import AddGroupCard from '@/components/AddGroupCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    ChatSideBar,
    ChatArea,
    AddGroupCard
  },
  data() {
    return {
      Groups: [],
      historialChat: []  // Agrega un array para almacenar el historial del chat
    };
  },
  mounted() {
    //const test = new FetchGet();
  },
  computed: {
    ...mapGetters(['getCurrentGroup']),
    currentGroup() {
      return this.getCurrentGroup;
    }
  },
  methods: {
  },

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
@/classes/FetchGetG.js@/utils/FetchGetGroupMessages.js