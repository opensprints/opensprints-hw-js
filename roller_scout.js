var Scout = require("zetta-scout");
var util = require("util");
var j5 = require("johnny-five");
var Roller = require("./roller_device");

var LED_PINS = [9, 10, 11, 12];
var SENSOR_PINS = [2, 3, 4, 5];

var j5Scout = module.exports = function() {
  Scout.call(this);
  var self = this;
};
util.inherits(j5Scout, Scout);

j5Scout.prototype.init = function(next) {
  var board = new j5.Board({repl: false});
  var self = this;
  board.on("ready", function() {

    var leds = LED_PINS.map(function(pin) {
      return j5.Led({pin: pin});
    });

    var sensors = SENSOR_PINS.map(function(pin) {
      return j5.Button({
        pin: pin,
        isPullup: true
      });
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
