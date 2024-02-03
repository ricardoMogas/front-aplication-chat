<template>
    <div>
      <h1>This is the chat list</h1>
      <div class="button-list">
        <button>Botón 1</button>
        <button>Botón 2</button>
        <button>Botón 3</button>
        <!-- Agrega más botones según sea necesario -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChatSideBar',
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente aquí CSS*/
  .button-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #808080; /* Gris */
    color: #c8a2c8; /* Morado lila */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #a9a9a9; /* Gris más claro al pasar el ratón */
  }
  </style>
  