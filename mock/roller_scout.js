var EventEmitter = require('events');
var Scout = require("zetta-scout");
var util = require("util");
var Roller = require("./roller_device");

var LED_PINS = [9, 10, 11, 12];
var SENSOR_PINS = [2, 3, 4, 5];

// get a random string and emit the appropriate event every 3 seconds
// https://coligo.io/nodejs-event-emitter/
function MockButton() {
  EventEmitter.call(this)

  const that = this
  setInterval(function () {
    var randomStr = swapState()

    if (randomStr.indexOf('coligo') > -1) {
      that.emit('coligo')
    } else if (randomStr.indexOf('nodejs') > -1) {
      that.emit('nodejs')
    } else if (randomStr.indexOf('javascript') > -1) {
      that.emit('javascript')
    }
  }, 3000) // TOOD: random amount of time
};

// conventionally, NodeJs uses util.inherits() for inheritance
util.inherits(MockButton, EventEmitter)

// simple function to randomly select a string from an array
function swapState () {
  const stringsArr = ['nodejs', 'coligo', 'javascript', 'EventEmitters',
                      'random text', 'testing events in node', 'MockButton and events at coligo']
  return stringsArr[Math.floor(Math.random() * stringsArr.length)]
}

module.exports = MockButton

var j5Scout = module.exports = function() {
  Scout.call(this);
  var self = this;
};
util.inherits(j5Scout, Scout);

j5Scout.prototype.init = function(next) {
  var self = this;
  board.on("ready", function() {

    var leds = LED_PINS.map(function(pin) {
      return false;
    });

    var sensors = SENSOR_PINS.map(function(pin) {
      return false;
    });

    for(var i = 0; i < SENSOR_PINS.length; i++) {
      var name = "roller_" + i;
      console.log(name);
      self.discover(Roller, leds[i], sensors[i], name);
    }

    if(next) {
      next();
    }
  });
};
