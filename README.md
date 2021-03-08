# StreamBox Collection

[![Build Status](https://travis-ci.org/restuwahyu13/streambox-collection.svg?branch=main)](https://travis-ci.org/restuwahyu13/streambox-collection)
[![Coverage Status](https://coveralls.io/repos/github/restuwahyu13/streambox-collection/badge.svg?branch=main)](https://coveralls.io/github/restuwahyu13/streambox-collection?branch=main)
[![npm version](https://badge.fury.io/js/streambox-collection.svg)](https://badge.fury.io/js/streambox-collection)
![node-current](https://img.shields.io/node/v/streambox-collection?style=flat-square)
![npm](https://img.shields.io/npm/dm/streambox-collection)
![npm bundle size](https://img.shields.io/bundlephobia/min/streambox-collection)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/streambox-collection)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/restuwahyu13/streambox-collection)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/restuwahyu13/streambox-collection/blob/main/CONTRIBUTING.md)

`streambox-collection` is a lightweight utility as a wrapper for displaying objects, arrays, strings, and number formats to
clients using data streams, so data flow responses will be returned in buffer form, `streambox-collection` can also support large
or small data streams, see this article for more information on [streams](https://bit.ly/39rkTzb).

- [Installation Package](#installation-package)
- [API Reference](#api-reference)
  - [StreamBox Array](#streambox-array-data-recordstring-any--string--number-delay-number--promise)
  - [StreamBox Object](#streambox-objectdata-recordstring-any-delay-number-promise)
  - [StreamBox String](#streambox-stringdata-string-delay-number-promise)
  - [StreamBox Number](#streambox-numberdata-number-delay-number-promise)
  - [StreamBox Parser](#streambox-parserdata-buffer-any)
- [Example Usage](#example-usage)
- [Testing](#testing)
- [Bugs](#bugs)
- [Contributing](#contributing)
- [License](#license)

## Installation Package

#### With NPM
  ```sh
npm install streambox-collection -S or yarn add streambox-collection -S
  ```
#### With CDN
  follow this **[link](https://www.jsdelivr.com/package/npm/streambox-collection)**

## API Reference

#### StreamBox Array( data: Record<string, any>[] | string[] | number[], delay?: number ): Promise<Buffer>

- **streamBox.Array - Method** - create a data stream for the array and display it to the client
- **streamBox.Array.data - Params** - set stream data for consumption to the client
- **streamBox.Array.delay - Params** - set delay before returning data to the client

#### StreamBox Object( data: Record<string, any>, delay?: number ): Promise<Buffer>

- **streamBox.object - Method** - create a data stream for the object and display it to the client
- **streamBox.object.data - Params** - set stream data for consumption to the client
- **streamBox.object.delay - Params** - set delay before returning data to the client

#### StreamBox String( data: string, delay?: number ): Promise<Buffer>

- **streamBox.string - Method** - create a data stream for the string and display it to the client
- **streamBox.string.data - Params** - set stream data for consumption to the client
- **streamBox.string.delay - Params** - set delay before returning data to the client

#### StreamBox Number( data: number, delay?: number ): Promise<Buffer>

- **streamBox.number - Method** - create a data stream for the number and display it to the client
- **streamBox.number.data - Params** - set stream data for consumption to the client
- **streamBox.number.delay - Params** - set delay before returning data to the client

#### StreamBox Parser( data: Buffer ): any

- **streamBox.toArray - Method** - parse the buffer data to an array and pass its value to the client
- **streamBox.toObject - Method** - parse the buffer data to an object and pass its value to the client
- **streamBox.toString - Method** - parse the buffer data to an string and pass its value to the client
- **streamBox.toNumber - Method** - parse the buffer data to an number and pass its value to the client

#### StreamBox Callback( parameter: Promise, callback: any ): void

- **streamBox.toCallback - Method** - convert promise function to callback function

### Example Usage

- #### Example Usage Using CommonJS With Grpc

  ```javascript
  const streamBox = require('streambox-collection')
  const { Empty } = require('../typedefs/users_pb')
  const { client } = require('./client')

  client.getUsers(Empty, (error, response) => {
  	if (error) console.error(error)
  	streamBox
  		.array(response.toObject())
  		.then((res) => console.log(streamBox.toArray(res)))
  		.catch(console.log)
  })
  ```

- #### Example Usage Using ES6 With Grpc

  ```typescript
  import * as streamBox from 'streambox-collection'
  import { Empty } from '../typedefs/users_pb'
  import { client } from './client'

  client.getUsers(Empty, (error, response) => {
  	if (error) console.error(error)
  	streamBox
  		.array(response.toObject())
  		.then((res) => console.log(streamBox.toArray(res)))
  		.catch(console.log)
  })
  ```

- #### Example Usage Using ES6 With Grpc And Typescript

  ```typescript
  import * as streamBox from 'streambox-collection'
  import { ServiceError } from 'grpc'
  import { UserList, Empty } from '../typedefs/users_pb'
  import { client } from './client'

  client.getUsers(Empty, (error: ServiceError, response: UserList) => {
  	if (error) console.error(error)
  	streamBox
  		.array(response.toObject())
  		.then((res: Buffer) => console.log(streamBox.toArray(res)))
  		.catch(console.log)
  })
  ```

- #### Example Usage Using CommonJS With Express.js

  ```javascript
  const express = require('express')
  const axios = require('axios')
  const streamBox = require('streambox-collection')

  const app = express()

  app.get('/fetch', async (req, res) => {
  	const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  	streamBox.array(data).then((response) => res.json(streamBox.toArray(response)))
  })
  ```

- #### Example Usage Using ES6 With Express.js

  ```typescript
  import express from 'express'
  import axios from 'axios'
  import * as streamBox from 'streambox-collection'

  const app = express()

  app.get('/fetch', async (req, res) => {
  	const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  	streamBox.array(data).then((response) => res.json(streamBox.toArray(response)))
  })
  ```

- #### Example Usage Using ES6 With Express.js And Typescript

  ```typescript
  import express, { Express, Request, Response } from 'express'
  import axios from 'axios'
  import * as streamBox from 'streambox-collection'

  const app = express() as Express

  app.get('/fetch', async (req: Request, res: Response) => {
  	const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  	streamBox.array(data).then((response: Buffer) => res.json(streamBox.toArray(response)))
  })
  ```

- #### Example Usage Custom Stream Using CommonJS With Express.js

  ```javascript
  // util.stream.js
  const streamBox = require('streambox-collection')

  exports.streamBox = (handler, statusCode, data) => {
  	streamBox.object({ ...data }).then((res) => {
  		return handler.status(statusCode).json(streamBox.toObject(res))
  	})
  }

  // app.js
  const express = require('express')
  const axios = require('axios')
  const { streamBox } = require('../utils/util.stream')

  const app = express()

  app.get('/fetch', async (req, res) => {
  	const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  		streamBox(res, 200, {
        method: req.method,
        statusCode: res.statusCode,
        users: data
	   })
  })
  ```

- #### Example Usage Custom Stream Using ES6 With Express.js

  ```javascript
  // util.stream.js
  import * as streamBoxCollection from 'streambox-collection'

  export const streamBox = (handler, statusCode, data) => {
  	streamBoxCollection.object({ ...data }).then((res) => {
  		return handler.status(statusCode).json(streamBoxCollection.toObject(res))
  	})
  }

  // app.js
  import express from 'express'
  import axios from 'axios'
  import { streamBox } from '../utils/util.stream'

  const app = express()

  app.get('/fetch', async (req, res) => {
  	const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  		streamBox(res, 200, {
        method: req.method,
        statusCode: res.statusCode,
        users: data
	  })
  })
  ```

- #### Example Usage Custom Stream Using ES6 With Express.js And Typescript

  ```typescript
  // util.stream.ts
  import { Response } from 'express'
  import * as streamBoxCollection from 'streambox-collection'

  export const streamBox = (handler: Response, statusCode: number, data: Record<string, any>): void => {
  	streamBoxCollection.object({ ...data }).then((res: Buffer) => {
  		return handler.status(statusCode).json(streamBoxCollection.toObject(res))
  	})
  }

  // app.ts
  import express, { Request, Response } from 'express'
  import axios from 'axios'
  import { streamBox } from '../utils/util.stream'

  const app = express() as Express

  app.get('/fetch', async (req: Request, res: Response) => {
  	const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  		streamBox(res, 200, {
        method: req.method,
        statusCode: res.statusCode,
        users: data
	  })
  })
  ```

- #### Example Usage With React.js

  ```javascript
  import React, { useState, useEffect } from 'react'
  import * as streamBox from 'streambox-collection'
  import axios from 'axios'

  function App() {
    const [values, setValues] = useState({
      loading: true,
      users: []
    })

    useEffect(() => {
      if (values.loading) {
        fetchData()
      }
    }, [])

    function fetchData() {
      streamBox.toCallback(axios.get('https://jsonplaceholder.typicode.com/users'), (err, res) => {
        if (err) console.log(err)
        streamBox
          .array(res.data)
          .then((data) => setValues({ ...values, loading: false, users: streamBox.toArray(data) }))
          .catch(console.error)
      })
    }

    return (
      <>
        {values.loading && <h1>Loading...</h1>}
        <ul>{!values.loading && values.users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
      </>
    )
  }

  export default App
  ```

- #### Example Usage Convert Promise To Callback Using CommonJS

  ```javascript
  const streambox = require('streambox-collection')
  const axios = require('axios')
  const fetch = require('node-fetch')

  // using axios
  streambox.toCallback(axios.get('https://jsonplaceholder.typicode.com/users'), (err, res) => console.log(res.data))
  
  // using fetch
  streambox.toCallback(fetch('https://jsonplaceholder.typicode.com/users'), async (err, res) => {
	   const data = await res.json()
	   console.log(data)
   })
   
  // using promise constructor
   function resultData() {
	     return new Promise((resolve, reject) => {
		    resolve('hello wordl')
	   })
   }

  streambox.toCallback(resultData(), (err, res) => console.log(res))
  ```

- #### Example Usage Convert Promise To Callback Using ES6

  ```typescript
  import * as streambox from 'streambox-collection'
  import axios from 'axios'
  import fetch from 'node-fetch'

  // using axios
  streambox.toCallback(axios.get('https://jsonplaceholder.typicode.com/users'), (err, res) => console.log(res.data))

  // using fetch
  streambox.toCallback(fetch('https://jsonplaceholder.typicode.com/users'), async (err, res) => {
     const data = await res.json()
     console.log(data)
   })

  // using promise constructor
   function resultData() {
       return new Promise((resolve, reject) => {
        resolve('hello wordl')
     })
   }

  streambox.toCallback(resultData(), (err, res) => console.log(res))
  ```

### Testing

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
  docker build -t streambox-collection or make dkb tag=streambox-collection
  ```

### Bugs

For information on bugs related to package libraries, please visit
[here](https://github.com/restuwahyu13/streambox-collection/issues)

### Contributing

Want to make **Streambox-Collection** more perfect ? Let's contribute and follow the
[contribution guide.](https://github.com/restuwahyu13/streambox-collection/blob/main/CONTRIBUTING.md)

### License

- [MIT License](https://github.com/restuwahyu13/streambox-collection/blob/main/LICENSE.md)

<p align="right" style="padding: 5px; border-radius: 100%; background-color: red; font-size: 2rem;">
  <b><a href="#streambox-collection">BACK TO TOP</a></b>
</p>
