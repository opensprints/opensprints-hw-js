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
