import mongoose from 'mongoose'
import User from './model/User'

const uri = process.env.MONGO_URI || ''

mongoose.connect(uri)

// async function setupChangeStream() {
console.log('Setting up change stream')
const changeStream = User.watch()

changeStream.on('change', (change) => {
  console.log('Change: ', change)
})

changeStream.on('error', (error) => {
  console.log('Error: ', error)
})
// }

export { changeStream }