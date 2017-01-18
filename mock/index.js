var zetta = require("zetta");
var RollerScout = require("./roller_scout");
var StateMachine = require("../state_machine_device");
var app = require("../app");

var MockHw = module.exports = function(port) {
  var p = (typeof port !== "undefined") ?  port : 1337;
  this._port = p;
  this._zetta = zetta()
    .name("Race Monitor")
    .use(RollerScout)
    .use(StateMachine)
    .use(app);
};

MockHw.prototype.run = function() {
  var self = this;
  self._zetta.listen(this._port);
};
