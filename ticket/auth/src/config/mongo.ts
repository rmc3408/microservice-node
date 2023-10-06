import mongoose from 'mongoose'
import app from './server'

const PORT_AUTH: number = 4000
const MONGO_URI: string = 'mongodb://auth-mongo-srv:27017/auth'

async function startDatabase() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Auth MongoDB database is running sucessful and')
    
  } catch (error) {
    console.log('Database connection failed')
  }
  app.listen(PORT_AUTH, () => console.log('listening Auth server on port', PORT_AUTH))
}

export default startDatabase
