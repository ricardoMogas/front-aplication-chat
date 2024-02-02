<template>
    <div class="gridChat">
        <nav class="navbar">
            <button class="simpleButton" @click="logOut">LogOut</button>
        </nav>
        <main class="mainChat"> Ventana de chat</main>
        <footer class="inputChat">
            <div class="conversationPanel">
                <button class="simpleButton">
                    <svg class="feather feather-plus sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <button class="simpleButton">
                    <svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                </button>
                <input class="simpleInput" placeholder="Type a message..."/>
                <button class="simpleButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1036">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'ChatArea',
    methods: {
        logOut() {
        this.$store.commit('login', false)
        }
    }
}
</script>

<style scoped>
/* Estilos específicos de la vista AboutView */
.gridChat {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 80% 10%; /* Updated row sizes */
    height: 100vh; /* determina el alto de la pantalla para que se adapten las columnas */
}
/* Vista del navbar *****************/
.navbar {
    background-color: #222;
}
.navbar button {
    padding: 10px;
    margin: 10px;
}
/* Vista del los mensajes ***********/
.mainChat {
}

/** Entrada del chat ***************/
.inputChat {
    padding: 10px;
}
.inputChat .conversationPanel {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    padding: 0 10px;
    background-color: #222;
    border-radius: 4px;
}
</style>
