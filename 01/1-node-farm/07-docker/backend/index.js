const http = require('http')

// SERVER
const server = http.createServer((req, res) => {
  
  console.log(req)
  
  res.end('Hello from the server!')
})

server.listen(3000, () => {
  console.log('Backend executando...')
})