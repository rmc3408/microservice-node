import mongoose from 'mongoose'
import app from './server'
import { PORT_AUTH, MONGO_URI } from '../constants/env'


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
