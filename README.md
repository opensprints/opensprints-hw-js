This project hosts the OpenSprints USB hub as a RESTful web service.

The hall effect sensors are monitored, LEDs are controlled, and a state machine
switches between two states:
- "waiting": magnets are ignored
- "counting": magnets switching the hall sensors on and off cause counters to
  increment.

A client can monitor the rollers' ticks and transition the state machine between
the two states by making HTTP requests.

Here is a [client library](https://github.com/zettajs/node-zetta-client) that is
designed to interact with the Siren hypermedia media type.

## Running the service:

0. Install the node dependencies.
0. Connect the OpenSprints USB device.
0. Run:

```
node index.js
```

0. Open http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337

This a JavaScript client running in the browser, making requests to hub running
as a RESTful API.

Click on the "start" button under "State Machine Device". The magnet sensor
should cause incrementing ticks for the associated "roller" until the State
Machine Device's "stop" button is pressed.
