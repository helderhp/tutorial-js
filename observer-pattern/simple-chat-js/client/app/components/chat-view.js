import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChatViewComponent extends Component {
  @service chatService;
  @tracked newMessage = '';

  @action sendMessage() {
    const message = this.newMessage.trim();
    this.chatService.sendMessage(message);
    this.newMessage = '';
  }
}
