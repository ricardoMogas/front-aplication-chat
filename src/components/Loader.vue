<template>
  <div class="loaderContent">
      <div v-if="showLoader && Number(typeLoader) === 1" class="loader"></div>
      <div v-if="showLoader && Number(typeLoader) === 2" class="spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    showLoader: {
      type: Boolean,
      default: false
    },
    typeLoader: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>

.loaderContent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Asegúrate de que el div loader tenga una altura. Puede ser un valor fijo o relativo, dependiendo de tus necesidades */
}
.loader {
  display: block;
  --height-of-loader: 4px;
  --loader-color: #7355A4;
  width: 130px;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0,0,0,0.2);
  position: relative;
}
.loader::before {
  content: "";
  position: absolute;
  background: var(--loader-color);
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 30px;
  animation: moving 1s ease-in-out infinite;
  ;
}

@keyframes moving {
  50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
}

/*spinner*/
.spinner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner::before,
.spinner::after {
  position: absolute;
  content: "";
  height: 6em;
  width: 6em;
  border: 2em solid #7355A4;
  border-radius: 50%;
  animation: spinner_79178 2s linear infinite;
}

.spinner::after {
  opacity: 0;
  animation-delay: 1s;
}

@keyframes spinner_79178 {
  0% {
    border: 1em solid #7355A4;
    transform: scale(0);
    opacity: 1;
  }

  100% {
    border: 0 solid #000;
    transform: scale(1);
    opacity: 0;
  }
}
</style>
