const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World2')
})

app.get('/helder', (req, res) => {
  res.send('Hello Helder')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})