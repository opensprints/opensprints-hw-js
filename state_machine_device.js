var Device = require("zetta").Device;
var util = require("util");

var StateMachineDevice = module.exports = function() {
  Device.call(this);
};

util.inherits(StateMachineDevice, Device);

StateMachineDevice.prototype.init = function(config) {

  // Set up the state machine
  config
    .type("state_machine")
    .state("waiting")
    .name("State Machine Device");

  config
    // Define the transitions allowed by the state machine
    .when("waiting", { allow: ["start"] })
    .when("running", { allow: ["stop"] })

    // Map the transitions to JavaScript methods
    .map("stop", this.stop)
    .map("start", this.start);
};

StateMachineDevice.prototype.stop = function(cb) {
  this.state = "waiting";
  cb();
};

StateMachineDevice.prototype.start = function(cb) {
  this.state = "running";
  cb();
};
