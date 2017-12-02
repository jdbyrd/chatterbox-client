
const app = {
  init: function() {
    this.fetchedOnce = false;
    this.roomnames = {};
    this.friends = {};
    this.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
    $('form').on('submit', this.handleSubmit);
    this.fetchInterval();
    $('.spinner').hide();
  },
  fetchInterval: function(roomname) {
    console.log(roomname);
    window.clearInterval();
    window.setInterval(function() {
      app.fetch(roomname);
    }, 1000);    
  },
  send: function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: message,
      dataType: 'json',
      success: function (data) {
        $('.spinner').hide();
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
        order: '-createdAt',
        limit: 100
      },
      success: function (data) {
        
        const roomname = $('.dropdown option:selected').text();
        data.results.forEach(obj => {
          app.roomnames[obj.roomname] = obj.roomname;
        });
        if (!app.fetchedOnce) {
          for (let k in app.roomnames) {
            const $room = $('<option></option>');
            $room.text(app.roomnames[k]);
            $('.dropdown').append($room);
          }
          app.fetchedOnce = true;
        }
        
        app.clearMessages();
        data.results.forEach(messageData => app.renderMessage(messageData, roomname));
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
  renderMessage: function(messageData, roomname) {
    if (messageData.username && messageData.roomname === roomname) {
      const username = messageData.username.replace(' ', '');
      const $chat = $('<div></div>');
      $chat.addClass('chat');
      $chat.addClass(username);
      $chat.appendTo($('#chats'));

      const $username = $('<div></div>');
      $username.addClass('username');
      $username.data({'username': username});
      $username.text(messageData.username + ':');
      $username.on('click', this.handleUsernameClick);
      $username.appendTo($chat);
      
      const $message = $('<div></div>');
      $message.text(messageData.text);
      $message.appendTo($chat);
      
      if (this.friends[username]) {
        $('.' + username).addClass('friend');
      }
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
    $('.spinner').show();
    let input = $('.input').val();
    const roomname = $('.dropdown option:selected').text();
    const data = {
      username: window.location.search.slice(10),
      text: input,
      roomname: roomname
    };
    app.send(data);
    event.preventDefault();

  }
};