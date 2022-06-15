import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class NavBarComponent extends Component {
  @service chatService;

  get serverStatus() {
    if (this.chatService.isConnected) {
      return 'connected';
    }
    return 'disconnected';
  }
}
