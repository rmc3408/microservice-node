import './config/server'
import startDatabase from './config/mongo'
import BadRequestError from './error/badRequest'

// Enviroment Check from Kubernetes
if (!process.env.JWT_KEY) throw new BadRequestError('JWT_key must be defined')

// Start Servers
startDatabase()
