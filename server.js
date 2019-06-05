import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
  console.table([['port', '3000']])
})
