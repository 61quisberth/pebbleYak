**
 * Welcome to PebbleYak!
 *
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


var mock2 = {
    "messages": [
        {
            "messageID": 470170,
            "message": "Hello, VCU!",
            "latitude": 37.545202,
            "longitude": -77.448347,
            "time": "2014-03-09 11:00:01",
            "numberOfLikes": "5",
            "comments": "2",
            "posterID": "00000000-0000-0000-0000-000000000000",
            "handle": null,
            "hidePin": "1"
        },
        {
            "messageID": 470171,
            "message": "Long hallway.",
            "latitude": 37.545693,
            "longitude": -77.449538,
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

main.body('Welcome to PebbleYak');

main.on('click', 'up', function(e) {
  var card = new UI.Card();
  card.title('Scanning...');
  card.subtitle('');
  card.body('No messages in range.');
  card.show();
  var alerted = false;
      
  var myPos = function() {
    window.navigator.geolocation.getCurrentPosition(
      function(pos) {
        var coordinates = pos.coords;
        var myLat = coordinates.latitude;
        var myLong = coordinates.longitude;
        var mockLat = mock2.messages[1].latitude;
        var mockLong = mock2.messages[1].longitude;
        var mockLat2 = mock2.messages[0].latitude;
        var mockLong2 = mock2.messages[0].longitude;  
        console.log("Longitude " + myLong);
        console.log("Latitude " + myLat);      
//         console.log(alerted);
//         for(var i in mock.messages) {
//           var thisMock = mock.messages[i];
//           var mockLat = thisMock.latitude;
//           var mockLong = thisMock.longitude;
//           var distance = Math.sqrt(Math.pow(mockLat - myLat, 2) + Math.pow(mockLong - myLong, 2));
//           console.log(distance);
        var distance = Math.sqrt(Math.pow(mockLat - myLat, 2) + Math.pow(mockLong - myLong, 2));
        var distance2 = Math.sqrt(Math.pow(mockLat2 - myLat, 2) + Math.pow(mockLong2 - myLong, 2));
//         console.log("Hallway " + distance);
        console.log("Painting " + distance2);
        if(distance2 < 0.0005) {
          if(!alerted){
            Vibe.vibrate();
            alerted = true;
          }
          card.title("Message");
          card.subtitle('Likes: ' + mock2.messages[0].numberOfLikes);
          card.body(mock2.messages[0].message);
        }
//         else if (distance < 0.0004 && distance < distance2) {
//           if(!alerted){
//             Vibe.vibrate();
//             alerted = true;
//           }
//           card.title("Message");
//           card.subtitle('Likes: ' + mock2.messages[1].numberOfLikes);
//           card.body(mock2.messages[1].message);
//         }
        else {
          card.title("Scanning...");
          card.subtitle('');
          card.body("No messages in range.");
        }
        //}        
      }    
    );
  };
  setInterval(myPos, 2000);
  
  Accel.on('tap', function(e) {
    Accel.peek(function(e) {
      console.log(e.accel.y);
      if ( e.accel.y > 0){
          mock2.messages[0].numberOfLikes++;
          card.subtitle('Likes: ' + mock2.messages[0].numberOfLikes);
      }
      else if (e.accel.y < 0){
          mock2.messages[0].numbersOfLikes--;
          card.subtitle('Likes: ' + mock2.messages[0].numberOfLikes);
      }
    });
  });
  
  card.on("click", "up", function(e) {
    mock2.messages[1].numberOfLikes++;
    card.subtitle('Likes: ' + mock2.messages[1].numberOfLikes);
  });
  card.on("click", "down", function(e) {
    mock2.messages[0].numberOfLikes--;
    card.subtitle('Likes: ' + mock2.messages[0].numberOfLikes);
  });
});

main.on('click', 'select', function(e) {
//   var myFunction = function() {
//     console.log("Hello");
//   };
//   setInterval(myFunction, 1000);
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
    Accel.peek(function(e) {
      if ( e.accel.y < 0){
          mock2.messages[1].numberOfLikes--;
      }
      else if (e.accel.y > 0){
          mock2.messages[1].numbersOfLikes++;
      }
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

