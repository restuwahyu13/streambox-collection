# StreamBox Collection

[![Build Status](https://travis-ci.org/restuwahyu13/grpc-box.svg?branch=main)](https://travis-ci.org/restuwahyu13/grpc-box)

`streambox-collection` is a lightweight utility as a wrapper for displaying objects, arrays, strings, and number formats to clients using data streams, so data flow responses will be returned in buffer form, `streambox-collection` can also support large or small data streams, see this article for more information on [streams](https://bit.ly/3a6373y).

- [Installation Package](#Installation-Package)
- [API Reference](#API-Reference)
  * [StreamBox Array](#StreamBox-Array)
  * [StreamBox Object](#StreamBox-Object)
  * [StreamBox String](#StreamBox-String)
  * [StreamBox Number](#StreamBox-Number)
  * [StreamBox Parser](#StreamBox-Parser)
- [Example Usage](#Example-Usage)
- [Testing](#Testing)
- [Bugs](#Bugs)
- [Contributing](#Contributing)
- [License](#License)

## Installation Package

```sh
npm install streambox-collection -S or yarn add streambox-collection -S
```

## API Reference

#### StreamBox Array(data: Record<string, any>[] | string[] | number[], delay?: number): Promise<Buffer>

  - **streamBox.Array** - create a data stream for the array and display it to the client
  - **streamBox.Array.data** - set stream data for consumption to the client
  - **streamBox.Array.delay** - set delay before returning data to the client

#### StreamBox Object(data: Record<string, any>, delay?: number): Promise<Buffer>

  - **streamBox.object** - create a data stream for the object and display it to the client
  - **streamBox.object.data** - set stream data for consumption to the client
  - **streamBox.object.delay** - set delay before returning data to the client

#### StreamBox String(data: string, delay?: number): Promise<Buffer>

  - **streamBox.string** - create a data stream for the string and display it to the client
  - **streamBox.string.data** - set stream data for consumption to the client
  - **streamBox.string.delay** - set delay before returning data to the client

#### StreamBox Number(data: number, delay?: number): Promise<Buffer>

  - **streamBox.number** - create a data stream for the number and display it to the client
  - **streamBox.number.data** - set stream data for consumption to the client
  - **streamBox.number.delay** - set delay before returning data to the client

#### StreamBox Parser(data: Buffer): any

  - **streamBox.toArray** - parse the buffer data to an array and pass its value to the client
  - **streamBox.toObject** - parse the buffer data to an object and pass its value to the client
  - **streamBox.toString** - parse the buffer data to an string and pass its value to the client
  - **streamBox.toNumber** - parse the buffer data to an number and pass its value to the client

### Example Usage

- ####  Example Usage Using CommonJS With Grpc

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
  import { ServiceError } from 'grpc'
  import { UserList, Empty } from '../typedefs/users_pb'
  import { client } from './client'

  client.getUsers(Empty, (error: ServiceError, response: UserList) => {
    if (error) console.error(error)
    streamBox
      .array(response.toObject())
      .then((res) => console.log(streamBox.toArray(res)))
      .catch(console.log)
  })
  ```

- #### Example Usage Using CommonJS With Express.js

  ```javascript
    const express = require('express')
    const axios = require('axios')
    const streamBox = require('streambox-collection')

    app.get('/fetch', async (req, res) => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos')
      streamBox.array(data).then((response) => res.json(streamBox.toArray(response)))
    })
   ```

- #### Example Usage ES6 Using Express.js

  ```typescript
  import express, { Express } from 'express'
  import axios from 'axios'
  import * as streamBox from 'streambox-collection'
  
  const app = express() as Express

  app.get('/fetch', async (req, res) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos')
    streamBox.array(data).then((response) => res.json(streamBox.toArray(response)))
  })
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

For information on bugs related to package libraries, please visit [here](https://github.com/restuwahyu13/streambox-collection/issues)

### Contributing

Want to make **Streambox-Collection** more perfect ? Let's contribute and follow the [contribution guide.](https://github.com/restuwahyu13/streambox-collection/blob/main/CONTRIBUTING.md)

### License

- [MIT License](https://github.com/restuwahyu13/streambox-collection/blob/main/LICENSE.md)

<p align="right" style="padding: 5px; border-radius: 100%; background-color: red; font-size: 2rem;">
  <b><a href="#StreamBox-Collection">BACK TO TOP</a></b>
</p>