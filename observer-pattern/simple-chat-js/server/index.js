const WebSocket = require("ws");
const express = require("express");
const uuid = require("uuid");
const { Channel }  = require("./channel");

const channels = {};
const channel = new Channel("Main");

const app = express();
const server = app.listen(3000, ()=>{
    console.log("Express Started!!!");
    console.log(`channel_info: ${channel.info()}`)
});

function onError(ws, error) {
    console.log(`onError -> ${ws} : ${error}`);
}

function onMessage(ws, message) {
    console.log(`onMessage -> ${ws.id}:${message}`);
    channel.newMessage(message, ws);
}

function onClose(ws, req) {
    console.log('onClose');
    channel.unsubscribe(ws);
    console.log(`channel_info: ${channel.info()}`)
}

function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    ws.on('close', data => onClose(ws, data));
    ws.id = uuid.v4();
    console.log('onConnection');
    channel.subscribe(ws);
    console.log(`channel_info: ${channel.info()}`)
}

const wss = new WebSocket.Server({ server });
wss.on('connection', onConnection);