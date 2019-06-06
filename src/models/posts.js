import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  like: Number
})

const Posts = mongoose.model('Posts', schema)

export default Posts
