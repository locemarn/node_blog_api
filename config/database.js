import mongoose from 'mongoose'
import config from 'config'

mongoose.Promise = Promise

const mongodbUrl = config.get('database.mongoUrl')

const connect = () =>
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false
  })

export default {
  connect
}
