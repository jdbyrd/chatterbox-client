
const app = {
  
  init: function() {
    this.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
    for(let i = 0; i < 3; i++) {
      app.renderMessage({
        username: 'Mel Brooks',
        text: 'I didn\'t get a harumph outa that guy.!',
        roomname: 'lobby'
      });
    }
    $('.submit').on('submit', this.handleSubmit);
    $('.username').on('click', this.handleUsernameClick);
  },
  send: function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: message,
      contentType: 'application/json',
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
      success: function (data) {
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
    const name = messageData.username.replace(' ', '');
    const $chat = $('<div></div>');
    $chat.addClass(name);
    $chat.appendTo($('#chats'));

    const $username = $('<div></div>');
    $username.addClass('username');
    $username.data({'username': name});
    $username.text(messageData.username + ':');
    $username.appendTo($chat);
    
    const $message = $('<div></div>');
    $message.text(messageData.text);
    $message.appendTo($chat);
  },
  renderRoom: function(roomName) {
    const $room = $('<div></div>');
    $room.text(roomName);
    $room.appendTo($('#roomSelect')); 
  },

  handleUsernameClick: function(event) {
    const username = $(this).data().username;
    $('.' + username).addClass('friend');
  },
  
  handleSubmit: function(message) {

  }
};