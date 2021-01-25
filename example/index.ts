import express, { Express } from 'express'
import { Server } from 'http'
import * as grpcMessage from 'grpc-message'

const app = express() as Express

app.get('/json', (req, res): void => {
    grpcMessage.json(res, {
        method: req.method,
        statusCode: res.statusCode,
        message: 'hello wordl grpc js'
    })
})

app.get('/string', (req, res): void => {
    grpcMessage.string(res, 'hello wordl grpc js')
})

app.listen(3000, () => console.log('server is running on port 3000')) as Server
