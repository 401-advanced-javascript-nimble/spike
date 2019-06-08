'use strict';

const client = require('socket.io-client');
const prompt = require('prompt');

const socket = client.connect('http://localhost:3000');


socket.on('turn', (payload) => {
  console.log('It\'s youre turn');

  prompt.start();

  prompt.get(['move'], (err, data) => {
    socket.emit('move', {move: data.command});
    console.log('You selected', data.command);
  });
})