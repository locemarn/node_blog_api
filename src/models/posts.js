import mongoose from 'mongoose'

const postsSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  likes: Number
})

const Posts = mongoose.model('Posts', postsSchema)

export default Posts
