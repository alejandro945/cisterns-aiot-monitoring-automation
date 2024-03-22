import { User } from '@/domain/model/User'
import mongoose, { Model } from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  role: String,
})

const User: Model<User> = mongoose.models.User || model('User', UserSchema)

export default User