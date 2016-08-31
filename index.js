var zetta = require("zetta");
var RollerScout = require("./roller_scout");
var StateMachine = require("./state_machine_device");
var app = require("./app");

zetta()
  .name("Race Monitor")
  .use(RollerScout)
  .use(StateMachine)
  .use(app)
  .listen(1337);
