'use strict';

const events = require('./events.js');

const io = require('socket.io')(3000); //curried function

io.on('connect', (socket) => {
  console.log('Connected!!!');

  socket.on(events.move, payload => {
    console.log(payload);
    io.emit(events.moved, 'It was MOVED.');
  });
});


