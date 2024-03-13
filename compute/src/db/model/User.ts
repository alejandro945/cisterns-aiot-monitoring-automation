import mongoose, { Document, Model } from 'mongoose'
const { Schema, model } = mongoose

export interface UserDoc extends Document {
  fname?: string
  lname?: string
  username?: string
  // Add other properties as needed
}

const UserSchema = new Schema<UserDoc>({
  fname: String,
  lname: String,
  username: String,
  // You can add more fields specific to the User model here
})

const User: Model<UserDoc> = mongoose.models.User || model('User', UserSchema)

export default User