    <template>
        <div class="gridChat">
            <nav class="navbar">
                <button class="simpleButton" @click="logOut">LogOut</button>
            </nav>

            <main class="mainChat">
                <div v-if="messagesData.length != 0" class="messages">
                    <!--
                        <p class="fechaChat">{{ item.Date }}</p>
                    -->
                    <div :class="typeOfMessage(messageUser.user)" v-for="(item, index) in messagesData" :key="index">
                        <h3>{{ item.user }}</h3>
                        <small style="color: rgba(255, 255, 255, 0.763); margin-bottom: 10px;">{{ item.hour }}</small>
                        <p class="bodyMessage">{{ item.bodyMessage }}</p>
                    </div>
                </div>
                <div v-else style="text-align: center; padding: 50px;">No hay mensajes</div>
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
                    <input v-model="messageUser.bodyMessage" class="simpleInput" placeholder="Type a message..." />
                    <button @click="sendMessage()" class="simpleButton">
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
        props: {
            groupNameProp: String
        },
        data: function () {
            return {
                connection: null,
                messageUser: {
                    user: this.$store.state.logged.userName,
                    hour: new Date().toLocaleTimeString(),
                    bodyMessage: ''
                },
                messagesData: []  // Cambiado de 'messages' a 'data'
            }
        },
        methods: {
            logOut() {
                const newValues = {
                    userName: '',
                    status: false
                }
                this.$store.commit('login', newValues);
            },
            typeOfMessage(userName) {
                return this.messageUser.user === userName ? 'ContentMessageUser' : 'ContentMessage';
            },
            sendMessage() {
                this.connection.invoke("SendMessage", this.messageUser.user, this.messageUser.message, this.groupNameProp)
                .then(() => {    
                    console.log('Message sent: ', this.messageUser.bodyMessage);
                })
                .catch(err => console.log('Error while sending message: ' + err));
                //agrega el objeto messageUser al array de messagesData
                /*
                const data = {
                    user: this.messageUser.user,
                    hour: this.messageUser.hour,
                    bodyMessage: this.messageUser.bodyMessage
                }
                this.messagesData.push(data);
                this.messageUser.bodyMessage = "";
                */
            }
        },
        mounted() {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:5276/chat")
                .build();

            this.connection.start().then(() => {
                    console.log('Connection started');
                    if (this.connection) {
                        this.connection.invoke('AddToGroup', this.groupNameProp);
                        console.log('Connected to group', this.groupNameProp);
                    }
                }).catch(err => console.log('Error while starting connection: ' + err));

            this.connection.on("ReceiveMessage", (user, message) => {
                this.data.push(`${user}: ${message}`);  // Cambiado de 'messages' a 'data'
                const receivedMessage = `${user}: ${message}`;
                console.log(receivedMessage);
                /*const data = {
                    user: user,
                    hour: new Date().toLocaleTimeString(),
                    bodyMessage: message
                }
                this.messagesData.push(data);
                */
            });
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
