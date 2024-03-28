import mongoose from 'mongoose'
import Measurement from './mongo-measurement.database'

const dbConnect = async () => {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGO_URI is not defined')
  }
  await mongoose.connect(uri)
}

dbConnect().then(res => console.log(res)).catch((error) => {
  console.error('Error connecting to MongoDB: ', error)
})

console.log('Setting up change stream')
const changeStream = Measurement.watch()


export { changeStream }