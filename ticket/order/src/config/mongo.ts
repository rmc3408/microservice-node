import mongoose from 'mongoose'
import app from './server'


async function startDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log('ORDER MongoDB database is running sucessful and')
    
  } catch (error) {
    console.log('Database connection failed')
  }
  app.listen(process.env.PORT_ORDER, () => console.log('listening TICKET server on port', process.env.PORT_ORDER))
}

export default startDatabase
