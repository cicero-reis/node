const fs = require('fs')
const http = require('http')
const url = require('url')

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

  return output
  
}

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  
  const pathName = req.url

  // Overview page
  if (pathName === '/' || pathName === '/overview') {

    res.writeHead(200, {'Content-type': 'text/html'})

    const cardHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('')

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml)

    return res.end(output)
  }

  // Product page
  if (pathName === '/product') {
    res.end('This is PRODUCT')
    return
  }

  // API
  if (pathName === '/api') {

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