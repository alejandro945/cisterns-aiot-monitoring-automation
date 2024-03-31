import mongoose, { Mongoose } from 'mongoose'
import Measurement from '@/infrastructure/database/mongo-measurement.database'

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected === 1) {
    // Use existing database connection
    return;
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not defined')
  }

  // Use new database connection
  const db = await mongoose.connect(uri);
  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected)
  console.log(db.connections[0].readyState)
}

dbConnect().then(() => console.log('Already connected to MongoDB')).catch((error) => {
  console.error('Error connecting to MongoDB: ', error)
})

console.log('Setting up change stream')
const changeStream = Measurement.watch()

export { changeStream, dbConnect }