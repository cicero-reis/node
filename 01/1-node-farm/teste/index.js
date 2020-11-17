const fs = require('fs')
const http = require('http')

const data = fs.readFileSync(`${__dirname}/documento.json`, 'utf-8')
const dataObj = JSON.parse(data)

console.log(dataObj)

const server = http.createServer((req, res) => {

  res.writeHead(200, {'Content-type': 'application/json'})

  res.end(data)

})


server.listen(3000, '127.0.0.1', () => {
 console.log('Listering to request on port 3000')
})