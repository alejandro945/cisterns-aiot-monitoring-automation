import Measurement from '@/infrastructure/database/mongo-measurement.database'
import Alert from '@/infrastructure/database/mongo-alerts.database';
import type _mongoose from 'mongoose';
import { connect } from 'mongoose';

declare global {
  // eslint-disable-next-line
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.log('Please define the MONGODB_URI environment variable inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

const MeasurementchangeStream = Measurement.watch()
const AlertchangeStream = Alert.watch()

export { MeasurementchangeStream, AlertchangeStream, dbConnect }
