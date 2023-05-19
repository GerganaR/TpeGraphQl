import mongoose from 'mongoose'

export async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      autoIndex: true,

    })
    console.log('connected to mongodb')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
