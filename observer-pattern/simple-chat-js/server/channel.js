const uuid = require("uuid");

class Channel {
    constructor(name){
        this.subscribers = [];
        this.name = name;
        this.id = uuid.v4();
    }

    subscribe(subscriber){
        if(!this.subscribers.includes(subscriber)){
            this.subscribers.push(subscriber);
        }
    }

    unsubscribe(subscriber){
        const subscriberIdx = this.subscribers.indexOf(subscriber);
        if(subscriberIdx > -1){
            this.subscribers.splice(subscriberIdx, 1);
        }
    }

    newMessage(message, client) {
        message.id = uuid.v4();
        this.notifySubscribers(message, client);
    }

    notifySubscribers(message, client){
        this.subscribers.forEach((subscriber)=>{
            subscriber.send(`${client.id}:${message}:${client.id !== subscriber.id}`);
        });
    }

    info() {
        return `name: ${this.name}, count_users: ${this.subscribers.length}`;
    }
}

module.exports = {
    Channel,
};