const express = require('express')
const grpcMessage = require('grpc-message')
const app = express()

app.get('/json', (req, res) => {
    grpcMessage.json(res, {
        method: req.method,
        statusCode: res.statusCode,
        message: 'hello wordl grpc js'
    })
})

app.get('/string', (req, res) => {
    grpcMessage.string(res, 'hello wordl grpc js')
})

app.listen(3000, () => console.log('server is running on port 3000'))
