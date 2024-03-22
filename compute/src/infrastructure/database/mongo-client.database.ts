import mongoose from 'mongoose'
import User from './user-mongo.database'

const dbConnect = async () => {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGO_URI is not defined')
  }
  await mongoose.connect(uri)
}

dbConnect().catch((error) => {
  console.error('Error connecting to MongoDB: ', error)
})

console.log('Setting up change stream')
const changeStream = User.watch()

changeStream.on('change', (change) => {
  console.log('Change: ', change)
})

changeStream.on('error', (error) => {
  console.log('Error: ', error)
})

export { changeStream }