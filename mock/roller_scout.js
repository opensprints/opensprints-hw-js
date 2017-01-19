var EventEmitter = require('events');
var Scout = require("zetta-scout");
var util = require("util");
var Roller = require("../roller_device");

var LED_PINS = [9, 10, 11, 12];
var SENSOR_PINS = [2, 3, 4, 5];


function random(low, high) {
  return Math.random() * (high - low) + low;
}

function swapState (state) {
  return !state;
}

// https://coligo.io/nodejs-event-emitter/
function MockButton(name) {
  /*
  EventEmitter.call(this);

  const that = this;
  var buttonState = false;

  setInterval(function () {
    buttonState = swapState(buttonState);
    if (buttonState) {
      console.log("mock button " + name + " down");
      that.emit("down");
    } else {
      console.log("mock button " + name + " up");
      that.emit("up");
    }
  }, random(250, 1500)); // TOOD: random amount of time
  */
}

util.inherits(MockButton, EventEmitter);

function MockLed(name) {
  this.name = name;
}

MockLed.prototype.constructor = MockLed;
MockLed.prototype.off = function() {
  console.log("mock LED " + this.name + " off");
};

MockLed.prototype.on = function() {
  console.log("mock LED " + this.name + " on");
};

var j5Scout = module.exports = function() {
  Scout.call(this);
  var self = this;
};
util.inherits(j5Scout, Scout);

j5Scout.prototype.init = function(next) {
  var self = this;

  var leds = LED_PINS.map(function(pin) {
    return MockLed(pin);
  });

  var sensors = SENSOR_PINS.map(function(pin) {
    return MockButton(pin);
  });

  for(var i = 0; i < SENSOR_PINS.length; i++) {
    var name = "roller_" + i;
    console.log(name);
    self.discover(Roller, leds[i], sensors[i], name);
  }

  if(next) {
    next();
  }
};
