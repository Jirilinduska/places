import mongoose, { Mongoose } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

declare global {
  var mongooseCache:
    | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
    | undefined
}

const cached = global.mongooseCache ?? {
  conn: null,
  promise: null,
}

global.mongooseCache = cached

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}