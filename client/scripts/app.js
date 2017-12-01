
const app = {
  
  init: function() {
    $('.username').on('click', function() {
      console.log('test');
      
    });
  },
  send: function(message) {
    $.ajax({
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
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
  fetch: function(message) {
    $.ajax({
      url: undefined,
      type: 'GET',
      data: message,
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
    $username.text(messageData.username + ':');
    $message.text(messageData.text);
    $username.appendTo($chat);
    $message.appendTo($chat);
    $chat.appendTo($('#chats'));
  },
  renderRoom: function(roomName) {
    const $room = $('<div></div>');
    $room.text(roomName);
    $room.appendTo($('#roomSelect')); 
  },
  addFriend: function() {
    console.log('test');
  }
};