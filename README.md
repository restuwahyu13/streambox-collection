## Grpc Message

[![Build Status](https://travis-ci.org/restuwahyu13/nodejs-midtrans-client.svg?branch=main)](https://travis-ci.org/restuwahyu13/nodejs-midtrans-client)
[![Coverage Status](https://coveralls.io/repos/github/restuwahyu13/nodejs-midtrans-client/badge.svg?branch=main)](https://coveralls.io/github/restuwahyu13/nodejs-midtrans-client?branch=main)

**grpc-message** is a utility to display the response of json or format string to the client, if you use `express.js` and `grpc` with `typescript`, because there is a little problem when you want to display the json response or format string to the client when you use `typescript`, because **res.json** and **res.send** cannot be executed inside the **protocol buffer** method, because the **res.json** and **res.send** method from `express.js` do not continue the void type but continue the response type from `express.js`.

### Noted

**Work in progress**
