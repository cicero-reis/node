const http = require('http')

// SERVER
const server = http.createServer((req, res) => {
  
  console.log(req)
  
  res.end('Hello from the server!')
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to rquest on port 8000')
})