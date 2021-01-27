## Grpc Box

[![Build Status](https://travis-ci.org/restuwahyu13/grpc-box.svg?branch=main)](https://travis-ci.org/restuwahyu13/grpc-box)

`grpc-box` is a lightweight utility for displaying objects, arrays, strings, and number formats to clients using stream module, then the response that will be returned later will be a data buffer, `grpc-box` can also stream large or small data, check out this article for more information on module [stream](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93), this module is not only for use with grpc, but you can also use this module without using grpc.

### Install Package

```sh
npm install grpc-box -S or yarn grpc-box -S
```

### API Reference

- #### grpcBox.json(incomingMessage: Response, options: object): void

  **grpcBox.json** for display a json response to a client

- #### grpcBox.string(incomingMessage: Response, message: string, statusCode?: number, delay?: number): void

  **grpcBox.string** for display a string response to a client

### Example Usage CommonJS

```typescript
const grpcBox = require('grpc-box')
const { ServiceError } require('grpc')
const { User, UserId } = require('../typedefs/users_pb')
const { client } = require('./client')

const params = new UserId()
params.setId(2)

client.getUser(params, (error: ServiceError, response: User) => {
	if (error) console.error(error)
	grpcBox
		.object(response.toObject())
		.then((res) => console.log(grpcBox.toObject(res)))
		.catch(console.log)
})
```

### Example Usage ES6

```typescript
import * as grpcBox from 'grpc-box'
import { ServiceError } from 'grpc'
import { User, UserId } from '../typedefs/users_pb'
import { client } from './client'

const params = new UserId()
params.setId(2)

client.getUser(params, (error: ServiceError, response: User) => {
	if (error) console.error(error)
	grpcBox
		.object(response.toObject())
		.then((res) => console.log(grpcBox.toObject(res)))
		.catch(console.log)
})
```

### Testing Application

- Testing Via Local

  ```sh
  npm run test or make test
  ```

- Testing Via Local And Build

  ```sh
  make build
  ```

- Testing Via Docker

  ```sh
  docker build -t grpc-message or make dkb tag=grpc-message
  ```

### Demo App

- **[Student App Grpc Typescript](https://github.com/restuwahyu13/express-grpc-rest-api)**

### License

The MIT License (MIT)

Copyright (c) 2020 Restu Wahyu Saputra

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
(the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
