
const app = {
  init: function() {
    this.friends = {};
    this.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
    $('.submit').on('click', this.handleSubmit);
    window.setInterval(function() {
      app.fetch();
    }, 1000);    
    // app.fetch();
  },
  send: function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: message,
      dataType: 'json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: this.server,
      contentType: 'application/json',
      data: {
        order: '-createdAt'
      },
      success: function (data) {
        app.clearMessages();
        data.results.forEach(messageData => app.renderMessage(messageData));
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(messageData) {
    // TODO: sanitize input from server before rendering (here?)
    if (messageData.username) {
      const username = messageData.username.replace(' ', '');
      const $chat = $('<div></div>');
      $chat.addClass('chat');
      $chat.addClass(username);
      $chat.appendTo($('#chats'));

      const $username = $('<div></div>');
      $username.addClass('username');
      $username.data({'username': username});
      $username.text(messageData.username + ':');
      $username.appendTo($chat);
      
      const $message = $('<div></div>');
      $message.text(messageData.text);
      $message.appendTo($chat);
      
      if (this.friends[username]) {
        $('.' + username).addClass('friend');
      }

      $('.username').on('click', this.handleUsernameClick);
    }
  },
  renderRoom: function(roomName) {
    const $room = $('<div></div>');
    $room.text(roomName);
    $room.appendTo($('#roomSelect')); 
  },

  handleUsernameClick: function(event) {
    const username = $(this).data().username;
    if (app.friends[username]) {
      delete app.friends[username];
      $('.' + username).removeClass('friend');
    } else {
      app.friends[username] = username;
      $('.' + username).addClass('friend');
    }
  },
  
  handleSubmit: function() {
    let input = $('.input').val();
    const data = {
      username: window.location.search.slice(10),
      text: input,
      roomName: 'lobby'
    };
    app.send(data);
  }
};