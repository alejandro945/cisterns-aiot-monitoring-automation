import { User as UserDomain } from '@/domain/model/User'
import mongoose, { Model } from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema<UserDomain>({
  name: String,
  email: String,
  password: String,
  role: String,
})

const User: Model<UserDomain> = mongoose.models.User || model('User', UserSchema)

export default User