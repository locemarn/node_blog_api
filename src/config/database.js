import mongoose from 'mongoose'
require('dotenv').config()

mongoose.Promise = Promise

const mongodbUrl = process.env.DB_MONGODB_URL || process.env.DB_MONGODB_URL_TEST

const connect = () =>
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true
  })

export default {
  connect
}
