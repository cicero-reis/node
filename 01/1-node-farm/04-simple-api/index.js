const fs = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW')
    return
  }

  if (pathName === '/product') {
    res.end('This is PRODUCT')
    return
  }

  if (pathName === '/api') {

    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {

      const productData = JSON.parse(data)

      res.writeHead(200, {'Content-type': 'application/json'})

      res.end(data)

    })

    return 

  }

  res.writeHead(404, {
    'Content-type': 'text/html',
    'my-own-header': 'hello-world'
  })

  const style = 'style="text-align:center"'

  res.end(
      `<h1 ${style}>404</h1>
      <h2 ${style}>Page not found!</h2>`)
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening to requests on port 3000')
})