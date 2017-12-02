
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
    const $chat = $('<div></div>');
    const $username = $('<div></div>');
    const $message = $('<div></div>');
    $username.addClass('username');
    let name = messageData.username.replace(' ', '');
    $chat.addClass(name);
    $username.data({'username': name});
    $username.text(messageData.username + ':');
    $message.text(messageData.text);
    $username.appendTo($chat);
    $message.appendTo($chat);
    $chat.appendTo($('#chats'));
    //ask why this works here and not in init
    // $('.username').on('click', this.handleUsernameClick);
  },
  renderRoom: function(roomName) {
    const $room = $('<div></div>');
    $room.text(roomName);
    $room.appendTo($('#roomSelect')); 
  },

  handleUsernameClick: function(event) {
    const username = $(this).data().username;
    // console.log($(this).parent().children());
    $('.' + username).addClass('friend');
    
  },
  
  handleSubmit: function() {
  }
};