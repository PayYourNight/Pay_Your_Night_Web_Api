'use strict';

// Create the chat configuration
module.exports = function (io, socket) {
  console.log("checkin");

  io.emit('checkinConnect', {
    type: 'status',
    text: 'O Servidor está preparado para checkin',
    created: Date.now(),
    profileImageURL: socket.request.user.profileImageURL,
    username: socket.request.user.username
  });

  socket.on('checkin', function () {
    console.log('checkin registrado');
    io.emit('checkin', {
      type: 'status',
      text: 'check-in realizado!',
      created: Date.now(),
      username: socket.request.user.username
    });
  });

  //socket.on('checkinConnect', function (data) {
    //if (data) {
    //  if (data.user) {
    //    console.log('checkinConnect for user ' + data.user.id);
    //    users[data.user.id] = {
    //      role: data.role,
    //      socket: socket
    //    };
    //  }
    //}
    // io.emit('checkin', {
    //   type: 'status',
    //   text: 'check-in realizado!',
    //   created: Date.now(),
    //   username: socket.request.user.username
    // });
  //});

  //socket.on('checkin', function (data) {
  //  console.log('checkin registrado');

  //  users[data.userTo]
  //  .socket
  //  .emit('checkin', {
  //    type: 'checkin',
  //    text: 'check-in realizado',
  //    created: Date.now(),
  //    details: {
  //      estabelecimento: {
  //        id: data.estabelecimento.id,
  //        nome: data.estabelecimento.nome
  //      }
  //    }
  //    // username: socket.request.user.username
  //    });

    // io.emit('checkin', {
    //   type: 'status',
    //   text: 'check-in realizado!',
    //   created: Date.now(),
    //   username: socket.request.user.username
    // });

};
