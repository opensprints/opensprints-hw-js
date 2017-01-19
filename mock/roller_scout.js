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
var MockButton = function(name) {
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
};
util.inherits(MockButton, EventEmitter);

var MockLed = function(name) {
  var self = this;
  self.name = name;
}

MockLed.prototype.off = function() {
  var self = this;
  console.log("mock LED " + self.name + " off");
};

MockLed.prototype.on = function() {
  var self = this;
  console.log("mock LED " + self.name + " on");
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
