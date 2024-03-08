<template>
    <div>
      <Picker @emoji-click="addEmoji"></Picker>
      <textarea v-model="message"></textarea>
    </div>
  </template>
  
  <script>
  import { Picker } from 'emoji-mart-vue';
  
  export default {
    name: EmojiPicker,
    components: {
      Picker
    },
    data() {
      return {
        message: ''
      };
    },
    methods: {
      addEmoji(emoji) {
        this.message += emoji.native;
      }
    }
  };
  </script>
  
  <style>
  /* Estilos personalizados */
  </style>
  