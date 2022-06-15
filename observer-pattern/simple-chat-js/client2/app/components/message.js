import Component from '@ember/component';

export default Component.extend({
    classNames: ['message'],
    classNameBindings: ['recived:recived:sended'],
    recived: false
});
