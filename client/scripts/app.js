
var app = {
  init: function() {
    app.fetch();
    setInterval(app.fetch, 10000);
  },

  allObject: [],

  myFriends: {},

  server: 'http://127.0.0.1:3000',
// 'https://api.parse.com/1/classes/chatterbox'
// http://127.0.0.1:3000
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        console.log(data);
        for (var i = 0; i < data.results.length; i++) {
          app.allObject.push(data.results[i]);
          var array = data.results;
          app.addMessage(array[i]);
        }
        app.populateRooms(data.results);

      },
      error: function (data) {
        console.error('chatterbox: Failed to get message');
      }
    });
  },



  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        app.fetch();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  addMessage: function(message) {
    var element = '<div class="message">' + '<a href="#"><span class = userID id='+message.username+'>'+ _.escape(message.username) +'</span></a>: <br />' + _.escape(message.text) + '</div>';
    // if (message.username === 'Mr.Batman' || message.username === 'bob') {
    //   return;
    // } else {
      $('#chats').append(element);
    // }


  },

  rooms: {},

  populateRooms: function(results) {
    if (results) {
      results.forEach(function(data) {
        var roomname = data.roomname;
        if (roomname && !app.rooms[roomname]) {
          app.addRoom(roomname);
          app.rooms[roomname] = true;
        }
      })
    }
  },

  addRoom: function(name) {
    var room = "<option value =" + name + ">" + name + "</option>"
    $('#roomSelect').append(room);
  },

  addFriend: function(friend) {
    if (!app.myFriends[friend]) {
      $('.friends').append(friend);
    }
    app.myFriends[friend] = friend;
  },

  handleSubmit: function(evt) {
    evt.preventDefault();
    var element = {
      username: null,
      text: null,
      roomname: null
    };
    var roomSel = document.getElementById("roomSelect");
    var selectedValue = roomSel.options[roomSel.selectedIndex].value;
    element.roomname = selectedValue;

    element.text = document.getElementById("user-input").value;

    var theURL = document.URL;
    element.username = theURL.substr(theURL.indexOf("=") + 1)

    app.send(element);
    app.addMessage(element);
  }
}


$(document).ready(function() {
  $('#name-button').on('click', app.handleSubmit);


  $('#room-button').on('click', function() {
    var name = document.getElementById("room-name").value;
    app.addRoom(name);
  });

  $(this).on('click', '.userID', function(event) {
    event.preventDefault();
    var theUsersName = $(this).html();
    app.addFriend("<div class='friendsList'>" + theUsersName + "</div>");
  });

  $("#roomSelect").change(function(){
    var roomSel = document.getElementById("roomSelect");
    var selectedValue = roomSel.options[roomSel.selectedIndex].value;
    $('.message').remove();
    var filtered = _.filter(app.allObject, function(item) {
      return item.roomname === selectedValue;
    });
    _.each(filtered, function(item) {
      app.addMessage(item);
    })

  });
});

app.init();















