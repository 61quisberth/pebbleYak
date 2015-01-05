/**
 * Welcome to pebbleYak: A YikYak clone for the Pebble SmartWatch!
 *
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

Accel.init(); // initialize pebble 

var accelConfig = {rate:100, samples:25, subscribe:false};

Accel.config(accelConfig);

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'PebbleYak',
  //body: 'Press any button.'
});


var mock = {
    "messages": [
        {
            "messageID": 470170,
            "message": "Hello, Ramhacks.",
            "latitude": 33.77,
            "longitude": -84.39,
            "time": "2014-03-09 11:00:01",
            "numberOfLikes": "10374",
            "comments": "2",
            "posterID": "00000000-0000-0000-0000-000000000000",
            "handle": null,
            "hidePin": "1"
        },
        {
            "messageID": 470171,
            "message": "This is a the far corner.",
            "latitude": 37.54526422060845,
            "longitude": -77.4484609381127,
            "time": "2014-05-09 11:00:01",
            "numberOfLikes": "9",
            "comments": "5",
            "posterID": "00000000-0000-0000-0000-000000000000",
            "handle": null,
            "hidePin": "1"
        }
    ]
};

main.show();

var message = mock.messages[0].message;
main.body(message);

main.on('click', 'up', function(e) {
  var card = new UI.Card();
  card.title('You');
  card.subtitle('Have');
  card.body('Up-Voted');
  card.show();
  var alerted = false;
      
  var myPos = function() {
    window.navigator.geolocation.getCurrentPosition(
      function(pos) {
        var coordinates = pos.coords;
        var myLat = coordinates.latitude;
        var myLong = coordinates.longitude;
        var mockLat = mock.messages[1].latitude;
        var mockLong = mock.messages[1].longitude;
        console.log("Longitude " + myLong);
        console.log("Latitude " + myLat);      
        console.log(alerted);
//         for(var i in mock.messages) {
//           var thisMock = mock.messages[i];
//           var mockLat = thisMock.latitude;
//           var mockLong = thisMock.longitude;
//           var distance = Math.sqrt(Math.pow(mockLat - myLat, 2) + Math.pow(mockLong - myLong, 2));
//           console.log(distance);
        var distance = Math.sqrt(Math.pow(mockLat - myLat, 2) + Math.pow(mockLong - myLong, 2));
        console.log(distance);
        if(distance < 0.0005) {
          if(!alerted){
            Vibe.vibrate();
            alerted = true;
          }
          card.subtitle('Likes: ' + mock.messages[1].numberOfLikes);
          card.body(mock.messages[1].message);
        }
        else {
          card.subtitle('');
          card.body("You're too far!");
        }
        //}        
      }    
    );
  };
  setInterval(myPos, 5000);
  
  card.on("click", "up", function(e) {
    mock.messages[1].numberOfLikes++;
    card.subtitle('Likes: ' + mock.messages[1].numberOfLikes);
  });
  card.on("click", "down", function(e) {
    mock.messages[1].numberOfLikes--;
    card.subtitle('Likes: ' + mock.messages[1].numberOfLikes);
  });
});

main.on('click', 'select', function(e) {
  var myFunction = function() {
    console.log("Hello");
  };
  setInterval(myFunction, 1000);
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});


main.on('accelTap', function(e) {
   var card = new UI.Card();
  window.navigator.geolocation.getCurrentPosition(
    function(pos) {
      var coordinates = pos.coords;
      console.log("Longitude " + coordinates.longitude);
      console.log("Latitude " + coordinates.latitude);
      //card.body("Latitude " + coordinates.latitude);
    }  
  );
  card.title('A Card');
  card.subtitle('You have shaken');
  //card.body('shake shake shake ');
  card.show();
  Accel.on('tap', function(e) {
//     if(e.axis == "y" && e.direction > 0) {
//       mock.messages[1].numberOfLikes++;
//       card.body('Likes: ' + mock.messages[1].numberOfLikes);
//     }
//     else if(e.axis == "y" && e.direction < 0) {
//       mock.messages[1].numberOfLikes--;
//       card.body('Likes: ' + mock.messages[1].numberOfLikes);
//     }
    Accel.peek(function(e) {
      console.log("Y: " + e.accel.y);
    });
  });
//     Accel.peek(function(e) {
//   console.log('Current acceleration on axis are: X=' + e.accel.x + ' Y=' + e.accel.y + ' Z=' + e.accel.z);
// });
  
});

main.on('click', 'down', function(e) {
   var card = new UI.Card();
  card.title('You');
  card.subtitle('Have');
  card.body('Down-Voted');
  card.show();
});
