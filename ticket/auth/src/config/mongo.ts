import mongoose from 'mongoose'

async function startDatabase() {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('AUTH Database connection sucessful')
  } catch (error) {
    console.log('AUTH Database connection failed')
  }
}

export default startDatabase
