module.exports = function(server) {
  var Roller_0_Query = server.where({ type: "roller", name: "roller_0" });
  var Roller_1_Query = server.where({ type: "roller", name: "roller_1" });
  var Roller_2_Query = server.where({ type: "roller", name: "roller_2" });
  var Roller_3_Query = server.where({ type: "roller", name: "roller_3" });
  var StateMachineQuery = server.where({ type: "state_machine" });

  server.observe(
    [
      Roller_0_Query,
      Roller_1_Query,
      Roller_2_Query,
      Roller_3_Query,
      StateMachineQuery
    ],
    function(roller_0, roller_1, roller_2, roller_3, state_machine) {
      console.log(
        "State Machine came online: " +
        state_machine.name + ", " +
        roller_0.name + ", " +
        roller_1.name + ", " +
        roller_2.name + ", " +
        roller_3.name
      );

      state_machine.on("start", function() {
        roller_0.call("start-counting");
        roller_1.call("start-counting");
        roller_2.call("start-counting");
        roller_3.call("start-counting");
      });

      state_machine.on("stop", function() {
        roller_0.call("stop-counting");
        roller_1.call("stop-counting");
        roller_2.call("stop-counting");
        roller_3.call("stop-counting");
      });
    });
};
