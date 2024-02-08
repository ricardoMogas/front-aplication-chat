<template>
  <div v-if="showLoader" class="loader">
    <!-- Your loader HTML/CSS goes here -->
    Loading...
  </div>
</template>

<script>
export default {
  props: {
    showLoader: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.loader {
  /* Your loader styles go here */
}
</style>
