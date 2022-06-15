import Model, { attr } from '@ember-data/model';

export default class ChatMessageModel extends Model {
    @attr userName;
    @attr message;
    @attr received;
}
