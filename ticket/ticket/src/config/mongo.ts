import mongoose from 'mongoose'
import app from './server'
import { PORT_TICKET, MONGO_URI } from '../constants/env'


async function startDatabase() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('TICKET MongoDB database is running sucessful and')
    
  } catch (error) {
    console.log('Database connection failed')
  }
  app.listen(PORT_TICKET, () => console.log('listening TICKET server on port', PORT_TICKET))
}

export default startDatabase
