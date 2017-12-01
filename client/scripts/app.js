// const message = {
//   username: 'spencer&james!',
//   text: 'we\'re awesome',
//   roomname: ''
// };

const app = {
  
  init: function() {
    
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
  }
};
