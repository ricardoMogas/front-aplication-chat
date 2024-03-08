<template>
  <dialog id="v-modal">
    <slot></slot>
    <button id="v-modalClose" @click="closeModal">Cerrar</button>
  </dialog>
</template> 

<script>
export default {
  name: 'Modal',
  // Component properties and methods go here
  props: {
    title: String,
    bodyText: String,
    showModal: Boolean,
    loading: Boolean
  },
  data() {
    return {
    }
  },
  watch: {
    showDialog: function (newValue, oldValue) {
      console.log(newValue);
      if (newValue) {
        window.showDialog.addEventListener("click", () => {
          window.simpleModal.showModal();
        });
      } else {
        this.closeModal();
      }
    }
  },
  methods: {
    closeModal() {
      const modal = this.$refs.modalRef;
      modal.close();
    }
  }
}
</script>

<style scoped>
dialog {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
</style>
