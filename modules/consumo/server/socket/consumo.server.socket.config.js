'use strict';

// Create the chat configuration
module.exports = function (io, socket) {
  socket.on('consumo', function () {
    console.log('consumo registrado');
    io.emit('consumo', {
      type: 'status',
      text: 'consumo incluido!',
      created: Date.now(),
      username: socket.request.user.username
    });
  });
};
