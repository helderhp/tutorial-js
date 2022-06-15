class Subscriber {
    constructor(id){
        this.id = id;
    }

    update(message){
        console.log(`\tSubscribe-${this.id} was notified with a message: "${message}"`);
    }
}

class Publisher {
    constructor(){
        console.log("Start Publisher...");
        this.subscribers = [];
        this.message = "";
    }

    subscribe(subscriber){
        console.log(`Subscribe id: ${subscriber.id}`);
        if(!this.subscribers.includes(subscriber)){
            this.subscribers.push(subscriber);
        }
    }

    unsubscribe(subscriber){
        console.log(`Unsubscribe id: ${subscriber.id}`);
        const subscriberIdx = this.subscribers.indexOf(subscriber);
        if(subscriberIdx > -1){
            this.subscribers.splice(subscriberIdx, 1);
        }
    }

    setMessage(message) {
        console.log(`Set message: "${message}"`)
        this.message = message;
        this.notifySubscribers();
    }

    notifySubscribers(){
        console.log("Notify subscribers...")
        this.subscribers.forEach((subscriber)=>{
            subscriber.update(this.message);
        });
    }
}

(()=>{
    let publisher = new Publisher();
    let subscriber1 = new Subscriber(1);
    let subscriber2 = new Subscriber(2);
    let subscriber3 = new Subscriber(3);
    let subscriber4 = new Subscriber(4);
    publisher.setMessage("Primeira mensagem!!!");
    publisher.subscribe(subscriber1);
    publisher.subscribe(subscriber2);
    publisher.subscribe(subscriber3);
    publisher.subscribe(subscriber4);
    publisher.setMessage("Segunda mensagem!!!");
    publisher.unsubscribe(subscriber1);
    publisher.unsubscribe(subscriber2);
    publisher.setMessage("Terceira mensagem!!!");
})();

