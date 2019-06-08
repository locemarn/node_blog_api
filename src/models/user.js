import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
})

userSchema.set('toJson', {
  transform: (doc, ret, options) => ({
    _id: ret._id,
    email: ret.email,
    name: ret.name,
    role: ret.role
  })
})

const User = mongoose.model('User', userSchema)

export default User
