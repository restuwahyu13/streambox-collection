## GRPC Box

[![Build Status](https://travis-ci.org/restuwahyu13/grpc-message.svg?branch=main)](https://travis-ci.org/restuwahyu13/grpc-message)

**grpc-box** is a utility to display a json response or a format string to a client for `express.js`, build using `eventemitter3`.

### Install Package

```sh
npm install grpc-box -S or yarn grpc-box -S
```

### API Reference

+ #### grpcBox.json(incomingMessage: Response, options: object): void

  **grpcBox.json** for display a json response to a client

+ #### grpcBox.string(incomingMessage: Response, message: string, statusCode?: number, delay?: number): void

  **grpcBox.string** for display a string response to a client


### Example Usage CommonJS

```typescript
const { grpcClient } = require('../../middlewares/middleware.grpc')
const { StudentId, StudentResponse } require('../../../typedefs/mahasiswa_pb')
const grpcBox = require('grpc-box')

exports.resultStudent = (req, res, next) => {

  const client = grpcClient()
  const params = new StudentId()
  params.setId(req.params.id)

  client.resultStudent(params, (error, response) => {
	if (error) {
	grpcBox.object({
	  method: req.method,
	  statusCode: response.getStatuscode(),
	  message: response.getMessage()
	})
	.then(response => res.json(response))
	}

	if (response !== undefined && response.getId() !== '') {
		grpcBox.object({
			method: req.method,
			statusCode: response.getStatuscode(),
			message: response.getMessage(),
			data: {
			 id: response.getId(),
			 name: response.getName(),
			 npm: response.getNpm(),
			 fak: response.getFak(),
			 bid: response.getBid(),
			 createdAt: response.getCreatedAt(),
			 updatedAt: response.getUpdatedAt()
		  }
		})
		.then(response => res.json(response))
	} else {
		grpcBox.object({
		 method: req.method,
		 statusCode: response.getStatuscode(),
		 message: response.getMessage()
		})
		.then(response => res.json(response))
	}
  })
}
```

### Example Usage ES6

```typescript
import { Request, Response } from 'express'
import { ServiceError } from '@grpc/grpc-js'
import { grpcClient } from '../../middlewares/middleware.grpc'
import { StudentId, StudentResponse } from '../../../typedefs/mahasiswa_pb'
import * as grpcBox from 'grpc-box'

export const resultStudent = (req, res, next) => {

  const client = grpcClient()
  const params = new StudentId()
  params.setId(req.params.id)

  client.resultStudent(params, (error, response) => {
	if (error) {
	grpcBox.object({
	  method: req.method,
	  statusCode: response.getStatuscode(),
	  message: response.getMessage()
	})
	.then(response => res.json(response))
	}

	if (response !== undefined && response.getId() !== '') {
		grpcBox.object({
			method: req.method,
			statusCode: response.getStatuscode(),
			message: response.getMessage(),
			data: {
			 id: response.getId(),
			 name: response.getName(),
			 npm: response.getNpm(),
			 fak: response.getFak(),
			 bid: response.getBid(),
			 createdAt: response.getCreatedAt(),
			 updatedAt: response.getUpdatedAt()
		  }
		})
		.then(response => res.json(response))
	} else {
		grpcBox.object({
		 method: req.method,
		 statusCode: response.getStatuscode(),
		 message: response.getMessage()
		})
		.then(response => res.json(response))
	}
  })
}
```

### Testing Application

- Testing Via Local

  ```sh
  npm run test or make test
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

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.