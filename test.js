ngOnInit(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://chat-penguin-api.onrender.com/chat') // Reemplaza con la URL de tu backend
      .build();
        //https://localhost:7159/
    this.hubConnection.start().then(() => {
      console.log('Connection started');
      if (this.hubConnection) {
        this.hubConnection.invoke('AddToGroup', this.groupName);
      }
    }).catch(err => console.log('Error while starting connection: ' + err));
    
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
        this.messages.push(`${user}: ${message}`);
        const receivedMessage = `${user}: ${message}`;
        console.log(receivedMessage);
      });
}
  sendMessage(): void {
      const user = this.messageForm.value.user;
      const message = this.messageForm.value.message;
      if (this.hubConnection) {
        this.hubConnection.invoke('SendMessage', user, message, this.groupName);
      }
      this.messageForm.reset();
    }
  }