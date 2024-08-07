import mongoose from 'mongoose'
import { MONGO_URI, PORT_AUTH } from '../constants/env'
import app from './server'


async function startDatabase() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('AUTH MongoDB database is running sucessful and')
    
  } catch (error) {
    console.log('Database connection failed')
  }
  app.listen(PORT_AUTH, () => console.log('listening AUTH server on port', PORT_AUTH))
}

export default startDatabase
