const fs = require('fs')
const http = require('http')
const url = require('url')
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate')

//slugify
const data1 = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj1 = JSON.parse(data1)

const slugs = dataObj1.map(el => slugify(el.productName, { lower: true } ))

console.log(slugs)

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  
  const { query, pathname } = url.parse(req.url, true)

  console.log(query, pathname)

  // Overview page
  if (pathname === '/' || pathname === '/overview') {

    res.writeHead(200, {'Content-type': 'text/html'})

    const cardHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('')

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml)

    return res.end(output)
  }

  // Product page
  if (pathname === '/product') {

    res.writeHead(200, {'Content-type': 'text/html' } )

    const product = dataObj[query.id]

    console.log(product)

    const output = replaceTemplate(templateProduct, product)
    
    return res.end(output)
  }

  // API
  if (pathname === '/api') {

    res.writeHead(200, {'Content-type': 'application/json'})

    const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el))

    res.end(data)

    return 

  }

  // Not found
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