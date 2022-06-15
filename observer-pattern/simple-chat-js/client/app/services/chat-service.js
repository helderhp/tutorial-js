import Service from '@ember/service';
import { service } from '@ember/service';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class ChatServiceService extends Service {
  @tracked isConnected = false;
  @service('websockets') websockets;
  @service store;
  socketRef = null;

  @tracked messages = A([]);

  init() {
    super.init(...arguments);
    const socket = this.websockets.socketFor('ws://localhost:3000');

    socket.on('open', this.openHandler, this);
    socket.on('close', this.closeHandler, this);
    socket.on('message', this.messageHandler, this);

    this.set('socketRef', socket);
  }

  openHandler() {
    console.log('openHandler');
    this.set('isConnected', true);
  }

  closeHandler() {
    console.log('closeHandler');
    this.set('isConnected', false);
    const socket = this.websockets.socketFor('ws://localhost:3000');
    later(
      this,
      () => {
        socket.reconnect();
      },
      5000
    );
  }

  messageHandler(messageEvent) {
    console.log(`messageHandler: ${messageEvent.data}`);
    const dataArray = messageEvent.data.split(':');
    let message = this.store.createRecord('chat-message');
    message.userName = dataArray[0];
    message.message = dataArray[1];
    message.received = dataArray[2] === "true";
    this.messages.pushObject(message);
  }

  sendMessage(message) {
    this.socketRef.send(message);
  }
}
