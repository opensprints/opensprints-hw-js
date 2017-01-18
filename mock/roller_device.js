var Device = require("zetta-device");
var util = require("util");

var RollerDevice = module.exports = function(j5Led, j5Input, name) {
  Device.call(this);
  this._input = j5Input;
  this.ticks = 0;
  this.name = name;
};
util.inherits(RollerDevice, Device);

RollerDevice.prototype.init = function(config) {
  var self = this;
  config
    .name(self.name)
    .monitor("ticks")
    .type("roller")
    .state("waiting")
    .when("waiting", { allow: ["start-counting"] })
    .when("counting", { allow: ["stop-counting"] })
    .map("start-counting", self.startCounting)
    .map("stop-counting", self.stopCounting);

  self._input.on("up", function() {
    console.log(self.name + " up");
  });

  self._input.on("down", function() {
    console.log(self.name + " down");
    if (self.state === "counting") {
      self.ticks++;
      console.log(self.name + " " + self.ticks + " ticks");
    }
  });
};

RollerDevice.prototype.startCounting = function(cb) {
  var self = this;
  self.state = "counting";
  self.turnGreen();
  self.ticks = 0;
  if (cb) {
    cb();
  }
};

RollerDevice.prototype.stopCounting = function(cb) {
  var self = this;
  self.state = "waiting";
  self.turnRed();
  if (cb) {
    cb();
  }
};

RollerDevice.prototype.turnGreen = function() {
  var self = this;
  console.log(self.name + " led on");
};

RollerDevice.prototype.turnRed = function() {
  var self = this;
  console.log(self.name + " led off");
};
