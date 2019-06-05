import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/posts', (req, res) =>
  res.send([
    {
      title: 'Default title',
      description: 'Default description',
      author: 'Default author',
      likes: 100
    }
  ])
)

export default app
