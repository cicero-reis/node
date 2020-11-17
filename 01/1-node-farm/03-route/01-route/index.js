const { read } = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  console.log(req.url)
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening to requests on port 3000')
})