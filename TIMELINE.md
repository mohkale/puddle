# Timeline
The intended project timeline for this repository.

## Version 1.0 - RELEASED
This is when puddle should reach feature parity with the official transmission
[web-interface][transmission-web]. Puddle can be used as a drop in replacement
for it and I'll be looking for users to help test the system.

## Version 2.0 - PENDING
Is when we'll migrate from a *mostly* frontend application to an event driven backend
implementation. The plan is to switch from our current approach of having the frontend
associate with a running transmission daemon and then proxy requests to it through the
server, to instead maintaining the transmission state in the server directly. The
server takes care of keeping in sync with transmission and dispatching events to the
client through the [event-source interface][esi]. This should result in much less
communication between puddle, clients and transmission.

[esi]: https://developer.mozilla.org/en-US/docs/Web/API/EventSource

The process itself should be straightforward. By this point all the core components
should be finalized. We'll simply maintain a redux store on both the server and the
client, transmitting events in real time from the server to the client.

