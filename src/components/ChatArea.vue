<template>
    <div class="gridChat">
        <nav class="navbar">
            <button class="simpleButton" @click="logOut">LogOut</button>
        </nav>

        <main class="mainChat">
            <div class="messages" v-for="item in data" :key="item.Date">
                <p class="fechaChat">{{ item.Date }}</p>
                <div :class="typeOfMessage(message.id)" v-for="message in item.message" :key="message.id">

                    <h3>{{ message.user }}</h3>
                    <small style="color: rgba(255, 255, 255, 0.763); margin-bottom: 10px;">{{ message.hour }}</small>
                    <p class="bodyMessage">{{ message.message }}</p>
                </div>
            </div>
        </main>

        <footer class="inputChat">
            <div class="conversationPanel">
                <button class="simpleButton">
                    <svg class="feather feather-plus sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <button class="simpleButton">
                    <svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                </button>
                <input class="simpleInput" placeholder="Type a message..." />
                <button class="simpleButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        aria-hidden="true" data-reactid="1036">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </footer>

    </div>
</template>

<script>
import * as signalR from '@microsoft/signalr';
export default {
    name: 'ChatArea',
    data: function () {
        return {
            connection: null,
            messageUser: {
                id: 4,
                user: 'Ricardo',
                hour: '',
                message: ''
            },
            user: 'Ricardo',
            id: 4,
            groupName: 'forumGroup',
            data: []
        }
    },
    computed: {
    },
    methods: {
        logOut() {
            this.$store.commit('login', false)
        },
        typeOfMessage(id) {
            return id === this.id ? 'ContentMessageUser' : 'ContentMessage'
        },
        sendMessage(user, message) {
            this.connection.send("SendMessage", user, message)
                .then(() => console.log('Message sent'))
                .catch(err => console.log('Error while sending message: ' + err));
        }
    },
    mounted() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://chat-penguin-api.onrender.com/chat")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.on("ReceiveMessage", (user, message) => {
            console.log(user + " says " + message);
        });

        this.connection.start()
            .then(() => {
                console.log('Connection started');
                if (this.hubConnection) {
                    this.hubConnection.invoke('AddToGroup', this.groupName);
                }
            }).catch(err => console.log('Error while starting connection: ' + err));
    },
}
</script>

<style scoped>
/* Estilos específicos de la vista AboutView */
.gridChat {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 80% 10%;
    /* Updated row sizes */
    height: 100vh;
    /* determina el alto de la pantalla para que se adapten las columnas */
}

/* Vista del navbar *****************/
.navbar {
    background-color: #222;
    text-align: end;
}

.navbar button {
    padding: 10px;
    margin: 10px;
}

/*********** Vista del los mensajes ***********/
.mainChat {
    overflow-y: auto;
    height: auto;
    /* Ajusta esto a la altura que desees */
    background: linear-gradient(to bottom, #222, #00000093);
}

.messages {
    display: flex;
    flex-direction: column;
    padding: 10px;
    word-wrap: break-word;
}

.mainChat .messages .fechaChat {
    color: #fff;
    text-align: center;
    margin: 10px;
}



.ContentMessageUser {
    /* Mensaje de agenos */
    background: #371965;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: none;
    align-self: flex-end;
    text-align: end;
    /* Alinea el texto a la derecha */
    margin-bottom: 10px;
    max-width: 250px;
    /* ajusta tamaño maximo */
    word-wrap: break-word;
    /* Que no se salga del contenedor*/
    box-shadow: 0 0 5px #00000093;
}

.ContentMessageUser .bodyMessage {
    color: #fff;
    font-size: 1em;
    margin: 5px 0;
}

.ContentMessage {
    /* Mensaje de Propios */
    background: #7355A4;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: none;
    align-self: flex-start;
    margin-bottom: 10px;
    max-width: 250px;
    /* ajusta tamaño maximo */
    word-wrap: break-word;
    /* Que no se salga del contenedor*/
    box-shadow: 0 0 5px #00000093;
}


/*********** Entrada del chat ***********/
.inputChat {
    padding: 0px 10px 10px 10px;
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
