'use strict';

const events = require('./events.js');

const io = require('socket.io')(3000); //curried function

const players = [];

io.on('connect', (socket) => {
  console.log('Connected!!!', socket.id);
  players.push(socket.id);

  socket.on(events.move, payload => {
    console.log(payload);

    let playerWhoMoved = players.indexOf(socket.id);
    if(playerWhoMoved === 0) {
      io.to(`${players[1]}`).emit(events.moved, 'It was MOVED.');
    }
    if(playerWhoMoved === 1) {
      io.to(`${players[0]}`).emit(events.moved, 'It was MOVED.');
    }
  });
});


